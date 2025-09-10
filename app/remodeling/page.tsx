"use client"

import { motion, Variants } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/Navbar"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0, 0, 0.58, 1] }, // easeOut cubic bezier
  },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

export default function RemodelingPage() {
  const projects = [
    {
      title: "Modern Kitchen Transformation",
      category: "Kitchen Remodel",
      description:
        "Complete kitchen renovation featuring custom cabinetry, quartz countertops, and premium appliances.",
      duration: "6 weeks",
      investment: "$85,000",
    },
    {
      title: "Spa-Inspired Master Bath",
      category: "Bathroom Renovation",
      description:
        "Luxurious master bathroom with natural stone, heated floors, and custom vanity.",
      duration: "4 weeks",
      investment: "$45,000",
    },
    {
      title: "Open Concept Living",
      category: "Whole Home",
      description:
        "Structural renovation creating seamless flow between kitchen, dining, and living areas.",
      duration: "12 weeks",
      investment: "$150,000",
    },
    {
      title: "Outdoor Living Oasis",
      category: "Outdoor Space",
      description:
        "Custom deck, outdoor kitchen, and landscaping for year-round entertaining.",
      duration: "8 weeks",
      investment: "$65,000",
    },
    {
      title: "Historic Home Revival",
      category: "Restoration",
      description:
        "Careful restoration preserving original character while adding modern amenities.",
      duration: "16 weeks",
      investment: "$200,000",
    },
    {
      title: "Contemporary Addition",
      category: "Home Addition",
      description:
        "Seamless addition adding 800 sq ft of living space with floor-to-ceiling windows.",
      duration: "14 weeks",
      investment: "$180,000",
    },
  ]

  return (
    <main className="relative min-h-screen font-sans text-[#3A2F1B] dark:text-[#F3EFE6] transition-colors duration-500 overflow-x-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 marble-bg" />
      <div className="absolute inset-0 marble-veil" />
      <div className="absolute inset-0 pointer-events-none dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2),transparent)] transition-opacity duration-1000" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-40 pb-32 px-6 xl:px-32 2xl:px-48">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-center mb-20"
            >
              <div className="inline-block mb-8">
                <span className="text-sm font-medium tracking-[0.2em] uppercase text-[#BFA76A] opacity-80">
                  Custom Home Remodeling
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-12 leading-[0.9] tracking-tight">
                Transforming
                <br />
                <span className="italic text-[#BFA76A]">Spaces</span>
              </h1>
              <div className="max-w-2xl mx-auto">
                <p className="text-lg md:text-xl text-[#4B3F2A] dark:text-[#E8E3D7] leading-relaxed font-light">
                  Where architectural vision meets meticulous craftsmanship to create extraordinary
                  living environments that reflect your unique lifestyle.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-32 px-6 xl:px-32 2xl:px-48">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeUp} className="mb-20">
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-[#3A2F1B] dark:text-[#F3EFE6]">
                Recent Projects
              </h2>
              <div className="w-24 h-px bg-[#BFA76A] mb-8"></div>
            </motion.div>

            <div className="space-y-24">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="group grid md:grid-cols-2 gap-12 items-center"
                >
                  {/* Image */}
                  <div
                    className={`relative overflow-hidden ${
                      index % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl">
                      <img
                        src="/images/placeholder.webp"
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className={`space-y-6 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                    <div>
                      <span className="text-sm font-medium tracking-[0.15em] uppercase text-[#BFA76A] opacity-80">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-light text-[#3A2F1B] dark:text-[#F3EFE6] leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-[#4B3F2A] dark:text-[#E8E3D7] leading-relaxed font-light text-lg">
                      {project.description}
                    </p>

                    <div className="flex gap-12 pt-4">
                      <div>
                        <div className="text-sm font-medium tracking-[0.1em] uppercase text-[#BFA76A] opacity-80 mb-1">
                          Duration
                        </div>
                        <div className="text-lg font-light text-[#3A2F1B] dark:text-[#F3EFE6]">
                          {project.duration}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium tracking-[0.1em] uppercase text-[#BFA76A] opacity-80 mb-1">
                          Investment
                        </div>
                        <div className="text-lg font-light text-[#3A2F1B] dark:text-[#F3EFE6]">
                          {project.investment}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Approach Section */}
        <section className="py-32 px-6 xl:px-32 2xl:px-48 bg-white/30 dark:bg-black/30 backdrop-blur-sm">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeUp} className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-[#3A2F1B] dark:text-[#F3EFE6]">
                Our Approach
              </h2>
              <div className="w-24 h-px bg-[#BFA76A] mx-auto mb-8"></div>
              <p className="text-lg text-[#4B3F2A] dark:text-[#E8E3D7] max-w-2xl mx-auto font-light">
                Every project begins with understanding your vision and ends with exceeding your
                expectations.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-16">
              {["Design Consultation", "Precision Execution", "Lasting Excellence"].map(
                (step, i) => (
                  <motion.div key={i} variants={fadeUp} className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-8 rounded-full border border-[#BFA76A]/30 flex items-center justify-center group-hover:border-[#BFA76A] transition-colors duration-500">
                      <span className="text-2xl font-serif font-light text-[#BFA76A]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-light mb-4 text-[#3A2F1B] dark:text-[#F3EFE6]">
                      {step}
                    </h3>
                    <p className="text-[#4B3F2A] dark:text-[#E8E3D7] leading-relaxed font-light">
                      {i === 0 &&
                        "Collaborative planning to understand your vision, lifestyle, and aesthetic preferences."}
                      {i === 1 &&
                        "Meticulous craftsmanship using premium materials and time-tested construction methods."}
                      {i === 2 &&
                        "Delivering spaces that enhance your daily life and stand the test of time."}
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 xl:px-32 2xl:px-48">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 text-[#3A2F1B] dark:text-[#F3EFE6] leading-tight">
              Ready to Begin?
            </h2>
            <p className="text-lg text-[#4B3F2A] dark:text-[#E8E3D7] mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              Let's discuss your vision and explore how we can transform your space into something
              extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="group">
                <button className="px-12 py-4 rounded-full bg-[#BFA76A] text-white font-medium tracking-wide hover:bg-[#D6C08A] transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#BFA76A]/25">
                  Start Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}
