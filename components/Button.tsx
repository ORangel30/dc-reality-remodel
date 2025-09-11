"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import React, { type ReactNode } from "react";

type Variant = "gold" | "marble" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  text?: string;
  href?: string;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function Button({
  text,
  href,
  variant = "gold",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#BFA76A]";

  const sizes: Record<Size, string> = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-7 py-3.5",
  };

  const variants: Record<Variant, string> = {
    gold:
      "bg-[#BFA76A] text-white hover:bg-[#BFA76A] shadow-[0_6px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_0_12px_4px_rgba(212,175,55,0.45)] dark:hover:shadow-[0_0_14px_4px_rgba(212,175,55,0.55)] transition-shadow duration-300",
    marble:
      "bg-[url('/images/marble-texture.jpeg')] bg-cover bg-center text-[#3A2F1B] border border-white/50 backdrop-blur-sm hover:brightness-105 hover:shadow-[0_10px_28px_rgba(0,0,0,0.16)]",
    outline:
      "bg-transparent text-[#3A2F1B] border border-[#BFA76A] hover:bg-[#BFA76A] hover:text-white",
  };

  const width = fullWidth ? "w-full" : "";
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${width} ${className} group`;

  const content = (
    <motion.span
      initial={{ y: 0 }}
      whileHover={{ y: -0.5 }}
      transition={{ duration: 0.15 }}
      className="inline-flex items-center gap-2"
    >
      {children ?? text}
      <span className="ml-2 inline-block opacity-0 transform -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
        →
      </span>
    </motion.span>
  );

  const component = href ? (
    <Link href={href} className={classes} aria-label={text}>
      {content}
    </Link>
  ) : (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      aria-label={text}
      {...props}
    >
      {content}
    </motion.button>
  );

  return (
    <>
      {component}
      <style jsx>{`
        .btn-arrow {
          position: relative;
        }
        .btn-arrow::after {
          content: "→";
          display: inline-block;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.2s, transform 0.2s;
          margin-left: 0.5ch;
        }
        .btn-arrow:hover::after {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </>
  );
}