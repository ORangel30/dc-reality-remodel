"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useMemo, useState } from "react";

type Guide = {
  title: string;
  min: number;
  max: number;
  note: string;
};

const GUIDES: Guide[] = [
  {
    title: "Kitchen Remodel",
    min: 8000,
    max: 25000,
    note: "Cabinetry, counters, fixtures, lighting",
  },
  {
    title: "Bathroom Remodel",
    min: 5000,
    max: 18000,
    note: "Tile, vanity, shower, plumbing updates",
  },
  {
    title: "Flooring (Whole Home)",
    min: 3000,
    max: 12000,
    note: "Laminate, LVP, hardwood options",
  },
  {
    title: "Roof Replacement",
    min: 4500,
    max: 12000,
    note: "Asphalt shingle; varies by pitch & area",
  },
];

const formatUSD = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export default function CostGuidesPage() {
  const [budget, setBudget] = useState(15000);
  const filtered = useMemo(
    () => GUIDES.filter((g) => g.min <= budget),
    [budget]
  );

  return (
    <main
      className="
        relative min-h-screen font-sans
        text-[#3A2F1B] dark:text-[#F3EFE6]
        transition-all duration-500 overflow-hidden
      "
    >
      {/* Marble background + veil + vignette */}
      <div className="absolute inset-0 marble-bg" />
      <div className="absolute inset-0 marble-veil" />
      <div
        className="
          absolute inset-0 pointer-events-none
          dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4),transparent)]
          transition-opacity duration-1000
        "
      />

      <div className="relative z-10">
        <Navbar />

        {/* Full-width content wrapper */}
        <div className="mx-auto w-full max-w-none px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 pt-28 pb-20">
          {/* Heading + intro */}
          <section className="max-w-3xl">
            <h1
              className="
                text-3xl md:text-4xl font-serif font-semibold tracking-tight
                transition-colors duration-500
              "
            >
              Remodeling
              <span className="mx-2 text-[#BFA76A]">•</span>
              Cost Guides
            </h1>
            <p
              className="
                mt-3 text-base md:text-lg
                text-[#4B3F2A] dark:text-[#E8E3D7]
                transition-colors duration-500
              "
            >
              Estimated ranges based on recent high-end remodels across Austin
              and surrounding areas. Explore by budget, then request a tailored
              quote for your space.
            </p>
          </section>

          {/* Budget slider */}
          <section
            className="
              mt-8 rounded-2xl border border-white/40 dark:border-white/10
              bg-white/70 dark:bg-black/60 backdrop-blur-sm
              p-6 shadow-sm transition-colors duration-500
            "
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm uppercase tracking-wide text-[#4B3F2A]/80 dark:text-[#E8E3D7]/80">
                  Your budget
                </div>
                <div className="mt-1 text-2xl font-serif font-semibold">
                  {formatUSD(budget)}
                </div>
              </div>

              <div className="md:flex-1">
                <input
                  type="range"
                  min={3000}
                  max={30000}
                  step={500}
                  value={budget}
                  onChange={(e) => setBudget(+e.target.value)}
                  aria-label="Budget slider"
                  className="w-full accent-[#BFA76A]"
                />
                <div className="flex justify-between text-xs text-[#4B3F2A]/70 dark:text-[#E8E3D7]/70 mt-1">
                  <span>{formatUSD(3000)}</span>
                  <span>{formatUSD(30000)}</span>
                </div>
              </div>

              <div className="shrink-0">
                <Link href="/contact">
                  <button
                    className="
                      px-5 py-2.5 rounded-full bg-[#BFA76A] text-white
                      font-semibold shadow hover:bg-[#D6C08A] transition-all
                    "
                  >
                    Get a free estimate
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Guides list */}
          <section className="mt-10 grid gap-6 md:grid-cols-2">
            {filtered.map((g) => (
              <article
                key={g.title}
                className="
                  rounded-xl border border-white/40 dark:border-white/10
                  bg-white/60 dark:bg-black/60 backdrop-blur-sm
                  p-6 shadow-sm hover:shadow-md
                  transition-colors duration-500
                "
              >
                <h3 className="text-xl font-serif font-semibold">
                  {g.title}
                </h3>
                <div className="mt-2 text-[#BFA76A] font-semibold">
                  {formatUSD(g.min)} – {formatUSD(g.max)}
                </div>
                <p className="mt-2 text-[#4B3F2A] dark:text-[#E8E3D7]">
                  {g.note}
                </p>

                <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#BFA76A]/30 to-transparent" />

                <div className="mt-4 flex items-center gap-2 text-sm text-[#4B3F2A]/80 dark:text-[#E8E3D7]/80">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#BFA76A]" />
                  <span>
                    Projects like this often start around {formatUSD(g.min)}
                  </span>
                </div>
              </article>
            ))}
          </section>

          {/* Subtle note */}
          <p
            className="
              mt-8 text-sm text-[#4B3F2A]/70 dark:text-[#E8E3D7]/70
              transition-colors duration-500 max-w-3xl
            "
          >
            Final pricing varies by scope, material selections, and site
            conditions. We’ll help you shape the right plan.
          </p>
        </div>
      </div>
    </main>
  );
}