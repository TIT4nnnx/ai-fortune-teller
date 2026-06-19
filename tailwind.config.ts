import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        mystic: {
          50: "#f5f0ff",
          100: "#ede5ff",
          200: "#dcd0ff",
          300: "#c4adff",
          400: "#a87dff",
          500: "#8b47ff",
          600: "#7c22ff",
          700: "#6b10ef",
          800: "#590dc8",
          900: "#4a0da3",
          950: "#2d0067",
        },
        cosmic: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
          950: "#4a044e",
        },
        starlight: {
          gold: "#ffd700",
          silver: "#c0c0c0",
          rose: "#ff6b9d",
          teal: "#4ecdc4",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "Anuphan", "sans-serif"],
        body: ["Anuphan", "sans-serif"],
      },
      backgroundImage: {
        "cosmic-gradient":
          "radial-gradient(ellipse at top, #1a0533 0%, #0a0015 50%, #000008 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(139,71,255,0.15) 0%, rgba(217,70,239,0.10) 100%)",
        "glow-gradient":
          "radial-gradient(circle, rgba(139,71,255,0.4) 0%, transparent 70%)",
        "gold-shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.3) 50%, transparent 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "crystal-spin": "crystalSpin 8s linear infinite",
        "orbit": "orbit 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(139,71,255,0.4)" },
          "50%": { boxShadow: "0 0 60px rgba(139,71,255,0.8), 0 0 100px rgba(217,70,239,0.4)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(0.7)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        crystalSpin: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.1)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(80px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(80px) rotate(-360deg)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "mystic": "0 0 30px rgba(139,71,255,0.3), 0 0 60px rgba(139,71,255,0.1)",
        "mystic-lg": "0 0 50px rgba(139,71,255,0.5), 0 0 100px rgba(217,70,239,0.2)",
        "gold": "0 0 20px rgba(255,215,0,0.4), 0 0 40px rgba(255,215,0,0.1)",
        "card": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
