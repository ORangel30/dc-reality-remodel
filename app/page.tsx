"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { motion, type Variants, useScroll, useTransform, useSpring } from "framer-motion"
import Link from "next/link"
import Navbar from "../components/Navbar"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
}

const serviceCardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Home() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [showTop, setShowTop] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const logoY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const logoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const mouseX = useSpring(0, springConfig)
  const mouseY = useSpring(0, springConfig)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(media.matches)
    const handler = () => setPrefersReducedMotion(media.matches)
    media.addEventListener?.("change", handler)
    return () => media.removeEventListener?.("change", handler)
  }, [])

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!prefersReducedMotion) {
        const x = (e.clientX / window.innerWidth - 0.5) * 12
        const y = (e.clientY / window.innerHeight - 0.5) * 8
        setOffset({ x, y })
        mouseX.set(x)
        mouseY.set(y)
      }
    }
    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove)
    }
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [prefersReducedMotion, mouseX, mouseY])

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 320)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const tilt = useMemo(() => {
    if (prefersReducedMotion) return { rotateX: 0, rotateY: 0 }
    const rotateX = -(offset.y / 8)
    const rotateY = offset.x / 8
    return { rotateX, rotateY }
  }, [offset, prefersReducedMotion])

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen font-sans text-[#3A2F1B] dark:text-[#F3EFE6] transition-colors duration-500 overflow-x-hidden px-6 xl:px-32 2xl:px-48"
    >
      <div className="absolute inset-0 -z-10 marble-bg" />
      <motion.div
        className="absolute inset-0 -z-9 marble-veil"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 50]),
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2),transparent)] transition-opacity duration-1000 -z-8"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5], [0.3, 0.8]),
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Navbar />

        <section
          ref={heroRef}
          className="flex flex-col items-center justify-center min-h-screen lg:min-h-[70vh] text-center pt-24"
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full flex items-center justify-center"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#BFA76A]/20 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.2, 0.6, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent dark:from-black/25 transition-all duration-500 pointer-events-none" />

            <motion.img
              src="/images/newlogo.webp"
              alt="David Campos brand mark"
              width={1536}
              height={1024}
              style={{
                y: logoY,
                scale: logoScale,
                opacity: logoOpacity,
                transform: `translate(${offset.x}px, ${offset.y}px)`,
              }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              className="relative z-10 w-[80vw] max-w-[640px] 2xl:max-w-[900px] drop-shadow-xl mix-blend-luminosity dark:mix-blend-screen dark:drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] will-change-transform [transform-style:preserve-3d]"
              animate={prefersReducedMotion ? {} : tilt}
            />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 text-4xl md:text-5xl lg:text-[5vw] font-serif font-semibold transition-colors duration-500 leading-tight"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Luxury
            </motion.span>
            <span className="dot-sep" aria-hidden="true">
              •
            </span>
            <motion.span
              className="shine-text italic text-[#BFA76A]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Reimagined
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg md:text-xl max-w-xl text-[#4B3F2A] dark:text-[#E8E3D7] leading-relaxed transition-colors duration-500"
          >
            Elevate your space with timeless design. Discover bespoke realty and remodeling tailored for distinction.
          </motion.p>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mt-12 w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <motion.div variants={serviceCardVariants}>
                <Link href="/properties" className="group block">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-black/70 backdrop-blur-xl border border-white/50 dark:border-white/20 shadow-lg hover:shadow-xl hover:shadow-[#BFA76A]/20 transition-all duration-500 p-10 md:p-12 group-hover:border-[#BFA76A]/40"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#BFA76A]/5 via-transparent to-[#BFA76A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#BFA76A]/10 dark:bg-[#BFA76A]/20 group-hover:bg-[#BFA76A]/20 transition-all duration-300">
                        <svg className="w-8 h-8 text-[#BFA76A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-serif font-light text-[#3A2F1B] dark:text-[#F3EFE6] mb-4 group-hover:text-[#BFA76A] transition-colors duration-300 leading-tight">
                        Premium Properties
                      </h3>

                      <p className="text-[#4B3F2A] dark:text-[#E8E3D7] leading-relaxed mb-6 font-light">
                        Discover Austin's finest properties with expert market insights and personalized service.
                      </p>

                      <div className="inline-flex items-center text-[#BFA76A] font-medium group-hover:translate-x-2 transition-transform duration-300">
                        Explore Properties
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div variants={serviceCardVariants}>
                <Link href="/remodeling" className="group block">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-black/70 backdrop-blur-xl border border-white/50 dark:border-white/20 shadow-lg hover:shadow-xl hover:shadow-[#BFA76A]/20 transition-all duration-500 p-10 md:p-12 group-hover:border-[#BFA76A]/40"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#BFA76A]/5 via-transparent to-[#BFA76A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#BFA76A]/10 dark:bg-[#BFA76A]/20 group-hover:bg-[#BFA76A]/20 transition-all duration-300">
                        <svg className="w-8 h-8 text-[#BFA76A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                          />
                        </svg>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-serif font-light text-[#3A2F1B] dark:text-[#F3EFE6] mb-4 group-hover:text-[#BFA76A] transition-colors duration-300 leading-tight">
                        Luxury Remodeling
                      </h3>

                      <p className="text-[#4B3F2A] dark:text-[#E8E3D7] leading-relaxed mb-6 font-light">
                        Transform your space with bespoke craftsmanship and timeless design excellence.
                      </p>

                      <div className="inline-flex items-center text-[#BFA76A] font-medium group-hover:translate-x-2 transition-transform duration-300">
                        View Projects
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="px-6 py-20 pt-28 md:pt-32 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
        >
          <Link href="/about" passHref>
            <motion.div
              variants={fadeUp}
              whileHover={{
                scale: 1.02,
                y: -4,
                boxShadow: "0 20px 40px rgba(191,167,106,0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer bg-white/70 dark:bg-black/60 backdrop-blur-sm p-8 rounded-2xl shadow-md transition-all duration-500 hover:shadow-[0_0_30px_rgba(191,167,106,0.28)] border border-white/40 dark:border-white/10 hover:border-[#BFA76A]/30 group"
            >
              <motion.h2
                className="text-3xl font-serif text-[#BFA76A] mb-4 group-hover:scale-105 transition-transform duration-300"
                whileHover={{ x: 4 }}
              >
                About Us
              </motion.h2>
              <p className="text-[#4B3F2A] dark:text-[#E8E3D7] leading-relaxed transition-colors duration-500 group-hover:text-[#3A2F1B] dark:group-hover:text-[#F3EFE6]">
                David Campos Realty & Remodeling specializes in premium real estate and remodeling services. We blend
                architectural precision with timeless design to elevate every space we touch.
              </p>
            </motion.div>
          </Link>

          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-2xl shadow-lg group"
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src="/images/placeholder.webp"
              alt="An example remodel or property"
              width={640}
              height={480}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
        </motion.div>
      </div>

      <footer className="relative mt-20 border-t border-[#BFA76A]/30 dark:border-[#BFA76A]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-serif text-lg font-semibold text-[#3A2F1B] dark:text-[#F3EFE6]">
              David Campos
              <span className="mx-2 text-[#BFA76A]">•</span>
              Realty & Remodeling
            </span>
            <p className="mt-2 text-sm text-[#4B3F2A]/80 dark:text-[#E8E3D7]/70">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="text-sm text-[#4B3F2A] dark:text-[#E8E3D7] text-center md:text-right space-y-1">
            <p>
              <a href="tel:+17372241030" className="hover:text-[#BFA76A] transition-colors">
                +1 (737) 224-1030
              </a>
            </p>
            <p>
              <a href="mailto:Campos33david@gmail.com" className="hover:text-[#BFA76A] transition-colors">
                Campos33david@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>

      <motion.button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed right-6 bottom-6 z-50 rounded-full p-4 border-2 border-[#BFA76A]/40 
          bg-white/90 dark:bg-black/70 backdrop-blur-md transition-all duration-500 
          hover:border-[#BFA76A] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] 
          ${showTop ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-8"}`}
        whileHover={{
          scale: 1.1,
          y: -2,
          boxShadow: "0 8px 25px rgba(191,167,106,0.3)",
        }}
        whileTap={{ scale: 0.95 }}
        animate={
          showTop
            ? {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }
            : {
                opacity: 0,
                y: 20,
              }
        }
      >
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="stroke-current text-[#3A2F1B] dark:text-[#F3EFE6]"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.button>

      <style jsx>{`
        @keyframes glowText {
          0% {
            text-shadow: 0 0 0px rgba(191, 167, 106, 0.12);
          }
          50% {
            text-shadow: 0 0 10px rgba(191, 167, 106, 0.28);
          }
          100% {
            text-shadow: 0 0 0px rgba(191, 167, 106, 0.12);
          }
        }
        @keyframes sweep {
          0% {
            transform: translateX(-120%) skewX(-20deg);
            opacity: 0;
          }
          30% {
            opacity: 0.25;
          }
          60% {
            opacity: 0.15;
          }
          100% {
            transform: translateX(120%) skewX(-20deg);
            opacity: 0;
          }
        }
        @keyframes veilPulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.9;
          }
        }

        .shine-text {
          position: relative;
          display: inline-block;
          animation: glowText 5s ease-in-out infinite;
        }
        .shine-text::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.28) 45%,
            rgba(255, 255, 255, 0) 100%
          );
          mix-blend-mode: screen;
          pointer-events: none;
          transform: translateX(-120%) skewX(-20deg);
          animation: sweep 6.5s linear infinite;
        }

        .dot-sep {
          display: inline-block;
          margin: 0 0.35ch;
          color: #bfa76a;
          line-height: 1;
          transform: translateY(-0.03em);
          font-weight: 600;
        }

        .marble-veil {
          animation: veilPulse 10s ease-in-out infinite;
        }

        footer a {
          text-decoration: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .shine-text,
          .shine-text::after,
          .marble-veil {
            animation: none;
          }
        }
      `}</style>
    </main>
  )
}
