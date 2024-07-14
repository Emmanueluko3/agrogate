/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customLightGray: "#F9FAFB",
        customLightGrayTwo: "#E5E6EB",
        customMediumGray: "#4B5163",
        customDarkGray: "#4B5163",
        customBlack: "#111128",
        primary: {
          50: "#ebf3ee",
          100: "#d8e6de",
          150: "#c4dacd",
          200: "#b1cdbc",
          250: "#9dc1ac",
          300: "#89b59b",
          350: "#76a88a",
          400: "#629c79",
          450: "#4f8f69",
          500: "#3b8358",
          550: "#35764f",
          600: "#2f6946",
          650: "#295c3e",
          700: "#234f35",
          750: "#1e422c",
          800: "#183423",
          850: "#12271a",
          900: "#0c1a12",
          950: "#060d09",
        },
      },
      fontFamily: {
        adhiguno: ["Adhiguno", "sans-serif"],
      },
    },
  },
  plugins: [],
};
