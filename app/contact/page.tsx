"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSent(false);

    const formData = {
      name: e.currentTarget.name.value,
      email: e.currentTarget.email.value,
      phone: e.currentTarget.phone.value,
      message: e.currentTarget.message.value,
    };

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_CONTACT_API!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSent(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setError(
        "Something went wrong. Please try again or use an alternate contact method."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const fieldBase =
    "w-full rounded-md px-4 py-3 bg-white/85 dark:bg-black/40 backdrop-blur-sm border border-[#3A2F1B]/10 dark:border-white/10 text-[#3A2F1B] dark:text-[#F3EFE6] placeholder-[#3A2F1B]/50 dark:placeholder-[#F3EFE6]/50 focus:outline-none focus:ring-2 focus:ring-[#BFA76A] focus:border-transparent transition-colors duration-500";
  const labelBase =
    "text-sm font-medium text-[#3A2F1B] dark:text-[#F3EFE6] transition-colors duration-500";

  return (
    <main
      className="
        relative min-h-screen pt-24 font-sans
        text-[#3A2F1B] dark:text-[#F3EFE6]
        transition-colors duration-500 overflow-hidden
      "
    >
      {/* Background layers */}
      <div className="absolute inset-0 marble-bg" />
      <div className="absolute inset-0 marble-veil" />
      <div className="absolute inset-0 pointer-events-none dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4),transparent)] transition-opacity duration-1000" />

      <div className="relative z-10">
        <Navbar />

        {/* Full-width content wrapper */}
        <div className="mx-auto w-full max-w-none px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 py-16">
          {/* Header */}
          <header className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight transition-colors duration-500">
              Contact
            </h1>
            <p className="mt-3 text-lg transition-colors duration-500 text-[#4B3F2A] dark:text-[#E8E3D7]">
              Austin-area projects. We typically reply within 1 business day.
            </p>
          </header>

          <div className="mt-10 grid gap-12 md:grid-cols-2">
            {/* Form card */}
            <section
              className="
                rounded-2xl border border-white/40 dark:border-white/10
                bg-white/70 dark:bg-black/60 backdrop-blur-md
                p-6 md:p-8 shadow-sm
                transition-colors duration-500
              "
            >
              <form onSubmit={onSubmit} className="grid gap-5 max-w-xl">
                {/* Name */}
                <div>
                  <label htmlFor="name" className={labelBase}>
                    Name <span className="text-[#BFA76A]" aria-hidden>*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className={fieldBase}
                    placeholder="Full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelBase}>
                    Email <span className="text-[#BFA76A]" aria-hidden>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldBase}
                    placeholder="you@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={labelBase}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={fieldBase}
                    placeholder="(737) 224-1030"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelBase}>
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`${fieldBase} resize-none`}
                    placeholder="Tell us about your project, goals, and timeline."
                  />
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="company"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Submit */}
                <div className="mt-2 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="
                      px-6 py-3 rounded-full bg-[#BFA76A] text-white
                      font-semibold shadow-md hover:bg-[#D6C08A]
                      transition disabled:opacity-60 disabled:cursor-not-allowed
                    "
                  >
                    {submitting ? "Sending…" : "Send"}
                  </button>
                  <span className="text-sm transition-colors duration-500 text-[#4B3F2A]/80 dark:text-[#E8E3D7]/70">
                    By sending, you agree to our{" "}
                    <Link
                      href="/privacy"
                      className="underline text-[#BFA76A] hover:text-[#D6C08A]"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </div>

                {sent && (
                  <div className="mt-2 text-sm text-green-700">
                    Thanks — your message was sent. We’ll be in touch shortly.
                  </div>
                )}
                {error && (
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                )}
              </form>
            </section>

            {/* Alt channels */}
            <aside className="space-y-6">
              <div
                className="
                  rounded-2xl border border-white/40 dark:border-white/10
                  bg-white/60 dark:bg-black/50 backdrop-blur-md p-6
                  shadow-sm transition-colors duration-500
                "
              >
                <h2 className="text-xl font-serif font-semibold">
                  Prefer a quick chat?
                </h2>
                <ul className="mt-3 space-y-2 text-[#4B3F2A] dark:text-[#E8E3D7]">
                  <li>
                    <a
                      className="text-[#BFA76A] underline hover:text-[#D6C08A] transition break-all"
                      href="mailto:Campos33david@gmail.com"
                    >
                      Campos33david@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[#BFA76A] underline hover:text-[#D6C08A] transition"
                      href="tel:+17372241030"
                    >
                      +1 (737) 224-1030
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[#BFA76A] underline hover:text-[#D6C08A] transition"
                      href="https://wa.me/17372241030"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Message on WhatsApp
                    </a>
                  </li>
                </ul>

                <div className="mt-4 text-sm transition-colors duration-500 text-[#4B3F2A]/80 dark:text-[#E8E3D7]/70">
                  Austin, TX • Residential remodeling and property tours by
                  appointment.
                </div>
              </div>

              <div
                className="
                  rounded-2xl border border-white/40 dark:border-white/10
                  bg-white/50 dark:bg-black/40 backdrop-blur-md p-6
                  shadow-sm transition-colors duration-500
                "
              >
                <h3 className="text-base font-serif font-semibold">
                  What to expect
                </h3>
                                <ul className="mt-3 space-y-2 text-sm text-[#4B3F2A] dark:text-[#E8E3D7]">
                  <li>— A quick call to understand your scope and timeline</li>
                  <li>— Curated options that match your aesthetic and budget</li>
                  <li>— Transparent, itemized estimate</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}