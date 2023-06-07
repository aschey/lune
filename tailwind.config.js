import { Tokens } from "./.mirrorful/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: ({ theme }) => ({
        "shrink-bounce-in": {
          "0%": {
            transform: "scale(1.0)",
          },
          "33%": {
            transform: "scale(0.8)",
          },
          "100%": {
            transform: "scale(1.0)",
          },
        },
        "shrink-bounce-out": {
          "0%": {
            transform: "scale(1.0)",
          },
          "33%": {
            transform: "scale(0.8)",
          },
          "100%": {
            transform: "scale(1.0)",
          },
        },
        "checkbox-check": {
          "0%": {
            width: 0,
            height: 0,
            transform: "translate3d(0,0,0) rotate(45deg)",
          },
          "33%": {
            width: "0.45em",
            height: 0,
            transform: "translate3d(0,0,0) rotate(45deg)",
          },
          "100%": {
            width: "0.45em",
            height: "0.9em",
            "border-right": `3px solid ${theme("colors.base-100")}`,
            "border-bottom": `3px solid ${theme("colors.base-100")}`,
            transform: "translate3d(-0.1em,-0.75em,0) rotate(45deg)",
          },
        },
      }),
    },
  },
  plugins: [
    require("@kobalte/tailwindcss")({ prefix: "kb" }),
    require("daisyui"),
  ],
  daisyui: {
    styled: false,
    themes: [
      {
        lune: {
          primary: Tokens.colors.blue["200"],
          secondary: Tokens.colors.teal["base"],
          accent: Tokens.colors.purple["base"],
          neutral: Tokens.colors.background["400"],
          "neutral-content": Tokens.colors["light-blue"]["base"],
          "base-100": Tokens.colors.background["base"],
          "base-200": Tokens.colors.background["500"],
          "base-300": Tokens.colors.background["600"],
          "base-content": Tokens.colors.background["50"],
        },
      },
    ],
  },
};
