/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enables manual toggle + respects system preference
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/globals.css" // ✅ Added to ensure Tailwind scans your custom CSS
  ],
  safelist: [
    "marble-bg",       // ✅ Matches your actual custom class
    "marble-veil",     // ✅ Matches your actual custom class
    "text-dark-gray"   // ✅ Still valid if used dynamically
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        "dark-gray": "#333333",
        "marble-white": "#fdfdfd",
        "gold-light": "#FFD700",
        "gold-rich": "#D4AF37",
        "espresso": "#3A2F1B",
        "ivory": "#F3EFE6",
      },
    },
  },
  plugins: [],
};