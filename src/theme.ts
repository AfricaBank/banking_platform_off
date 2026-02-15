import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    breakpoints: {
      base: "0px",
      sm: "480px",
      md: "768px",
      lg: "992px",
      xl: "120em",
      "2xl": "1536px",
    },
    tokens: {
      colors: {
        dogerBlue: {
          50: { value: "#D5EBFF" },
          100: { value: "#99CCFF" },
          200: { value: "#87CEFA" },
          300: { value: "#87CEEB" },
          400: { value: "#1E90FF" },
          500: { value: "#1E90FF" },
          600: { value: "#00BFFF" },
          700: { value: "#1C7ED6" },
          800: { value: "#fcfcff" },
        },
        darkGrey: {
          50: { value: "#f7f7f7" },
          100: { value: "#C5CBCB" },
          200: { value: "#A8B0B0" },
          300: { value: "#8B9696" },
          400: { value: "#6E7C7C" },
        },
        royalBlue: {
          50: { value: "#DAE4FF" },
          100: { value: "#C5D4FF" },
          200: { value: "#97B2FF" },
          300: { value: "#6C91FF" },
          400: { value: "#4169E1" },
        },
        brandGreen: {
          50: { value: "#CCEEE7" },
          100: { value: "#99DCCF" },
          200: { value: "#66CBB7" },
          300: { value: "#33B99F" },
          400: { value: "#00A887" },
        },
        lightGreen: {
          50: { value: "#E6F4F2" },
          100: { value: "#CDE9E4" },
          200: { value: "#B3DDD7" },
          300: { value: "#9AD2C9" },
          400: { value: "#81C7BC" },
        },
        lightGrey: {
          50: { value: "#F3F4F4" },
          100: { value: "#E7E9E9" },
          200: { value: "#DADDDF" },
          300: { value: "#CED2D4" },
          400: { value: "#C2C7CA" },
        },
        errorRed: {
          50: { value: "#FCD6D5" },
          100: { value: "#F8ADAB" },
          200: { value: "#F58381" },
          300: { value: "#F15A58" },
          400: { value: "#EE312E" },
        },
        warnOrange: {
          50: { value: "#F7B086" },
          100: { value: "#FBC9AB" },
          200: { value: "#F8AD80" },
          300: { value: "#F69256" },
          400: { value: "#FF8C00" },
        },
        successGreen: {
          50: { value: "#B1F09D" },
          100: { value: "#C0E3B5" },
          200: { value: "#A1D690" },
          300: { value: "#81C86B" },
          400: { value: "#62BB46" },
        },
      },
      fonts: {
        body: { value: "Afterglow, sans-serif" },
        heading: { value: "Afterglow" },
        mono: { value: "Lato, monospace" },
      },
      sizes: {
        base: { value: "0px" },
        sm: { value: "480px" },
        md: { value: "768px" },
        lg: { value: "992px" },
        xl: { value: "120em" },
        "2xl": { value: "1536px" },
      }, // to configure if needed
      fontSizes: {
        sm: { value: "14px" },
        md: { value: "15px" },
        lg: { value: "25px" },
        xl: { value: "35px" },
      },
      fontWeights: {
        normal: { value: "400" },
        medium: { value: "500" },
        bold: { value: "700" },
        extrabold: { value: "800" },
      },
      borders: {}, // to configure if needed
      borderWidths: {}, // to configure if needed
      shadows: {}, // to configure if needed
      opacity: {}, // to configure if needed
      lineHeights: {
        normal: { value: "38px" },
      },
      radii: {
        none: { value: "0px" },
        sm: { value: "2px" },
        base: { value: "4px" },
        md: { value: "6px" },
        lg: { value: "8px" },
        xl: { value: "12px" },
        "2xl": { value: "16px" },
        "3xl": { value: "24px" },
        full: { value: "9999px" },
      },
    },
    semanticTokens: {
      colors: {
        sidebar: {
          bg: { value: "{colors.dogerBlue.100}" },
          itemActive: { value: "{colors.dogerBlue.500}" },
        },
        danger: {
          solid: { value: "{colors.errorRed.400}" },
          muted: { value: "{colors.errorRed.100}" },
        },
        warning: {
          solid: { value: "{colors.warnOrange.400}" },
          muted: { value: "{colors.warnOrange.200}" },
        },
        success: {
          solid: { value: "{colors.successGreen.400}" },
          muted: { value: "{colors.successGreen.50}" },
        },
        text: {
          main: { value: "{colors.darkGrey.400}" },
          muted: { value: "{colors.darkGrey.200}" },
        },
      },
    },
    keyframes: {}, // to configure if needed
  },
});

export const system = createSystem(defaultConfig, config);
