import { Platform } from "react-native";

export type ThemeMode = 'light' | 'dark';

// Masculine, performance-focused color palette - Dark mode first for premium feel
const lightPalette = {
  // Professional dark backgrounds for focus
  background: "#0A0A0A", // Deep black
  backgroundStart: "#0F0F11", // Dark gray
  backgroundEnd: "#000000", // Pure black
  surface: "#151518", // Dark surface
  surfaceAlt: "#1A1A1D", // Elevated dark
  surfaceElevated: "#1F1F23", // More elevated

  // Bold, masculine accent colors
  primary: "#00D9FF", // Electric cyan
  secondary: "#7B61FF", // Tech purple
  tertiary: "#00FF94", // Success green
  
  // Performance-focused colors
  blush: "#FF3366", // Energy red
  lavender: "#7B61FF", // Tech purple
  mint: "#00FF94", // Success green
  peach: "#FFB800", // Gold
  rose: "#FF3366", // Bold red
  cream: "#2A2A2E", // Dark neutral
  pearl: "#FFFFFF", // Clean white
  
  // Bold metallics for achievement
  gold: "#FFB800", // Bright gold
  roseGold: "#FF6B35", // Energy orange
  champagne: "#FFA724", // Rich amber
  bronze: "#CD7F32", // Bronze
  
  // Text hierarchy - optimized for dark
  text: "#FFFFFF", // Pure white
  textPrimary: "#FFFFFF", // Pure white
  textSecondary: "#A0A0A8", // Cool gray
  textMuted: "#6B6B70", // Muted gray
  textAccent: "#00D9FF", // Cyan accent
  textLight: "#FFFFFF", // White
  
  // System colors - bold and clear
  success: "#00FF94", // Bright green
  warning: "#FFB800", // Bright yellow
  error: "#FF3366", // Bold red
  info: "#00D9FF", // Info cyan
  danger: "#FF0040", // Danger red
  disabled: "#3A3A3E", // Disabled dark gray
  
  // Dividers and borders - subtle on dark
  divider: "#2A2A2E", // Dark divider
  border: "#3A3A3E", // Border
  borderLight: "#2A2A2E", // Light border
  
  // Overlays and effects
  overlayDark: "rgba(0,0,0,0.7)",
  overlayLight: "rgba(255,255,255,0.1)",
  overlayBlush: "rgba(0,217,255,0.15)",
  overlayGold: "rgba(255,184,0,0.15)",
  overlayLavender: "rgba(123,97,255,0.15)",
  overlaySuccess: "rgba(0,255,148,0.15)",
  overlayError: "rgba(255,51,102,0.15)",
  
  // Effects
  shimmer: "#FFFFFF",
  glow: "#00D9FF",
  highlight: "rgba(0,217,255,0.3)",
  shadow: "rgba(0,0,0,0.5)",
} as const;

const darkPalette = {
  // Deep, professional dark backgrounds
  background: "#0A0A0A", // Deep black
  backgroundStart: "#0F0F11", // Dark gray
  backgroundEnd: "#000000", // Pure black
  surface: "#151518", // Dark surface
  surfaceAlt: "#1A1A1D", // Elevated dark
  surfaceElevated: "#1F1F23", // More elevated

  // Bold, masculine accent colors
  primary: "#00D9FF", // Electric cyan
  secondary: "#7B61FF", // Tech purple
  tertiary: "#00FF94", // Success green
  
  // Performance colors
  blush: "#FF3366", // Energy red
  lavender: "#7B61FF", // Tech purple
  mint: "#00FF94", // Success green
  peach: "#FFB800", // Gold
  rose: "#FF3366", // Bold red
  cream: "#2A2A2E", // Dark neutral
  pearl: "#FFFFFF", // Clean white
  
  // Bold metallics
  gold: "#FFB800", // Bright gold
  roseGold: "#FF6B35", // Energy orange
  champagne: "#FFA724", // Rich amber
  bronze: "#CD7F32", // Bronze
  
  // Text hierarchy
  text: "#FFFFFF", // Pure white
  textPrimary: "#FFFFFF", // Pure white
  textSecondary: "#A0A0A8", // Cool gray
  textMuted: "#6B6B70", // Muted gray
  textAccent: "#00D9FF", // Cyan accent
  textLight: "#FFFFFF", // White
  
  // System colors
  success: "#00FF94", // Bright green
  warning: "#FFB800", // Bright yellow
  error: "#FF3366", // Bold red
  info: "#00D9FF", // Info cyan
  danger: "#FF0040", // Danger red
  
  // Dividers and borders
  divider: "#2A2A2E", // Dark divider
  border: "#3A3A3E", // Border
  borderLight: "#2A2A2E", // Light border
  
  // Overlays and effects
  overlayDark: "rgba(0,0,0,0.7)",
  overlayLight: "rgba(255,255,255,0.1)",
  overlayBlush: "rgba(0,217,255,0.15)",
  overlayGold: "rgba(255,184,0,0.15)",
  overlayLavender: "rgba(123,97,255,0.15)",
  overlaySuccess: "rgba(0,255,148,0.15)",
  overlayError: "rgba(255,51,102,0.15)",
  
  // Effects
  shimmer: "#FFFFFF",
  glow: "#00D9FF",
  highlight: "rgba(0,217,255,0.3)",
  shadow: "rgba(0,0,0,0.5)",
} as const;

export const getPalette = (theme: ThemeMode) => {
  return theme === 'light' ? lightPalette : darkPalette;
};

// Default to light theme for the luxurious design
export const palette = lightPalette;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
} as const;

export const radii = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  pill: 999,
} as const;

export const typography = {
  // Elegant font sizes
  display: 36,
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  body: 16,
  bodySmall: 14,
  caption: 12,
  overline: 10,
  
  // Font weights
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  black: '900' as const,
} as const;

export const shadow = {
  // Subtle card shadows
  card: Platform.select({
    web: {
      shadowColor: "rgba(44,42,46,0.08)",
      shadowOpacity: 1,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 4 },
      elevation: 0,
    },
    default: {
      shadowColor: "rgba(44,42,46,0.08)",
      shadowOpacity: 1,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
  }),
  
  // Elegant elevated shadow
  elevated: Platform.select({
    web: {
      shadowColor: "rgba(44,42,46,0.12)",
      shadowOpacity: 1,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 8 },
      elevation: 0,
    },
    default: {
      shadowColor: "rgba(44,42,46,0.12)",
      shadowOpacity: 1,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 8 },
      elevation: 8,
    },
  }),
  
  // Soft glow for special elements
  glow: Platform.select({
    web: {
      shadowColor: "#D4A574",
      shadowOpacity: 0.2,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 4 },
      elevation: 0,
    },
    default: {
      shadowColor: "#D4A574",
      shadowOpacity: 0.2,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6,
    },
  }),
  
  // Floating elements
  floating: Platform.select({
    web: {
      shadowColor: "rgba(44,42,46,0.16)",
      shadowOpacity: 1,
      shadowRadius: 32,
      shadowOffset: { width: 0, height: 12 },
      elevation: 0,
    },
    default: {
      shadowColor: "rgba(44,42,46,0.16)",
      shadowOpacity: 1,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 12 },
      elevation: 12,
    },
  }),
} as const;

const lightGradient = {
  // Primary brand gradients - Bold and electric
  primary: ["#00D9FF", "#00A3CC"] as const, // Electric cyan
  secondary: ["#7B61FF", "#5A3FCC"] as const, // Tech purple
  tertiary: ["#00FF94", "#00CC77"] as const, // Success green
  
  // Background gradients - Deep and professional
  hero: ["#0F0F11", "#000000"] as const, // Dark gradient
  surface: ["#151518", "#1A1A1D"] as const, // Dark surface
  card: ["#1A1A1D", "#1F1F23"] as const, // Elevated dark
  
  // Performance themed gradients
  gold: ["#FFB800", "#FFA724", "#FF8800"] as const, // Gold achievement
  rose: ["#FF3366", "#FF0040", "#CC0033"] as const, // Energy red
  lavender: ["#7B61FF", "#6B51EE", "#5A3FCC"] as const, // Purple tech
  mint: ["#00FF94", "#00E585", "#00CC77"] as const, // Green success
  
  // Special effects
  shimmer: ["#00D9FF", "#FFFFFF", "#00D9FF"] as const, // Electric shimmer
  glow: ["rgba(0,217,255,0.4)", "rgba(0,217,255,0.2)", "rgba(0,217,255,0.1)"] as const,
  aurora: ["#00D9FF", "#7B61FF", "#00FF94", "#FFB800"] as const, // Multi-color performance
  
  // Context gradients
  success: ["#00FF94", "#00CC77"] as const,
  warning: ["#FFB800", "#FF8800"] as const,
  error: ["#FF3366", "#CC0033"] as const,
  info: ["#00D9FF", "#00A3CC"] as const,
  
  // Premium paywall
  paywall: ["#0A0A0A", "#151518"] as const,
} as const;

const darkGradient = {
  // Primary brand gradients - Bold and electric
  primary: ["#00D9FF", "#00A3CC"] as const, // Electric cyan
  secondary: ["#7B61FF", "#5A3FCC"] as const, // Tech purple
  tertiary: ["#00FF94", "#00CC77"] as const, // Success green
  
  // Background gradients - Deep and professional
  hero: ["#0F0F11", "#000000"] as const, // Dark gradient
  surface: ["#151518", "#1A1A1D"] as const, // Dark surface
  card: ["#1A1A1D", "#1F1F23"] as const, // Elevated dark
  
  // Performance themed gradients
  gold: ["#FFB800", "#FFA724", "#FF8800"] as const, // Gold achievement
  rose: ["#FF3366", "#FF0040", "#CC0033"] as const, // Energy red
  lavender: ["#7B61FF", "#6B51EE", "#5A3FCC"] as const, // Purple tech
  mint: ["#00FF94", "#00E585", "#00CC77"] as const, // Green success
  
  // Special effects
  shimmer: ["#00D9FF", "#FFFFFF", "#00D9FF"] as const, // Electric shimmer
  glow: ["rgba(0,217,255,0.4)", "rgba(0,217,255,0.2)", "rgba(0,217,255,0.1)"] as const,
  aurora: ["#00D9FF", "#7B61FF", "#00FF94", "#FFB800"] as const, // Multi-color performance
  
  // Context gradients
  success: ["#00FF94", "#00CC77"] as const,
  warning: ["#FFB800", "#FF8800"] as const,
  error: ["#FF3366", "#CC0033"] as const,
  info: ["#00D9FF", "#00A3CC"] as const,
  
  // Premium paywall
  paywall: ["#0A0A0A", "#151518"] as const,
} as const;

export const getGradient = (theme: ThemeMode) => {
  return theme === 'light' ? lightGradient : darkGradient;
};

// Default to light theme for the new pastel design
export const gradient = lightGradient;

export const rings = {
  // For premium circular meters and avatars
  primary: {
    start: "#D9B37F",
    end: "#C9AFE9",
  },
  success: {
    start: "#79E6B1",
    end: "#C9AFE9",
  },
} as const;
