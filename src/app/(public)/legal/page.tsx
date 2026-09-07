
const sections = [
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms & Conditions" },
  { id: "refunds", label: "Refund Policy" },
];

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-36 lg:px-12">
      <div className="mx-auto w-full lg:max-w-[90%]">
        {/* HEADER */}
        <header className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            LEGAL
          </p>

          <h1 className="mt-5 text-6xl font-black uppercase leading-[0.8] tracking-[-0.07em] sm:text-7xl lg:text-8xl">
            THE
            <br />
            <span className="text-primary">FINE PRINT.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-foreground/60">
            The policies and terms that apply when using JazContortion,
            purchasing programs, or interacting with this website.
          </p>
        </header>

        <div className="mt-20 grid gap-14 lg:grid-cols-[220px_1fr]">
          {/* NAV */}
          <nav className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/40">
              ON THIS PAGE
            </p>

            <div className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:gap-0">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="border-l-2 border-transparent px-3 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  {section.label}
                </a>
              ))}
            </div>
          </nav>

          {/* CONTENT */}
          <div className="max-w-3xl space-y-24">
            <section id="privacy" className="scroll-mt-28">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                01
              </p>

              <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.05em]">
                Privacy Policy
              </h2>

              <p className="mt-6 text-sm leading-7 text-foreground/65">
                Your privacy matters. This section will explain what
                information JazContortion collects, why it is collected, how
                it is used, and how it is protected.
              </p>

              <div className="mt-8 space-y-7 text-sm leading-7 text-foreground/65">
                <div>
                  <h3 className="font-bold text-foreground">
                    Information we collect
                  </h3>
                  <p className="mt-2">
                    This may include information you provide when creating an
                    account, purchasing a program, contacting JazContortion,
                    or subscribing to communications.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">
                    How information is used
                  </h3>
                  <p className="mt-2">
                    Information may be used to provide purchased products,
                    manage accounts, respond to messages, process transactions,
                    and improve the website and services.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">
                    Contact
                  </h3>
                  <p className="mt-2">
                    Questions about privacy can be sent to{" "}
                    <a
                      href="mailto:hello@jazcontortion.com"
                      className="font-semibold text-primary"
                    >
                      hello@jazcontortion.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </section>

            <section id="terms" className="scroll-mt-28">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                02
              </p>

              <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.05em]">
                Terms & Conditions
              </h2>

              <div className="mt-6 space-y-7 text-sm leading-7 text-foreground/65">
                <div>
                  <h3 className="font-bold text-foreground">
                    Using the website
                  </h3>
                  <p className="mt-2">
                    By using JazContortion, you agree to use the website and
                    its content lawfully and respectfully.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">
                    Digital programs
                  </h3>
                  <p className="mt-2">
                    Purchased programs are intended for the purchaser's
                    personal use. Program content should not be copied,
                    redistributed, resold, or publicly shared without
                    permission.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">
                    Training disclaimer
                  </h3>
                  <p className="mt-2">
                    Flexibility and physical training involve inherent risks.
                    Training content is educational and is not a substitute
                    for individualized medical or professional advice.
                  </p>
                </div>
              </div>
            </section>

            <section id="refunds" className="scroll-mt-28">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                03
              </p>

              <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.05em]">
                Refund Policy
              </h2>

              <div className="mt-6 space-y-7 text-sm leading-7 text-foreground/65">
                <div>
                  <h3 className="font-bold text-foreground">
                    Digital purchases
                  </h3>
                  <p className="mt-2">
                    Refund eligibility for digital programs will be described
                    here once the final purchase and delivery system is
                    established.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground">
                    Questions about a purchase
                  </h3>
                  <p className="mt-2">
                    If you have an issue with a purchase, contact{" "}
                    <a
                      href="mailto:hello@jazcontortion.com"
                      className="font-semibold text-primary"
                    >
                      hello@jazcontortion.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </section>

            <p className="border-t border-foreground/10 pt-6 text-xs text-foreground/40">
              Last updated: {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}