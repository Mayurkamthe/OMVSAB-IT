/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F7931A",
        secondary: "#1A1A1A",
        accent: "#E5E5E5",
        blue: { DEFAULT: "#2563EB", light: "#EFF6FF", mid: "#BFDBFE" },
        purple: { DEFAULT: "#7C3AED", light: "#F5F3FF", mid: "#DDD6FE" },
        teal: { DEFAULT: "#0891B2", light: "#ECFEFF", mid: "#A5F3FC" },
        emerald: { DEFAULT: "#059669", light: "#ECFDF5", mid: "#A7F3D0" },
        rose: { DEFAULT: "#E11D48", light: "#FFF1F2", mid: "#FECDD3" },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #1A1A1A 0%, #2d1f0e 50%, #1A1A1A 100%)",
        "orange-gradient": "linear-gradient(135deg, #F7931A 0%, #f97316 100%)",
        "blue-gradient": "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
      },
    },
  },
  plugins: [],
}
