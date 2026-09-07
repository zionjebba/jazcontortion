import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { CheckoutButton } from "@/components/checkout/checkout-button";

type CheckoutPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: CheckoutPageProps) {
  const { slug } = await params;
  const program = await prisma.program.findUnique({
    where: { slug },
  });

  if (!program) return { title: "Checkout Not Found" };

  return {
    title: `Checkout - ${program.title}`,
    description: `Get instant access to ${program.title}.`,
    openGraph: {
      title: `Checkout - ${program.title}`,
      description: `Get instant access to ${program.title}.`,
      images: [{ url: program.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Checkout - ${program.title}`,
      description: `Get instant access to ${program.title}.`,
      images: [program.image],
    },
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { slug } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=/checkout/${slug}`);
  }

  const program = await prisma.program.findUnique({
    where: {
      slug,
    },
  });

  if (!program || !program.isPublished) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-32 lg:px-12">
      <div className="mx-auto w-full lg:max-w-[90%]">
        <Link
          href={`/programs/${program.slug}`}
          className="text-sm font-semibold text-foreground/50 transition-colors hover:text-primary"
        >
          ← BACK TO PROGRAM
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* PRODUCT SUMMARY */}
          <aside className="rounded-[2rem] bg-secondary p-7 sm:p-9">
            <div className="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-[1.5rem]">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover"
              />
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              YOUR PROGRAM
            </p>

            <h1 className="mt-3 text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em]">
              {program.title}
            </h1>

            <p className="mt-4 text-sm leading-6 text-foreground/60">
              {program.tagline}
            </p>

            <div className="mt-7 border-t border-foreground/10 pt-6">
              {program.includes.map((item) => (
                <div key={item} className="flex gap-3 py-2 text-sm">
                  <span className="font-bold text-primary">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* CHECKOUT */}
          <section className="rounded-[2rem] border border-foreground/10 bg-background p-7 sm:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                CHECKOUT
              </p>

              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em]">
                GET ACCESS.
              </h2>

              <p className="mt-4 text-sm leading-6 text-foreground/60">
                You're signed in as{" "}
                <span className="font-semibold text-foreground">
                  {session.user.email}
                </span>
                .
              </p>
            </div>

            <div className="mt-10 border-t border-foreground/10 pt-7">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>

                <span className="text-2xl font-black">GHS {program.price}</span>
              </div>

              <CheckoutButton slug={program.slug} price={program.price} />

              <p className="mt-4 text-center text-xs leading-5 text-foreground/40">
                You'll be securely redirected to Paystack to complete your
                payment.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
