import crypto from "crypto";
import { NextResponse } from "next/server";

import {
  fulfillPaystackTransaction,
} from "@/lib/paystack";

export async function POST(request: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return new NextResponse("Webhook configuration error.", {
      status: 500,
    });
  }

  const rawBody = await request.text();

  const signature = request.headers.get(
    "x-paystack-signature",
  );

  if (!signature) {
    return new NextResponse("Unauthorized.", {
      status: 401,
    });
  }

  const expectedSignature = crypto
    .createHmac("sha512", secretKey)
    .update(rawBody)
    .digest("hex");

 const signatureBuffer = Buffer.from(signature);
const expectedSignatureBuffer = Buffer.from(expectedSignature);

const signaturesMatch =
  signatureBuffer.length === expectedSignatureBuffer.length &&
  crypto.timingSafeEqual(
    signatureBuffer,
    expectedSignatureBuffer,
  );

  if (!signaturesMatch) {
    return new NextResponse("Unauthorized.", {
      status: 401,
    });
  }

  let event: {
    event?: string;
    data?: {
      reference?: string;
    };
  };

  try {
    event = JSON.parse(rawBody);
  } catch {
    return new NextResponse("Invalid payload.", {
      status: 400,
    });
  }

  // We only fulfill successful charges.
  if (event.event !== "charge.success") {
    return NextResponse.json({
      received: true,
    });
  }

  const reference = event.data?.reference;

  if (!reference) {
    return new NextResponse("Missing transaction reference.", {
      status: 400,
    });
  }

  try {
    await fulfillPaystackTransaction(reference);
  } catch (error) {
    console.error(
      "Paystack webhook fulfillment failed:",
      error,
    );

    return new NextResponse("Webhook processing failed.", {
      status: 500,
    });
  }

  return NextResponse.json({
    received: true,
  });
}