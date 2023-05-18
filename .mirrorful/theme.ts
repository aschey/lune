
  export type Colors = keyof typeof Tokens.colors
  export type FontSize = keyof typeof Tokens.fontSizes
  export type Shadows = keyof typeof Tokens.boxShadows

  export type Token = Colors | FontSize | Shadows

  export const Tokens = {
  colors: {
    riptide: {
      '50': '#ffffff',
      '100': '#effcfb',
      '200': '#d0f8f3',
      '300': '#b1f3eb',
      '400': '#99efe5',
      '500': '#7aeadd',
      '600': '#5be5d5',
      '700': '#24dcc7',
      '800': '#1ebeac',
      '900': '#199f90',
      base: '#7aeadd',
    },
    mindaro: {
      '50': '#ffffff',
      '100': '#fafcef',
      '200': '#f2f8d0',
      '300': '#e9f3b1',
      '400': '#e2ef99',
      '500': '#d9ea7a',
      '600': '#d0e55b',
      '700': '#c0dc24',
      '800': '#a6be1e',
      '900': '#8b9f19',
      base: '#d9ea7a',
    },
    'chetwode-blue': {
      '50': '#ffffff',
      '100': '#f0effc',
      '200': '#d4d0f8',
      '300': '#b8b1f3',
      '400': '#a199ef',
      '500': '#857aea',
      '600': '#695be5',
      '700': '#3624dc',
      '800': '#2e1ebe',
      '900': '#26199f',
      base: '#857aea',
    },
    froly: {
      '50': '#ffffff',
      '100': '#fcefef',
      '200': '#f8d0d0',
      '300': '#f3b1b1',
      '400': '#ef9999',
      '500': '#ea7a7a',
      '600': '#e55b5b',
      '700': '#dc2424',
      '800': '#be1e1e',
      '900': '#9f1919',
      base: '#ea7a7a',
    },
  },
  fontSizes: {
    sm: '1rem',
    md: '1.2rem',
    lg: '1.4rem',
  },
  fontWeights: {
    light: '200',
    normal: '400',
    bold: '700',
  },
  lineHeights: {
    short: '1',
    normal: '1.5',
    tall: '2',
  },
  boxShadows: {
    sm: '1rem',
    md: '1.2rem',
    lg: '1.4rem',
  },
}
  