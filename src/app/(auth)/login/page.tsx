"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/reveal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleLogin(formData: FormData) {
    setError("");

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/account");
  }
  async function handleGoogleLogin() {
    await signIn("google", {
      callbackUrl: "/account",
    });
  }
  return (
    <main className="min-h-screen overflow-hidden flex items-center justify-center bg-background">
      <section className="relative px-6 py-32 lg:px-12 lg:py-24">
        <div className="mx-auto w-full lg:max-w-[90%]">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 items-center">
            {/* LEFT COLUMN: HERO */}
            <RevealOnScroll className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                WELCOME BACK
              </p>

              <h1 className="mt-5 text-[4.5rem] sm:text-[6rem] lg:text-[7rem] font-black uppercase leading-[0.85] tracking-[-0.05em] text-foreground">
                LOG IN
                <br />
                <span className="text-primary">& TRAIN.</span>
              </h1>

              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-16 bg-primary" />

                <p className="text-sm font-medium text-foreground/50">
                  Access your purchased programs and continue where you left
                  off.
                </p>
              </div>
            </RevealOnScroll>

            {/* RIGHT COLUMN: FORM CARD */}
            <RevealOnScroll delayClass="delay-300" className="relative">
              <div className="relative rounded-[2.5rem] border border-white/10 bg-background/60 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
                <h2 className="mb-8 text-2xl font-black uppercase tracking-[-0.04em]">
                  ACCOUNT LOGIN
                </h2>

                <form action={handleLogin} className="flex flex-col gap-6">
                  {/* EMAIL */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold uppercase tracking-[0.1em] text-primary"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="rounded-xl border border-transparent bg-white px-5 py-4 text-sm font-semibold text-black outline-none transition-colors placeholder:text-black/40 focus:border-primary focus:bg-white"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-xs font-bold uppercase tracking-[0.1em] text-primary"
                      >
                        Password
                      </label>

                      <Link
                        href="#"
                        className="text-xs font-semibold text-foreground/40 transition-colors hover:text-primary"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="Enter your password"
                      className="rounded-xl border border-transparent bg-white px-5 py-4 text-sm font-semibold text-black outline-none transition-colors placeholder:text-black/40 focus:border-primary focus:bg-white"
                    />
                  </div>

                  {/* ERROR */}
                  {error && (
                    <p className="text-sm font-semibold text-red-500">
                      {error}
                    </p>
                  )}

                  {/* SUBMIT */}
                  <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground/40">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/signup"
                        className="text-foreground transition-colors hover:text-primary"
                      >
                        Sign up
                      </Link>
                    </p>

                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-3 rounded-full bg-primary px-10 py-5 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(255,100,0,0.4)] sm:w-auto"
                    >
                      LOG IN
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </form>

                <div className="my-6 flex items-center gap-4">
                  <span className="h-px flex-1 bg-foreground/10" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/30">
                    OR
                  </span>
                  <span className="h-px flex-1 bg-foreground/10" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex w-full items-center justify-center gap-3 rounded-full border border-foreground/10 bg-white px-10 py-5 text-sm font-bold uppercase tracking-widest text-black transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.22a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.5Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.54 13.59A5.85 5.85 0 0 1 6.23 12c0-.55.1-1.09.31-1.59V7.89H3.3A9.5 9.5 0 0 0 2.25 12c0 1.53.37 2.98 1.05 4.11l3.24-2.52Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 6.38c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.52C7.31 8.1 9.46 6.38 12 6.38Z"
                    />
                  </svg>
                CONTINUE WITH GOOGLE
                </button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </main>
  );
}
