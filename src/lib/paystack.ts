import { prisma } from "@/lib/prisma";
import { sendReceiptEmail } from "@/lib/resend";

type PaystackVerification = {
  status: boolean;
  data?: {
    status?: string;
    reference?: string;
    amount?: number;
    currency?: string;
    paid_at?: string | null;
    channel?: string | null;
  };
};

export async function verifyPaystackTransaction(
  reference: string,
): Promise<PaystackVerification> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured.");
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
      cache: "no-store",
    },
  );

  const data = (await response.json()) as PaystackVerification;

  if (!response.ok) {
    throw new Error("Paystack transaction verification failed.");
  }

  return data;
}

export async function fulfillPaystackTransaction(reference: string) {
  const transaction = await prisma.transaction.findUnique({
    where: {
      providerReference: reference,
    },
    include: {
      program: true,
      user: true,
    },
  });

  if (!transaction) {
    throw new Error("Transaction not found.");
  }

  if (transaction.status === "success") {
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        providerReference: reference,
      },
    });

    const existingEntitlement = await prisma.entitlement.findUnique({
      where: {
        userId_programId: {
          userId: transaction.userId,
          programId: transaction.programId,
        },
      },
    });

    return {
      success: true,
      transaction,
      purchase: existingPurchase,
      entitlement: existingEntitlement,
      alreadyProcessed: true,
    };
  }

  const verification = await verifyPaystackTransaction(reference);
  const payment = verification.data;

  if (!verification.status || !payment) {
    throw new Error("Paystack verification was unsuccessful.");
  }

  if (payment.status !== "success") {
    await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        status: payment.status ?? "failed",
      },
    });

    return {
      success: false,
      transaction,
      reason: payment.status ?? "unknown",
    };
  }

  if (payment.reference !== transaction.providerReference) {
    throw new Error("Paystack reference mismatch.");
  }

  if (payment.amount !== transaction.amount) {
    await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        status: "failed",
      },
    });

    throw new Error("Paystack amount mismatch.");
  }

  if (payment.currency !== transaction.currency) {
    await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        status: "failed",
      },
    });

    throw new Error("Paystack currency mismatch.");
  }

  const result = await prisma.$transaction(async (tx) => {
    const purchase = await tx.purchase.upsert({
      where: {
        providerReference: reference,
      },
      update: {},
      create: {
        userId: transaction.userId,
        programId: transaction.programId,
        amount: transaction.program.price,
        currency: transaction.currency,
        provider: "paystack",
        providerReference: reference,
        status: "success",
      },
    });

    const entitlement = await tx.entitlement.upsert({
      where: {
        userId_programId: {
          userId: transaction.userId,
          programId: transaction.programId,
        },
      },
      update: {},
      create: {
        userId: transaction.userId,
        programId: transaction.programId,
      },
    });

    const updatedTransaction = await tx.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        status: "success",
      },
    });

    return {
      purchase,
      entitlement,
      transaction: { ...transaction, status: "success" },
    };
  });

  const siteUrl = process.env.NEXTAUTH_URL || "https://jazcontortion.vercel.app";

  // Fire-and-forget receipt email
  sendReceiptEmail(transaction.user.email, {
    userName: transaction.user.name || "there",
    programTitle: transaction.program.title,
    amount: transaction.amount / 100,
    currency: transaction.currency,
    accessUrl: `${siteUrl}/account`,
  });

  return {
    success: true,
    ...result,
    alreadyProcessed: false,
  };
}
