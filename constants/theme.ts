import { Platform } from "react-native";

export type ThemeMode = 'light' | 'dark';

// Masculine, performance-focused color palette inspired by tech and fitness brands
const lightPalette = {
  // Clean, modern backgrounds
  background: "#FFFFFF", // Pure white
  backgroundStart: "#FAFAFA", // Clean gray
  backgroundEnd: "#F5F5F5", // Light gray
  surface: "#FFFFFF", // Pure white
  surfaceAlt: "#F8F9FA", // Subtle gray
  surfaceElevated: "#FFFFFF", // White elevated

  // Bold, energetic accent colors
  primary: "#FF6B35", // Energetic orange
  secondary: "#2563EB", // Strong blue
  tertiary: "#10B981", // Achievement green
  
  // Performance-focused colors
  blush: "#FF6B35", // Energy orange
  lavender: "#6366F1", // Tech purple
  mint: "#10B981", // Success green
  peach: "#F59E0B", // Warning amber
  rose: "#EF4444", // Alert red
  cream: "#F3F4F6", // Neutral gray
  pearl: "#FFFFFF", // Clean white
  
  // Bold metallics
  gold: "#F59E0B", // Achievement gold
  roseGold: "#FF6B35", // Energy orange
  champagne: "#D97706", // Bronze
  bronze: "#92400E", // Deep bronze
  
  // Text hierarchy - high contrast
  text: "#111827", // Near black
  textPrimary: "#111827", // Near black
  textSecondary: "#6B7280", // Cool gray
  textMuted: "#9CA3AF", // Light gray
  textAccent: "#FF6B35", // Orange accent
  textLight: "#FFFFFF", // White
  
  // System colors - bold approach
  success: "#10B981", // Success green
  warning: "#F59E0B", // Warning amber
  error: "#EF4444", // Error red
  info: "#2563EB", // Info blue
  danger: "#DC2626", // Danger red
  disabled: "#E5E7EB", // Disabled gray
  
  // Dividers and borders - subtle
  divider: "#E5E7EB", // Light gray
  border: "#D1D5DB", // Gray border
  borderLight: "#F3F4F6", // Very light border
  
  // Overlays and effects
  overlayDark: "rgba(17,24,39,0.15)",
  overlayLight: "rgba(255,255,255,0.95)",
  overlayBlush: "rgba(255,107,53,0.15)",
  overlayGold: "rgba(245,158,11,0.15)",
  overlayLavender: "rgba(99,102,241,0.15)",
  overlaySuccess: "rgba(16,185,129,0.15)",
  overlayError: "rgba(239,68,68,0.15)",
  
  // Effects
  shimmer: "#FFFFFF",
  glow: "#FF6B35",
  highlight: "rgba(255,107,53,0.3)",
  shadow: "rgba(17,24,39,0.08)",
} as const;

const darkPalette = {
  // Deep, tech-inspired dark backgrounds
  background: "#0F172A", // Deep slate
  backgroundStart: "#0F172A", // Deep slate
  backgroundEnd: "#020617", // Near black
  surface: "#1E293B", // Dark slate
  surfaceAlt: "#334155", // Medium slate
  surfaceElevated: "#475569", // Elevated slate

  // Bold accent colors for dark mode
  primary: "#FF6B35", // Energetic orange
  secondary: "#3B82F6", // Bright blue
  tertiary: "#10B981", // Achievement green
  
  // Performance colors (dark adjusted)
  blush: "#FF6B35", // Energy orange
  lavender: "#818CF8", // Bright purple
  mint: "#34D399", // Bright green
  peach: "#FBBF24", // Bright amber
  rose: "#F87171", // Bright red
  cream: "#374151", // Dark gray
  pearl: "#F9FAFB", // Off white
  
  // Bold metallics for dark
  gold: "#FBBF24", // Bright gold
  roseGold: "#FF6B35", // Energy orange
  champagne: "#F59E0B", // Amber
  bronze: "#D97706", // Deep amber
  
  // Text hierarchy - optimized for dark
  text: "#F9FAFB", // Off white
  textPrimary: "#F9FAFB", // Off white
  textSecondary: "#D1D5DB", // Light gray
  textMuted: "#9CA3AF", // Medium gray
  textAccent: "#FF6B35", // Orange accent
  textLight: "#FFFFFF", // Pure white
  
  // System colors for dark mode
  success: "#10B981", // Success green
  warning: "#F59E0B", // Warning amber
  error: "#EF4444", // Error red
  info: "#3B82F6", // Info blue
  danger: "#DC2626", // Danger red
  
  // Dividers and borders
  divider: "#334155", // Slate divider
  border: "#475569", // Slate border
  borderLight: "#64748B", // Light slate
  
  // Overlays and effects
  overlayDark: "rgba(0,0,0,0.5)",
  overlayLight: "rgba(255,255,255,0.1)",
  overlayBlush: "rgba(255,107,53,0.2)",
  overlayGold: "rgba(251,191,36,0.2)",
  overlayLavender: "rgba(129,140,248,0.2)",
  overlaySuccess: "rgba(16,185,129,0.2)",
  overlayError: "rgba(239,68,68,0.2)",
  
  // Effects
  shimmer: "#F9FAFB",
  glow: "#FF6B35",
  highlight: "rgba(255,107,53,0.3)",
  shadow: "rgba(0,0,0,0.3)",
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
  // Primary brand gradients
  primary: ["#FF6B35", "#F97316"] as const, // Orange energy
  secondary: ["#2563EB", "#1D4ED8"] as const, // Deep blue
  tertiary: ["#10B981", "#059669"] as const, // Success green
  
  // Background gradients
  hero: ["#FFFFFF", "#F9FAFB"] as const, // Clean white
  surface: ["#FFFFFF", "#F9FAFB"] as const, // White gradient
  card: ["#FFFFFF", "#FAFAFA"] as const, // Subtle gradient
  
  // Performance themed gradients
  gold: ["#FBBF24", "#F59E0B", "#D97706"] as const, // Gold achievement
  rose: ["#FF6B35", "#F97316", "#EA580C"] as const, // Orange energy
  lavender: ["#6366F1", "#4F46E5", "#4338CA"] as const, // Purple tech
  mint: ["#10B981", "#059669", "#047857"] as const, // Green success
  
  // Special effects
  shimmer: ["#FFFFFF", "#FF6B35", "#FFFFFF"] as const, // Energy shimmer
  glow: ["rgba(255,107,53,0.4)", "rgba(255,107,53,0.2)", "rgba(255,107,53,0.1)"] as const,
  aurora: ["#FF6B35", "#2563EB", "#10B981", "#F59E0B"] as const, // Multi-color performance
  
  // Context gradients
  success: ["#10B981", "#059669"] as const,
  warning: ["#F59E0B", "#D97706"] as const,
  error: ["#EF4444", "#DC2626"] as const,
  info: ["#2563EB", "#1D4ED8"] as const,
  
  // Premium paywall
  paywall: ["#0F172A", "#1E293B"] as const,
} as const;

const darkGradient = {
  // Primary brand gradients
  primary: ["#FF6B35", "#F97316"] as const, // Orange energy
  secondary: ["#3B82F6", "#2563EB"] as const, // Bright blue
  tertiary: ["#10B981", "#059669"] as const, // Achievement green
  
  // Background gradients
  hero: ["#0F172A", "#020617"] as const, // Deep slate to black
  surface: ["#1E293B", "#334155"] as const, // Slate gradient
  card: ["#1E293B", "#475569"] as const, // Elevated slate
  
  // Performance themed gradients
  gold: ["#FBBF24", "#F59E0B", "#D97706"] as const, // Bright gold
  rose: ["#FF6B35", "#F97316", "#EA580C"] as const, // Orange energy
  lavender: ["#818CF8", "#6366F1", "#4F46E5"] as const, // Bright purple
  mint: ["#34D399", "#10B981", "#059669"] as const, // Bright green
  
  // Special effects
  shimmer: ["#F9FAFB", "#FF6B35", "#F9FAFB"] as const, // Energy shimmer
  glow: ["rgba(255,107,53,0.3)", "rgba(255,107,53,0.15)", "rgba(255,107,53,0.05)"] as const,
  aurora: ["#FF6B35", "#3B82F6", "#10B981", "#FBBF24"] as const, // Vibrant multi-color
  
  // Context gradients
  success: ["#10B981", "#059669"] as const,
  warning: ["#F59E0B", "#D97706"] as const,
  error: ["#EF4444", "#DC2626"] as const,
  info: ["#3B82F6", "#2563EB"] as const,
  
  // Premium paywall
  paywall: ["#0F172A", "#1E293B"] as const,
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
