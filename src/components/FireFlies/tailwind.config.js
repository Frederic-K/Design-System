/** @type {import('tailwindcss').Config} */

module.exports = {
  theme: {
    extend: {
      animation: {
        fireFliesMove: "fireFliesMove 5s ease-in-out infinite",
      },
      keyframes: {
        fireFliesMove: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-10px) translateX(10px)" },
        },
      },
      backgroundImage: {
        "firefly-radial":
          "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
      },
    },
  },
  plugins: [],
}
