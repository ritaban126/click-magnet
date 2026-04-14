import { dark } from "@clerk/themes";

export const clerkModalAppearance = {
  theme: dark,
  variables: {
    // Primary brand color - Blue
    colorPrimary: "oklch(0.55 0.18 260)",
    colorPrimaryForeground: "oklch(1 0 0)",

    // Background and foreground
    colorBackground: "oklch(0.18 0.03 280)",
    colorForeground: "oklch(0.93 0.01 260)",

    // Card and surface
    colorCard: "oklch(0.18 0.03 280)",
    colorCardForeground: "oklch(0.93 0.01 260)",

    // Input field
    colorInput: "oklch(0.24 0.04 275)",
    colorInputForeground: "oklch(0.93 0.01 260)",

    // Secondary
    colorSecondary: "oklch(0.24 0.04 275)",
    colorSecondaryForeground: "oklch(0.93 0.01 260)",

    // Muted
    colorMuted: "oklch(0.15 0.025 280)",
    colorMutedForeground: "oklch(0.70 0.02 260)",

    // Accent - Violet
    colorAccent: "oklch(0.60 0.22 300)",
    colorAccentForeground: "oklch(1 0 0)",

    // Border
    colorBorder: "oklch(0.30 0.05 275)",

    // Ring - Blue
    colorRing: "oklch(0.55 0.18 260)",

    fontFamily: "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    borderRadius: "0.625rem",
    borderRadiusSmall: "0.375rem",
    borderRadiusLarge: "0.875rem",
  },
  elements: {
    formButtonPrimary: {
      backgroundColor: "oklch(0.55 0.18 260)",        // Blue
      color: "oklch(1 0 0)",
      "&:hover": {
        backgroundColor: "oklch(0.50 0.18 260)",
      },
      "&:active": {
        backgroundColor: "oklch(0.45 0.18 260)",
      },
    },
    formButtonReset: {
      backgroundColor: "oklch(0.24 0.04 275)",
      color: "oklch(0.93 0.01 260)",
      borderColor: "oklch(0.30 0.05 275)",
      "&:hover": {
        backgroundColor: "oklch(0.28 0.04 275)",
      },
    },
    card: {
      backgroundColor: "oklch(0.18 0.03 280)",
      borderColor: "oklch(0.30 0.05 275)",
    },
    headerTitle: {
      color: "oklch(0.93 0.01 260)",
      fontFamily: "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    headerSubtitle: {
      color: "oklch(0.70 0.02 260)",
    },
    socialButtonsBlockButton: {
      backgroundColor: "oklch(0.24 0.04 275)",
      color: "oklch(0.93 0.01 260)",
      borderColor: "oklch(0.30 0.05 275)",
      "&:hover": {
        backgroundColor: "oklch(0.28 0.04 275)",
      },
    },
    formFieldInput: {
      backgroundColor: "oklch(0.24 0.04 275)",
      color: "oklch(0.93 0.01 260)",
      borderColor: "oklch(0.30 0.05 275)",
      "&:focus": {
        borderColor: "oklch(0.55 0.18 260)",           // Blue focus ring
        boxShadow: "0 0 0 1px oklch(0.55 0.18 260)",
      },
    },
    footerActionLink: {
      color: "oklch(0.60 0.22 300)",                   // Violet for links
      "&:hover": {
        color: "oklch(0.55 0.22 300)",
      },
    },
  },
} as const;