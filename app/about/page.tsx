"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen font-sans text-[#3A2F1B] dark:text-[#F3EFE6] transition-colors duration-500 overflow-x-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 marble-bg" />
      <div className="absolute inset-0 marble-veil" />
      <div className="absolute inset-0 pointer-events-none dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2),transparent)] transition-opacity duration-1000" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 xl:px-32 2xl:px-48">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 leading-tight">
                About David Campos
              </h1>
              <p className="text-xl text-[#4B3F2A] dark:text-[#E8E3D7] leading-relaxed max-w-3xl mx-auto">
                Combining years of real estate expertise with exceptional remodeling craftsmanship to transform Austin's
                luxury properties and create extraordinary living experiences.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-6 xl:px-32 2xl:px-48">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeUp}>
                <img src="/images/placeholder.webp" alt="David Campos" className="w-full rounded-3xl shadow-2xl" />
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#3A2F1B] dark:text-[#F3EFE6]">
                  Our Story
                </h2>
                <div className="space-y-4 text-[#4B3F2A] dark:text-[#E8E3D7] leading-relaxed">
                  <p>
                    Founded on the principle that every space has the potential for transformation, David Campos Realty
                    & Remodeling has been Austin's trusted partner for luxury real estate and premium renovations.
                  </p>
                  <p>
                    With deep roots in the Austin community and an eye for timeless design, we understand that your home
                    is more than just a property—it's the foundation of your lifestyle and the backdrop for your most
                    precious memories.
                  </p>
                  <p>
                    Our dual expertise in real estate and remodeling allows us to see potential where others see
                    limitations, creating value through strategic improvements and helping clients find or create their
                    perfect space.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link href="/contact" className="group">
                    <button className="px-6 py-3 rounded-full bg-[#BFA76A] text-white font-semibold shadow-lg hover:bg-[#D6C08A] hover:shadow-xl hover:shadow-[#BFA76A]/30 transition-all duration-300 group-hover:scale-105">
                      Work With Us
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 xl:px-32 2xl:px-48">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="rounded-3xl bg-white/70 dark:bg-black/60 backdrop-blur-sm border border-white/40 dark:border-white/10 p-12 shadow-lg">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6 text-[#3A2F1B] dark:text-[#F3EFE6]">
                Ready to Find Your Dream Property?
              </h2>
              <p className="text-lg text-[#4B3F2A] dark:text-[#E8E3D7] mb-8 leading-relaxed">
                Explore our curated selection of luxury properties in Austin and surrounding areas. From modern condos
                to sprawling estates, find your perfect home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/properties" className="group">
                  <button className="px-8 py-4 rounded-full bg-[#BFA76A] text-white font-semibold shadow-lg hover:bg-[#D6C08A] hover:shadow-xl hover:shadow-[#BFA76A]/30 transition-all duration-300 group-hover:scale-105">
                    View Properties
                  </button>
                </Link>
                <Link href="/contact" className="group">
                  <button className="px-8 py-4 rounded-full border-2 border-[#BFA76A] text-[#BFA76A] font-semibold hover:bg-[#BFA76A] hover:text-white transition-all duration-300 group-hover:scale-105">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}