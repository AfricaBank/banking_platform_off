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
        primary: {
          // Colors
          dogerBlue: {
            0: { value: "#D5EBFF" },
            50: { value: "#87CEFA" },
            100: { value: "#87CEEB" },
            101: { value: "#99CCFF" }, // Sidebar background color
            102: { value: "#1E90FF" }, // Active menu color
            200: { value: "#00BFFF" },
            300: { value: "#1E90FF" },
            400: { value: "#fcfcff" },
          },
          darkGrey: {
            0: { value: "#E2E5E5" },
            50: { value: "#C5CBCB" },
            100: { value: "#A8B0B0" },
            200: { value: "#8B9696" },
            300: { value: "#6E7C7C" },
          },
        },
        secondary: {
          royalBlue: {
            0: { value: "#DAE4FF" },
            50: { value: "#C5D4FF" },
            100: { value: "#97B2FF" },
            200: { value: "#6C91FF" },
            300: { value: "#4169E1" },
          },
          green: {
            0: { value: "#CCEEE7" },
            50: { value: "#99DCCF" },
            100: { value: "#66CBB7" },
            200: { value: "#33B99F" },
            300: { value: "#00A887" },
          },
          lightGreen: {
            0: { value: "#E6F4F2" },
            50: { value: "#CDE9E4" },
            100: { value: "#B3DDD7" },
            200: { value: "#9AD2C9" },
            300: { value: "#81C7BC" },
          },
          lightGrey: {
            0: { value: "#F3F4F4" },
            50: { value: "#E7E9E9" },
            100: { value: "#DADDDF" },
            200: { value: "#CED2D4" },
            300: { value: "#C2C7CA" },
          },
        },
        //-------------------------------
        // State colors
        state: {
          // Red color for errors
          red: {
            0: { value: "#FCD6D5" },
            50: { value: "#F8ADAB" },
            100: { value: "#F58381" },
            200: { value: "#F15A58" },
            300: { value: "#EE312E" },
          },
          // Orange for warning
          orange: {
            0: { value: "#F7B086" },
            50: { value: "#FBC9AB" },
            100: { value: "#F8AD80" },
            200: { value: "#F69256" },
            300: { value: "#FF8C00" },
          },
          // Green for success
          green: {
            0: { value: "#B1F09D" },
            50: { value: "#C0E3B5" },
            100: { value: "#A1D690" },
            200: { value: "#81C86B" },
            300: { value: "#62BB46" },
          },
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
      colors: {},
    },
    keyframes: {}, // to configure if needed
  },
});

export const system = createSystem(defaultConfig, config);
