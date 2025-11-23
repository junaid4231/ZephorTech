import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0076D1",
          50: "#E6F3FC",
          100: "#CCE7F9",
          200: "#99CFF3",
          300: "#66B7ED",
          400: "#339FE7",
          500: "#0076D1",
          600: "#005EA7",
          700: "#00477D",
          800: "#002F54",
          900: "#00182A",
        },
        gradient: {
          from: "#004E8F",
          to: "#0076D1",
        },
        dark: "#0A0A0A",
        "text-dark": "#111827",
        secondary: "#6B7280",
        background: "#F9FAFB",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 118, 209, 0.1), 0 10px 20px -2px rgba(0, 118, 209, 0.05)",
        "soft-lg":
          "0 10px 40px -10px rgba(0, 118, 209, 0.15), 0 20px 40px -5px rgba(0, 118, 209, 0.1)",
        glow: "0 0 20px rgba(0, 118, 209, 0.4), 0 0 40px rgba(0, 118, 209, 0.2)",
        "glow-lg": "0 0 30px rgba(0, 118, 209, 0.6), 0 0 60px rgba(0, 118, 209, 0.3), 0 0 90px rgba(0, 118, 209, 0.2)",
      },
      animation: {
        "gradient-shift": "gradient-shift 3s ease infinite",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "border-rotate": "border-rotate 3s linear infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "border-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

