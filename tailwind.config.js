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
        catppuccin: {
          primary: "#b4befe",
          secondary: "#89b4fa",
          accent: "#74c7ec",
          neutral: "#313244",
          "neutral-content": "#bac2de",
          "base-100": "#1e1e2e",
          "base-200": "#181825",
          "base-300": "#11111b",
          "base-content": "#cdd6f4",
        },
      },
    ],
  },
};
