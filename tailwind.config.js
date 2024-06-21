const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = /** @satisfies {import('tailwindcss').Config} */ ({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      strokeWidth: {
        1.5: "1.5px",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
    fontFamily: {
      manrope: ["Manrope"],
    },
    colors: {
      transparent: "transparent",
      Absolute: {
        Black: "#000000",
        White: "#ffffff",
      },
      Red: {
        45: "#e50000",
        50: "#ff0000",
        55: "#ff1919",
        60: "#ff3333",
        80: "#ff9999",
        90: "#ffcccc",
        95: "#ffe5e5",
        99: "#fffafa",
      },
      Black: {
        6: "#0F0F0F",
        8: "#141414",
        10: "#1A1A1A",
        12: "#1F1F1F",
        15: "#262626",
        20: "#333333",
        25: "#404040",
        30: "#4C4C4C",
      },
      Grey: {
        60: "#999999",
        65: "#A6A6A6",
        70: "#B3B3B3",
        75: "#BFBFBF",
        90: "#E4E4E7",
        95: "#F1F1F3",
        97: "#F7F7F8",
        99: "#FCFCFD",
      },
      Form: {
        Blue: "#1A56DB",
        Green: "#238626",
        White: "#F9FAFB",
        Red: "#F85149"
      },
    },

    screens: {
      xs: "360px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1440px",
    },
    container: {
      center: true,
      screens: {
        md: "110rem",
      },
    },
  },
});
