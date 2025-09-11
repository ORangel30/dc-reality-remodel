"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Navbar from "@/components/Navbar"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

export default function PropertiesPage() {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null)

  const properties = [
    {
      id: 1,
      title: "Modern Austin Estate",
      location: "West Lake Hills",
      price: "$2,850,000",
      beds: 4,
      baths: 3.5,
      sqft: "3,200",
      status: "For Sale",
      coordinates: { lat: 30.3, lng: -97.8 },
      description: "Stunning contemporary estate with panoramic hill country views and premium finishes throughout.",
    },
    {
      id: 2,
      title: "Downtown Luxury Condo",
      location: "Downtown Austin",
      price: "$1,200,000",
      beds: 2,
      baths: 2,
      sqft: "1,800",
      status: "For Sale",
      coordinates: { lat: 30.27, lng: -97.74 },
      description: "Sophisticated urban living with floor-to-ceiling windows and city skyline views.",
    },
    {
      id: 3,
      title: "Hill Country Retreat",
      location: "Dripping Springs",
      price: "$3,500,000",
      beds: 5,
      baths: 4,
      sqft: "4,500",
      status: "For Sale",
      coordinates: { lat: 30.19, lng: -98.09 },
      description: "Private sanctuary nestled among oak trees with resort-style amenities and guest quarters.",
    },
    {
      id: 4,
      title: "Contemporary Townhome",
      location: "South Austin",
      price: "$950,000",
      beds: 3,
      baths: 2.5,
      sqft: "2,400",
      status: "For Sale",
      coordinates: { lat: 30.23, lng: -97.77 },
      description: "Modern townhome in vibrant South Austin with rooftop terrace and designer finishes.",
    },
    {
      id: 5,
      title: "Lakefront Villa",
      location: "Lake Travis",
      price: "$4,200,000",
      beds: 6,
      baths: 5,
      sqft: "5,800",
      status: "For Sale",
      coordinates: { lat: 30.39, lng: -97.97 },
      description: "Waterfront masterpiece with private dock, infinity pool, and unobstructed lake views.",
    },
    {
      id: 6,
      title: "Urban Loft",
      location: "East Austin",
      price: "$750,000",
      beds: 2,
      baths: 1.5,
      sqft: "1,400",
      status: "For Sale",
      coordinates: { lat: 30.26, lng: -97.72 },
      description: "Industrial chic loft with exposed brick, polished concrete floors, and artistic flair.",
    },
  ]

  // Filter only properties for sale
  const forSaleProperties = properties.filter((p) => p.status === "For Sale")

  return (
    <main className="relative min-h-screen font-sans text-[#3A2F1B] dark:text-[#F3EFE6] transition-colors duration-500 overflow-x-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 marble-bg" />
      <div className="absolute inset-0 marble-veil" />
      <div className="absolute inset-0 pointer-events-none dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2),transparent)] transition-opacity duration-1000" />

      <div className="relative z-10">
        <Navbar />

        <section className="pt-40 pb-32 px-6 xl:px-32 2xl:px-48">
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-20">
              <div className="inline-block mb-8">
                <span className="text-sm font-medium tracking-[0.2em] uppercase text-[#BFA76A] opacity-80">
                  Austin Real Estate
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-12 leading-[0.9] tracking-tight">
                Featured
                <br />
                <span className="italic text-[#BFA76A]">Properties</span>
              </h1>
              <div className="max-w-2xl mx-auto">
                <p className="text-lg md:text-xl text-[#4B3F2A] dark:text-[#E8E3D7] leading-relaxed font-light">
                  Discover exceptional homes across Austin and surrounding areas, each offering unique character and
                  premium amenities for discerning buyers.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

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
                Available Properties
              </h2>
              <div className="w-24 h-px bg-[#BFA76A] mb-8"></div>
            </motion.div>

            <div className="space-y-24">
              {properties.map((property, index) => (
                <motion.div key={index} variants={fadeUp} className="group grid md:grid-cols-2 gap-12 items-center">
                  {/* Property Image */}
                  <div className={`relative overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <div className="aspect-[4/3] relative overflow-hidden bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl">
                      <img
                        src="/images/placeholder.webp"
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                          {property.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className={`space-y-6 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                    <div>
                      <span className="text-sm font-medium tracking-[0.15em] uppercase text-[#BFA76A] opacity-80">
                        {property.location}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-light text-[#3A2F1B] dark:text-[#F3EFE6] leading-tight">
                      {property.title}
                    </h3>
                    <p className="text-[#4B3F2A] dark:text-[#E8E3D7] leading-relaxed font-light text-lg">
                      {property.description}
                    </p>

                    <div className="flex gap-12 pt-4">
                      <div>
                        <div className="text-sm font-medium tracking-[0.1em] uppercase text-[#BFA76A] opacity-80 mb-1">
                          Price
                        </div>
                        <div className="text-lg font-light text-[#3A2F1B] dark:text-[#F3EFE6]">{property.price}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium tracking-[0.1em] uppercase text-[#BFA76A] opacity-80 mb-1">
                          Details
                        </div>
                        <div className="text-lg font-light text-[#3A2F1B] dark:text-[#F3EFE6]">
                          {property.beds} bed • {property.baths} bath • {property.sqft} sq ft
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="py-32 px-6 xl:px-32 2xl:px-48 bg-white/30 dark:bg-black/30 backdrop-blur-sm">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-6 text-[#3A2F1B] dark:text-[#F3EFE6]">
                Austin Area Map
              </h2>
              <div className="w-24 h-px bg-[#BFA76A] mx-auto mb-8"></div>
              <p className="text-lg text-[#4B3F2A] dark:text-[#E8E3D7] max-w-2xl mx-auto font-light">
                Explore available properties across Austin and surrounding communities. Click markers to view details.
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 dark:bg-black/60 backdrop-blur-sm border border-white/40 dark:border-white/10 shadow-lg overflow-hidden">
              {/* Map Container */}
              <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-[#BFA76A]/10 to-[#BFA76A]/5">
                {/* Stylized Austin Map Background */}
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 400 300" className="w-full h-full">
                    {/* Austin city outline */}
                    <path
                      d="M50 150 Q100 100 150 120 Q200 140 250 130 Q300 120 350 150 Q320 200 280 220 Q240 240 200 230 Q160 220 120 200 Q80 180 50 150"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-[#BFA76A]/30"
                    />
                    {/* Lake Travis */}
                    <ellipse cx="80" cy="100" rx="25" ry="15" fill="currentColor" className="text-[#BFA76A]/20" />
                    {/* Downtown area */}
                    <rect x="180" y="140" width="40" height="30" fill="currentColor" className="text-[#BFA76A]/15" />
                  </svg>
                </div>

                {/* Property Markers */}
                {forSaleProperties.map((property) => (
                  <button
                    key={property.id}
                    onClick={() => setSelectedProperty(selectedProperty === property.id ? null : property.id)}
                    className="absolute group transition-all duration-300 hover:scale-110"
                    style={{
                      left: `${((property.coordinates.lng + 98.2) / 1.5) * 100}%`,
                      top: `${((30.6 - property.coordinates.lat) / 0.6) * 100}%`,
                    }}
                  >
                    {/* Marker */}
                    <div className="relative">
                      <div
                        className={`w-6 h-6 rounded-full border-3 border-white shadow-lg transition-all duration-300 ${
                          selectedProperty === property.id
                            ? "bg-[#BFA76A] scale-125"
                            : "bg-green-500 hover:bg-[#BFA76A]"
                        }`}
                      >
                        <div className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-30"></div>
                      </div>

                      {/* Property Info Popup */}
                      {selectedProperty === property.id && (
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 bg-white/95 dark:bg-black/95 backdrop-blur-xl rounded-2xl border border-[#BFA76A]/20 shadow-2xl p-4 z-10">
                          <div className="text-left">
                            <h4 className="font-serif font-light text-[#3A2F1B] dark:text-[#F3EFE6] mb-1">
                              {property.title}
                            </h4>
                            <p className="text-sm text-[#4B3F2A] dark:text-[#E8E3D7] mb-2">{property.location}</p>
                            <p className="text-lg font-serif font-light text-[#BFA76A] mb-3">{property.price}</p>
                            <div className="flex justify-between text-xs text-[#4B3F2A] dark:text-[#E8E3D7]">
                              <span>{property.beds} beds</span>
                              <span>{property.baths} baths</span>
                              <span>{property.sqft} sq ft</span>
                            </div>
                          </div>
                          {/* Arrow pointing to marker */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/95 dark:border-t-black/95"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-[#3A2F1B] dark:text-[#F3EFE6] font-light">Available Properties</span>
                  </div>
                </div>

                {/* Austin Label */}
                <div className="absolute top-4 right-4 bg-[#BFA76A]/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                  <span className="text-white font-serif font-light">Austin, TX</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}
