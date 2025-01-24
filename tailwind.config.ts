import scrollbarHidePlugin from "tailwind-scrollbar-hide";
import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-pretendard)", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        page: "var(--spacing-page)",
      },
      colors: {
        background: {
          DEFAULT: "var(--color-background)",
          100: "var(--color-background-100)",
          200: "var(--color-background-200)",
          hover: "var(--color-background-hover)",
        },
        main: "var(--color-main)",
        sub: "var(--color-sub)",
        subtle: "var(--color-subtle)",
        placeholder: "var(--color-placeholder)",
        border: "var(--color-border)",
        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)",
          lighter: "var(--color-primary-lighter)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          dark: "var(--color-secondary-dark)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          dark: "var(--color-error-dark)",
          lighter: "var(--color-error-lighter)",
        },
        ring: {
          DEFAULT: "var(--color-ring)",
          error: "var(--color-ring-error)",
        },
      },
      keyframes: {
        "dropdown-open": {
          from: { opacity: "0", transform: "translateY(-4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "dialog-open": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animationTimingFunction: {
        "out-quad": "cubic-bezier(0.5, 1, 0.89, 1)",
        "out-cubic": "cubic-bezier(0.33, 1, 0.68, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "dropdown-open": "dropdown-open 0.15s ease-out",
        "dialog-open": "dialog-open 0.15s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        fab: "0px 2px 6px 0px rgba(0, 0, 0, .16)",
      },
    },
  },
  plugins: [animatePlugin, scrollbarHidePlugin],
} satisfies Config;

export default config;
