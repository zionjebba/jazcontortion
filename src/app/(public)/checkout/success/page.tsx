import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  fulfillPaystackTransaction,
} from "@/lib/paystack";

type SuccessPageProps = {
  searchParams: Promise<{
    reference?: string | string[];
  }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { reference: rawReference } = await searchParams;
  const reference = Array.isArray(rawReference) ? rawReference[0] : rawReference;

  if (!reference) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-lg text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
            PAYMENT ERROR
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase">
            Missing payment reference.
          </h1>

          <Link
            href="/account"
            className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground"
          >
            GO TO ACCOUNT
          </Link>
        </div>
      </main>
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

  if (!transaction || transaction.userId !== session.user.id) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-lg text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
            PAYMENT ERROR
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase">
            Transaction not found.
          </h1>

          <Link
            href="/account"
            className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground"
          >
            GO TO ACCOUNT
          </Link>
        </div>
      </main>
    );
  }

  const result =
    await fulfillPaystackTransaction(reference);

  if (!result.success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-lg text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            PAYMENT NOT COMPLETED
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase">
            Your payment is still pending.
          </h1>

          <p className="mt-5 text-sm leading-6 text-foreground/50">
            We haven't granted access yet. Your transaction status
            will be checked again when the payment is confirmed.
          </p>

          <Link
            href="/account"
            className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground"
          >
            GO TO ACCOUNT
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          PAYMENT SUCCESSFUL
        </p>

        <h1 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl">
          YOU'RE IN.
        </h1>

        <p className="mt-6 text-sm leading-6 text-foreground/50">
          Your program has been added to your training library.
        </p>

        <Link
          href={`/account/programs/${result.transaction.program.slug}`}
          className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-1"
        >
          START TRAINING →
        </Link>
      </div>
    </main>
  );
}