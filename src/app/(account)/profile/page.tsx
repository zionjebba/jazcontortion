import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateProfile } from "./action";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      accounts: {
        select: {
          provider: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const isGoogleConnected = user.accounts.some(
    (account) => account.provider === "google",
  );

  const initials =
    user.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? user.email.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-32 lg:px-12">
      <div className="mx-auto w-full max-w-5xl">

        {/* HEADER */}
        <div className="flex flex-col gap-10 border-b border-foreground/10 pb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              YOUR PROFILE
            </p>

            <h1 className="mt-4 text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-7xl">
              PROFILE
            </h1>

            <p className="mt-5 max-w-md text-sm leading-6 text-foreground/50">
              Manage your personal information and account details.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-primary text-lg font-black text-primary-foreground">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? "Profile"}
                  width={64}
                  height={64}
                  className="size-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div>
              <p className="font-bold">
                {user.name || "JazContortion Member"}
              </p>

              <p className="mt-1 text-xs text-foreground/40">
                Member
              </p>
            </div>
          </div>
        </div>

        {/* PERSONAL INFORMATION */}
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              PERSONAL INFORMATION
            </h2>
          </div>

          <form action={async (formData) => {
            "use server";
            await updateProfile(formData);
          }}>
            <div className="mt-5 divide-y divide-foreground/10 border-y border-foreground/10">

              {/* NAME */}
              <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
                <label
                  htmlFor="name"
                  className="text-xs font-bold uppercase tracking-wider text-foreground/40"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={user.name ?? ""}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm font-semibold outline-none transition-colors placeholder:text-foreground/30 focus:border-primary sm:max-w-sm"
                />
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground/40">
                  Email address
                </span>

                <span className="break-all font-semibold sm:text-right">
                  {user.email}
                </span>
              </div>

            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                className="rounded-full bg-primary px-7 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_-15px_rgba(255,100,0,0.5)]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </section>

        {/* CONNECTED ACCOUNTS */}
        <section className="mt-14">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            CONNECTED ACCOUNTS
          </h2>

          <div className="mt-5 border-y border-foreground/10">
            <div className="flex items-center justify-between gap-6 py-6">
              <div className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-foreground/5 text-sm font-black">
                  G
                </div>

                <div>
                  <p className="font-bold">Google</p>

                  <p className="mt-1 text-xs text-foreground/40">
                    {isGoogleConnected
                      ? "Connected to your account"
                      : "Not connected"}
                  </p>
                </div>
              </div>

              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  isGoogleConnected
                    ? "text-primary"
                    : "text-foreground/30"
                }`}
              >
                {isGoogleConnected ? "Connected" : "Not connected"}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}