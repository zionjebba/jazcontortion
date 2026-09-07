import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 5 requests per 1 minute
const ratelimit = process.env.UPSTASH_REDIS_REST_URL
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      analytics: true,
    })
  : null;

export async function POST(request: Request) {
  try {
    if (ratelimit) {
      // Use the user's IP if available, otherwise fallback to "anonymous"
      const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
      const { success } = await ratelimit.limit(`payment_init_${ip}`);
      
      if (!success) {
        return NextResponse.json(
          { error: "Too many payment requests. Please try again in a minute." },
          { status: 429 },
        );
      }
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in to purchase a program." },
        { status: 401 },
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const siteUrl = process.env.NEXTAUTH_URL;

    if (!secretKey || !siteUrl) {
      console.error("Missing PAYSTACK_SECRET_KEY or NEXTAUTH_URL.");

      return NextResponse.json(
        { error: "Payment configuration is incomplete." },
        { status: 500 },
      );
    }

    const body = await request.json();

    const slug = String(body.slug ?? "").trim();

    if (!slug) {
      return NextResponse.json(
        { error: "Program slug is required." },
        { status: 400 },
      );
    }

    // Never trust price/currency information from the client.
    const program = await prisma.program.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        price: true,
        isPublished: true,
      },
    });

    if (!program) {
      return NextResponse.json(
        { error: "Program not found." },
        { status: 404 },
      );
    }

    if (!program.isPublished) {
      return NextResponse.json(
        { error: "This program is not currently available." },
        { status: 400 },
      );
    }

    if (program.price <= 0) {
      return NextResponse.json(
        { error: "This program has an invalid price." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user?.email) {
      return NextResponse.json(
        { error: "Your account does not have an email address." },
        { status: 400 },
      );
    }

    // The user may already own the program.
    const existingEntitlement = await prisma.entitlement.findUnique({
      where: {
        userId_programId: {
          userId: user.id,
          programId: program.id,
        },
      },
    });

    if (existingEntitlement) {
      return NextResponse.json(
        { error: "You already have access to this program." },
        { status: 409 },
      );
    }

    // Avoid creating multiple pending payment attempts
    // for the same user and program.
    const existingPendingTransaction = await prisma.transaction.findFirst({
      where: {
        userId: user.id,
        programId: program.id,
        provider: "paystack",
        status: "pending",
      },
      select: {
        id: true,
        providerReference: true,
      },
    });

    if (existingPendingTransaction) {
      return NextResponse.json(
        {
          error: "A payment for this program is already in progress.",
          reference: existingPendingTransaction.providerReference,
        },
        { status: 409 },
      );
    }

    // Paystack expects the amount in the smallest currency unit.
    // Example: GHS 15 -> 1500 pesewas.
    const amount = Math.round(program.price * 100);

    if (!Number.isSafeInteger(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid payment amount." },
        { status: 400 },
      );
    }

    const reference = `jaz_${randomUUID()}`;

    // Persist the pending payment attempt BEFORE contacting Paystack.
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        programId: program.id,
        amount,
        currency: "GHS",
        provider: "paystack",
        providerReference: reference,
        status: "pending",
      },
    });

    const callbackUrl = `${siteUrl}/checkout/success?reference=${encodeURIComponent(reference)}`;
    let paystackResponse: Response;

    // Network failures need to resolve our transaction too.
    try {
      paystackResponse = await fetch(
        "https://api.paystack.co/transaction/initialize",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            amount,
            currency: "GHS",
            reference,
            callback_url: callbackUrl,
            metadata: {
              transactionId: transaction.id,
              userId: user.id,
              programId: program.id,
              programSlug: program.slug,
            },
          }),
        },
      );
    } catch (error) {
      console.error("Paystack network request failed:", error);

      await prisma.transaction.update({
        where: {
          id: transaction.id,
        },
        data: {
          status: "failed",
        },
      });

      return NextResponse.json(
        { error: "Unable to reach the payment provider." },
        { status: 502 },
      );
    }

    let data: any;

    try {
      data = await paystackResponse.json();
    } catch (error) {
      console.error("Failed to parse Paystack response:", error);

      await prisma.transaction.update({
        where: {
          id: transaction.id,
        },
        data: {
          status: "failed",
        },
      });

      return NextResponse.json(
        { error: "Invalid response from payment provider." },
        { status: 502 },
      );
    }

    if (!paystackResponse.ok || !data.status || !data.data?.authorization_url) {
      console.error("Paystack initialization failed:", data);

      await prisma.transaction.update({
        where: {
          id: transaction.id,
        },
        data: {
          status: "failed",
        },
      });

      return NextResponse.json(
        { error: "Unable to initialize payment." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("Payment initialization error:", error);

    return NextResponse.json(
      { error: "Something went wrong while starting payment." },
      { status: 500 },
    );
  }
}
