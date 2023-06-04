import { Preview } from "storybook-solidjs";
import { themes } from "@storybook/theming";
import { withThemeByDataAttribute } from "@storybook/addon-styling";

import { Tokens } from "../.mirrorful/theme";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    docs: {
      theme: themes.dark,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "lune",
      values: [
        {
          name: "lune",
          value: Tokens.colors.background["base"],
        },
      ],
    },
  },
};

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
    attributeName: "data-mode",
  }),
];

export default preview;
