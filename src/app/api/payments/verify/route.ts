import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  fulfillPaystackTransaction,
} from "@/lib/paystack";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference")?.trim();

    if (!reference) {
      return NextResponse.json(
        { error: "Payment reference is required." },
        { status: 400 },
      );
    }

    const transaction = await prisma.transaction.findUnique({
      where: {
        providerReference: reference,
      },
      select: {
        userId: true,
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found." },
        { status: 404 },
      );
    }

    if (transaction.userId !== session.user.id) {
      return NextResponse.json(
        { error: "You are not authorized to verify this transaction." },
        { status: 403 },
      );
    }

    const result =
      await fulfillPaystackTransaction(reference);

    return NextResponse.json({
      success: result.success,
      alreadyProcessed: result.alreadyProcessed ?? false,
      programSlug: result.transaction.program.slug,
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    return NextResponse.json(
      { error: "Unable to verify payment." },
      { status: 500 },
    );
  }
}