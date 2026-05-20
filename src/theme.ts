import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    // Breakpoints harmonisés exclusivement en pixels
    breakpoints: {
      base: "0px",
      sm: "480px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
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
          800: { value: "#FCFCFF" },
          900: { value: "#10497A" },
          950: { value: "#08253D" },
        },
        darkGrey: {
          50: { value: "#F7F7F7" },
          100: { value: "#C5CBCB" },
          200: { value: "#A8B0B0" },
          300: { value: "#8B9696" },
          400: { value: "#6E7C7C" },
          500: { value: "#535E5E" },
          600: { value: "#3C4444" },
          700: { value: "#282E2E" },
          800: { value: "#171A1A" },
          900: { value: "#0B0C0C" },
          950: { value: "#050505" },
        },
        royalBlue: {
          50: { value: "#DAE4FF" },
          100: { value: "#C5D4FF" },
          200: { value: "#97B2FF" },
          300: { value: "#6C91FF" },
          400: { value: "#4169E1" },
          500: { value: "#274CB3" },
          600: { value: "#1D3885" },
          700: { value: "#132557" },
          800: { value: "#0A122B" },
          900: { value: "#03060E" },
          950: { value: "#010205" },
        },
        brandGreen: {
          50: { value: "#CCEEE7" },
          100: { value: "#99DCCF" },
          200: { value: "#66CBB7" },
          300: { value: "#33B99F" },
          400: { value: "#00A887" },
          500: { value: "#00876C" },
          650: { value: "#006652" },
          700: { value: "#004537" },
          800: { value: "#00261E" },
          900: { value: "#00100D" },
          950: { value: "#000504" },
        },
        lightGreen: {
          50: { value: "#E6F4F2" },
          100: { value: "#CDE9E4" },
          200: { value: "#B3DDD7" },
          300: { value: "#9AD2C9" },
          400: { value: "#81C7BC" },
          500: { value: "#62ABA0" },
          600: { value: "#498F84" },
          700: { value: "#34665E" },
          800: { value: "#1F3D38" },
          900: { value: "#0D1A18" },
          950: { value: "#050A09" },
        },
        lightGrey: {
          50: { value: "#F3F4F4" },
          100: { value: "#E7E9E9" },
          200: { value: "#DADDDF" },
          300: { value: "#CED2D4" },
          400: { value: "#C2C7CA" },
          500: { value: "#A4ABB0" },
          600: { value: "#858D93" },
          700: { value: "#666D72" },
          800: { value: "#484D51" },
          900: { value: "#2B2E31" },
          950: { value: "#141617" },
        },
        errorRed: {
          50: { value: "#FCD6D5" },
          100: { value: "#F8ADAB" },
          200: { value: "#F58381" },
          300: { value: "#F15A58" },
          400: { value: "#EE312E" },
          500: { value: "#C61B18" },
          600: { value: "#9B1513" },
          700: { value: "#700F0E" },
          800: { value: "#460909" },
          900: { value: "#210404" },
          950: { value: "#0D0101" },
        },
        warnOrange: {
          50: { value: "#FBC9AB" },
          100: { value: "#F8AD80" },
          200: { value: "#F69256" },
          300: { value: "#F7B086" },
          400: { value: "#FF8C00" },
          500: { value: "#CC7000" },
          600: { value: "#995400" },
          700: { value: "#663800" },
          800: { value: "#331C00" },
          900: { value: "#1A0E00" },
          950: { value: "#0A0500" },
        },
        successGreen: {
          50: { value: "#EAF9E6" },
          100: { value: "#C0E3B5" },
          200: { value: "#A1D690" },
          300: { value: "#81C86B" },
          400: { value: "#62BB46" },
          500: { value: "#499631" },
          600: { value: "#34665E" },
          700: { value: "#214416" },
          800: { value: "#11220B" },
          900: { value: "#050B03" },
          950: { value: "#020401" },
        },
      },
      fonts: {
        body: { value: "Afterglow, sans-serif" },
        heading: { value: "Afterglow, sans-serif" },
        mono: { value: "Lato, monospace" },
      },
      lineHeights: {
        normal: { value: "1.5" },
        heading: { value: "38px" },
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
  },
  // 🌟 AJOUT V3 : Configuration des styles globaux appliqués à l'application
  globalCss: {
    html: {
      fontSize: "12px",
    },
    body: {
      backgroundColor: "gray.50",
      overflowX: "hidden",
      overflowY: "hidden",
    },
    // 🌟 STYLE CUSTOM POUR LES BARRES DE DÉFILEMENT (Scrollbars)
    "::-webkit-scrollbar": {
      width: "8px", // Épaisseur pour le défilement vertical
      height: "8px", // Épaisseur pour le défilement horizontal (ton cas précis)
    },
    "::-webkit-scrollbar-track": {
      background: "#F3F4F4", // Fond de la barre (équivalent à ton lightGrey.50)
      borderRadius: "full",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#C2C7CA", // Couleur de la jauge au repos (lightGrey.400)
      borderRadius: "full",
      border: "2px solid #F3F4F4", // Crée un léger effet d'espacement interne élégant
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#1E90FF", // La jauge s'illumine en bleu au survol (dogerBlue.400)
    },
    // Compatibilité Firefox standard
    "html, body": {
      scrollbarWidth: "thin",
      scrollbarColor: "#C2C7CA #F3F4F4",
    },
  },
});

export const system = createSystem(defaultConfig, config);
