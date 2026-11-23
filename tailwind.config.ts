import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        odiva: {
          forest: "#174B35",
          green: "#42A66C",
          turmeric: "#F3C84B",
          orange: "#F28C45",
          red: "#C94742",
          cream: "#FFF8EA",
          peach: "#FBE5D8",
          lavender: "#EAE4FA",
          sky: "#DCEFFA",
          dark: "#1A2E26",
          sand: "#F7F3E9",
          border: "#E5DEC9",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        odia: ["var(--font-odia)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "sambalpuri-pattern": "radial-gradient(#174B35 0.75px, transparent 0.75px), radial-gradient(#F28C45 0.75px, #FFF8EA 0.75px)",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(23, 75, 53, 0.08)",
        card: "0 10px 25px -5px rgba(23, 75, 53, 0.06), 0 8px 10px -6px rgba(23, 75, 53, 0.04)",
        glow: "0 0 25px -5px rgba(242, 140, 69, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
