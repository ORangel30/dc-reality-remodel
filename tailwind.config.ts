import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your custom fixed palette
        gold: "#C9A96A",
        "gold-dark": "#B08E4A",
        "marble-white": "#F5F5F5",
        "dark-gray": "#333333",
        "light-gray": "#A0A0A0",
        black: "#000000",

        // CSS variable-driven palette (for bg-background, text-foreground, etc.)
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        // Luxury branding via CSS vars
        espresso: "var(--color-espresso)",
        "gold-rich": "var(--color-gold-rich)",
        "gold-light": "var(--color-gold-light)",
        "marble-dark": "var(--color-marble-dark)",
        "text-muted": "var(--color-text-muted)",
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
