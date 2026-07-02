import type { Config } from "tailwindcss";

// ShareLynk design tokens — premium dark blue gradient theme.
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Brand palette
        brand: {
          blue: "#0F4CFF",
          cyan: "#00C2FF",
          navy: "#07132B",
        },
        ink: {
          950: "#050B1A",
          900: "#07132B",
          800: "#0B1B3B",
          700: "#122551",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,194,255,0.15), 0 20px 60px -20px rgba(15,76,255,0.55)",
        "glow-sm": "0 10px 40px -12px rgba(15,76,255,0.5)",
        card: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 50px -30px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 50% 0%, rgba(15,76,255,0.25), transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "gradient-x": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        shimmer: "shimmer 2.5s infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
