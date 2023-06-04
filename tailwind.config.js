import { Tokens } from "./.mirrorful/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
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
