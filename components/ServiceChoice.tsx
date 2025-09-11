"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ServiceChoice() {
  const services = [
    {
      href: "/services/realtor",
      title: "Realtor Services",
      imgSrc: "/illustrations/realtor.svg",
      imgAlt: "House outline icon",
    },
    {
      href: "/services/remodeling",
      title: "Remodeling Services",
      imgSrc: "/illustrations/remodel.svg",
      imgAlt: "Blueprint icon",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 px-4 md:px-12 my-16">
      {services.map(({ href, title, imgSrc, imgAlt }) => (
        <Link key={href} href={href} className="group flex-1">
          <motion.div
            initial={{ y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="
              relative
              bg-white dark:bg-black
              rounded-3xl
              border border-gray-200 dark:border-white/10
              overflow-hidden
              shadow-lg
              transform
              transition-all duration-300 ease-in-out
              hover:-translate-y-1
              hover:shadow-[0_15px_45px_rgba(0,0,0,0.15)]
            "
          >
            <div className="p-8 flex justify-center">
              <Image
                src={imgSrc}
                alt={imgAlt}
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
            <h3 className="text-center font-serif text-xl font-semibold mb-8">
              {title}
            </h3>

            {/* Shimmer sweep */}
            <span
              className="
                absolute inset-0
                bg-gradient-to-r from-transparent via-white/20 to-transparent
                -translate-x-full group-hover:translate-x-full
                transition-transform duration-700
                pointer-events-none
              "
            />
          </motion.div>
        </Link>
      ))}
    </div>
  );
}