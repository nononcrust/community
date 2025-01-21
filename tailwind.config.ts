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
    },
  },
  plugins: [animatePlugin, scrollbarHidePlugin],
} satisfies Config;

export default config;
