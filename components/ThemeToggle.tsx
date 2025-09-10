"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const stored = localStorage.getItem("theme");
    const initial = stored ? stored === "dark" : prefersDark;
    setDark(initial);
    document.documentElement.classList.remove("dark");
    if (initial) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.remove("dark");
    if (next) {
      document.documentElement.classList.add("dark");
    }
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="text-gold-rich hover:text-gold-light transition text-sm font-semibold"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}