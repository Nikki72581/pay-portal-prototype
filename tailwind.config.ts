import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d6edff",
          200: "#b5e0ff",
          300: "#84ccff",
          400: "#4cb2ff",
          500: "#1d98ff",
          600: "#0d7be0",
          700: "#0a63b4",
          800: "#0a528f",
          900: "#0a4776"
        },
        accent: { 500: "#22c55e" }
      }
    }
  },
  plugins: []
};
export default config;
