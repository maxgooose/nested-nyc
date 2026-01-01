/**
 * NESTED App Design System
 * Updated with purple accent color scheme
 * 
 * This file contains all design tokens for consistent styling
 */

export const colors = {
  // Primary Colors (Purple accent - professional, credible tone)
  primary: '#5B4AE6',        // Main purple - buttons, titles, accents
  primaryDark: '#4A3CD4',    // Darker shade for hover states
  primaryLight: '#EEEAFE',   // Light purple for backgrounds
  
  // Neutral Colors
  bg: '#FFFFFF',
  surface: '#FFFFFF',
  surface2: '#F6F7FB',
  surface3: '#EEF0F6',
  
  // Text Colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  
  // Border
  border: '#E5E7EB',
  
  // Legacy (keeping for compatibility)
  dark: '#111827',
  white: '#FFFFFF',
  
  // Gray Scale
  gray100: '#F6F7FB',
  gray200: '#E5E7EB',
  gray300: '#9CA3AF',
  gray400: '#6B7280',
  
  // Pagination
  dotActive: '#5B4AE6',
  dotInactive: '#E5E7EB',
}

export const typography = {
  // Font Family
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  
  // Font Sizes
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '34px',
  },
  
  // Font Weights
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line Heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
  
  // Letter Spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.1em',
    wider: '0.15em',
  }
}

export const spacing = {
  // Base spacing unit: 4px
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
}

export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '15px',
  xl: '20px',
  full: '9999px',  // For pills/buttons
}

export const shadows = {
  // Card shadows - neutral only, no colored shadows
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 12px rgba(0, 0, 0, 0.08)',
  card: '0 4px 12px rgba(0, 0, 0, 0.08)',
  cardHover: '0 8px 20px rgba(0, 0, 0, 0.1)',
  
  // Button shadow - neutral only
  button: '0 4px 12px rgba(0, 0, 0, 0.1)',
}

// Screen dimensions (iPhone frame)
export const screen = {
  width: 375,
  height: 812,
  paddingX: 40,  // Horizontal padding
}

// Component-specific styles
export const components = {
  // Primary Button
  buttonPrimary: {
    height: '56px',
    borderRadius: '15px',
    fontSize: '16px',
    fontWeight: 700,
  },
  
  // Secondary/Outline Button
  buttonSecondary: {
    height: '56px',
    borderRadius: '15px',
    borderWidth: '1px',
    fontSize: '16px',
    fontWeight: 600,
  },
  
  // Social Button
  buttonSocial: {
    size: '64px',
    borderRadius: '12px',
    borderWidth: '1px',
  },
  
  // Input Field
  input: {
    height: '58px',
    borderRadius: '15px',
    borderWidth: '1px',
    fontSize: '14px',
  },
  
  // Pagination Dots
  dot: {
    size: '8px',
    gap: '8px',
  },
  
  // Home Indicator
  homeIndicator: {
    width: '134px',
    height: '5px',
    borderRadius: '100px',
  },
  
  // Card Stack (Onboarding)
  cardStack: {
    cardWidth: '240px',
    cardHeight: '340px',
    borderRadius: '20px',
  },
}

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  screen,
  components,
}
