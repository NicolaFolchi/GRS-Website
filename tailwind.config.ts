import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B1C3D",
        gold: "#C5A059",
        charcoal: "#212529",
        soft: "#F5F7FA",
        cool: "#DCE1E6",
        steel: "#B4BED2",
      },
      boxShadow: {
        premium: "0 24px 80px rgba(11, 28, 61, 0.14)",
        navy: "0 28px 90px rgba(5, 13, 30, 0.32)",
      },
      backgroundImage: {
        "radial-gold": "radial-gradient(circle at top right, rgba(197,160,89,0.26), transparent 34%)",
        "navy-grid": "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
