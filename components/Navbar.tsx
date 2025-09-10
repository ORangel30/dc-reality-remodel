"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import ThemeToggle from "./ThemeToggle"

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Remodeling", href: "/remodeling" },
  { label: "Contact", href: "/contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState("up")
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)

      // Track scroll direction for mobile navbar hiding
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up")
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [lastScrollY])

  const baseBtn =
    "inline-flex items-center justify-center rounded-full font-serif font-medium text-sm md:text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BFA76A] hover:scale-105 active:scale-95"
  const outlineBtn =
    "border border-[#BFA76A]/70 text-[#3A2F1B] dark:text-[#F3EFE6] hover:bg-[#BFA76A] hover:text-white hover:shadow-lg hover:shadow-[#BFA76A]/25"

  return (
    <nav
      className={`
        fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-white/40 dark:bg-black/40
        transition-all ease-in-out duration-500 border-b border-white/20 dark:border-white/10
        ${scrolled ? "md:py-2 lg:py-4 xl:py-5 2xl:py-6" : "md:py-4 lg:py-6 xl:py-8 2xl:py-10"}
        ${scrollDirection === "down" && scrolled ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <div className="mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32">
        {/* ✨ Enhanced Logo with hover animation */}
        <Link href="/" className="group">
          <span
            className={`font-serif text-lg font-semibold tracking-wide transition-all duration-500 group-hover:scale-105 ${
              scrolled ? "opacity-70" : "opacity-100"
            }`}
          >
            <span className="bg-gradient-to-r from-[#3A2F1B] via-[#BFA76A] to-[#3A2F1B] dark:from-[#F3EFE6] dark:via-[#BFA76A] dark:to-[#F3EFE6] bg-clip-text text-transparent bg-size-200 group-hover:bg-pos-100 transition-all duration-700">
              David Campos
            </span>
            <span className="mx-2 text-[#BFA76A] group-hover:animate-pulse">•</span>
            <span className="text-[#3A2F1B]/80 dark:text-[#F3EFE6]/80 group-hover:text-[#BFA76A] transition-colors duration-300">
              Realty & Remodeling
            </span>
          </span>
        </Link>

        {/* Desktop Links with enhanced animations */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ label, href }) => {
            const active = pathname === href
            const isContact = label === "Contact"

            if (isContact) {
              return (
                <Link key={href} href={href} aria-current={active ? "page" : undefined} className="group">
                  <button
                    className={`${baseBtn} relative px-8 py-3 rounded-full border-2 border-[#BFA76A]
                                text-[#3A2F1B] dark:text-[#F3EFE6] overflow-hidden
                                transition-all duration-500 hover:border-[#BFA76A]/50
                                hover:bg-gradient-to-r hover:from-[#BFA76A]/10 hover:to-[#BFA76A]/20
                                dark:hover:shadow-[0_0_20px_rgba(191,167,106,0.4)]
                                hover:shadow-[0_8px_25px_rgba(191,167,106,0.3)]`}
                  >
                    <span className="relative z-10 font-medium">Contact</span>
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#BFA76A]/30 to-transparent
                                 -translate-x-full group-hover:translate-x-full
                                 transition-transform duration-1000 pointer-events-none"
                    />
                  </button>
                </Link>
              )
            }

            return (
              <Link
                key={href}
                href={href}
                className={`
                  ${baseBtn} px-6 py-3 rounded-full border-2 ${outlineBtn} group
                  ${active ? "bg-[#BFA76A] text-white border-[#BFA76A] shadow-lg shadow-[#BFA76A]/25" : ""}
                `}
                aria-current={active ? "page" : undefined}
              >
                <span className="relative overflow-hidden font-medium">
                  {label}
                  <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-gradient-to-r from-[#BFA76A] to-[#BFA76A]/50 group-hover:w-full transition-[width] duration-500"></span>
                </span>
              </Link>
            )
          })}

          <a
            href="https://instagram.com/guayo.me"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-full border-2 border-[#BFA76A]/50 hover:border-[#BFA76A] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#BFA76A]/25"
            aria-label="Follow on Instagram"
          >
            <svg
              className="w-5 h-5 text-[#BFA76A] group-hover:scale-110 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          <ThemeToggle />
        </div>

        {/* Enhanced Mobile Menu Toggle */}
        <button
          className={`${baseBtn} md:hidden px-4 py-3 border-2 ${outlineBtn} relative overflow-hidden`}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`}>{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Enhanced Mobile Menu */}
      {open && (
        <div
          className={`md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-[#BFA76A]/20 px-4 pb-6 space-y-3 transition-all duration-500 ${open ? "animate-in slide-in-from-top-2" : ""}`}
        >
          {links.map(({ label, href }, index) => {
            const active = pathname === href
            const isContact = label === "Contact"

            if (isContact) {
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="group block"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <button
                    className={`${baseBtn} w-full relative px-8 py-4 rounded-2xl border-2 border-[#BFA76A]
                                text-[#3A2F1B] dark:text-[#F3EFE6] overflow-hidden font-medium
                                transition-all duration-500 hover:scale-105
                                hover:bg-gradient-to-r hover:from-[#BFA76A]/10 hover:to-[#BFA76A]/20
                                dark:hover:shadow-[0_0_20px_rgba(191,167,106,0.4)]`}
                  >
                    <span className="relative z-10">Contact</span>
                  </button>
                </Link>
              )
            }

            return (
              <Link
                key={href}
                href={href}
                className={`${baseBtn} w-full border-2 ${outlineBtn} px-6 py-4 rounded-2xl font-medium block ${
                  active ? "bg-[#BFA76A] text-white border-[#BFA76A]" : ""
                }`}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {label}
              </Link>
            )
          })}

          <a
            href="https://instagram.com/guayo.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl border-2 border-[#BFA76A]/50 text-[#BFA76A] hover:border-[#BFA76A] hover:bg-[#BFA76A]/10 transition-all duration-300 font-medium"
            onClick={() => setOpen(false)}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.689-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Follow @guayo.me
          </a>

          <div className="pt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  )
}
