"use client";

import { useState, useActionState } from "react";
import { submitContactForm } from "./actions";

const subjects = [
  "General question",
  "Program Support",
  "Collaboration",
  "Something else",
];

export default function ContactPage() {
  const [subject, setSubject] = useState(subjects[0]);
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <section className="relative px-6 py-32 lg:px-12 lg:py-24">
        <div className="mx-auto w-full lg:max-w-[90%]">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 items-start">
            
            {/* LEFT COLUMN: HERO & INFO */}
            <div className="relative z-10 animate-in fade-in slide-in-from-left-8 duration-700">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                CONTACT JAZ
              </p>

              <h1 className="mt-5 text-[4.5rem] sm:text-[6rem] lg:text-[7rem] font-black uppercase leading-[0.85] tracking-[-0.05em] text-foreground">
                LET'S
                <br />
                <span className="text-primary">TALK.</span>
              </h1>
              
              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-16 bg-primary" />
                <p className="text-sm font-medium text-foreground/50">
                  I usually reply by email.
                </p>
              </div>

              <div className="mt-16 flex flex-col gap-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/50 mb-3">
                    EMAIL
                  </p>
                  <a
                    href="mailto:jazmedia46@gmail.com"
                    className="text-xl font-bold transition-colors hover:text-primary sm:text-2xl"
                  >
                    jazmedia46@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/50 mb-3">
                    SOCIAL
                  </p>
                  <div className="flex flex-col gap-5">
                    {/* YOUTUBE */}
                    <a href="#" className="group flex items-center gap-3 text-lg font-semibold transition-colors hover:text-primary w-fit">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground group-hover:text-primary transition-colors">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                      </svg>
                      YouTube
                      <span className="text-sm transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-primary">↗</span>
                    </a>
                    {/* INSTAGRAM */}
                    <a href="#" className="group flex items-center gap-3 text-lg font-semibold transition-colors hover:text-primary w-fit">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground group-hover:text-primary transition-colors">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                      Instagram
                      <span className="text-sm transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-primary">↗</span>
                    </a>
                    {/* TIKTOK */}
                    <a href="#" className="group flex items-center gap-3 text-lg font-semibold transition-colors hover:text-primary w-fit">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground group-hover:text-primary transition-colors">
                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                      </svg>
                      TikTok
                      <span className="text-sm transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-primary">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: FORM CARD */}
            <div className="relative animate-in fade-in slide-in-from-right-8 duration-700 delay-300 fill-mode-both">
              <div className="relative rounded-[2.5rem] border border-white/10 bg-background/60 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
                <h2 className="text-2xl font-black uppercase tracking-[-0.04em] mb-8">
                  SEND A MESSAGE
                </h2>

                {state?.success ? (
                  <div className="rounded-2xl bg-green-500/10 p-6 text-center border border-green-500/20">
                    <p className="font-bold text-green-500 mb-2">Message Sent!</p>
                    <p className="text-sm text-foreground/70">{state.message}</p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="mt-6 text-xs font-bold uppercase tracking-widest text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form action={formAction} className="flex flex-col gap-6">
                    {state?.error && (
                      <div className="rounded-xl bg-red-500/10 p-4 border border-red-500/20">
                        <p className="text-sm font-semibold text-red-500">{state.error}</p>
                      </div>
                    )}
                    {/* NAME & EMAIL ROW */}
                    <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-[0.1em] text-primary">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="rounded-xl border border-transparent bg-white px-5 py-4 text-sm font-semibold text-black outline-none transition-colors placeholder:text-black/40 focus:border-primary focus:bg-white"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-[0.1em] text-primary">
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
                  </div>

                  {/* SUBJECT */}
                  <div className="flex flex-col gap-3 mt-4">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-primary">
                      What are you writing about?
                    </p>
                    <input type="hidden" name="subject" value={subject} />
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((item) => {
                        const selected = subject === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setSubject(item)}
                            className={`rounded-full px-5 py-2.5 text-xs font-bold tracking-wider uppercase transition-all ${
                              selected
                                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                : "bg-white text-black/60 hover:bg-white/90 hover:text-black border border-transparent"
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-[0.1em] text-primary">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="How can I help you?"
                      className="rounded-xl border border-transparent bg-white px-5 py-4 text-sm font-semibold text-black outline-none transition-colors placeholder:text-black/40 focus:border-primary focus:bg-white resize-none"
                    />
                  </div>

                  {/* SUBMIT */}
                  <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                    <p className="max-w-[200px] text-[10px] uppercase tracking-wider text-foreground/40 font-semibold leading-relaxed">
                      By sending, you agree to receive a reply via email.
                    </p>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-primary px-10 py-5 text-sm font-bold tracking-widest uppercase text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(255,100,0,0.4)] disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isPending ? "SENDING..." : "SEND IT"}
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}