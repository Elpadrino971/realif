export const colors = {
  // Primary colors
  primary: '#FF1493',      // Hot pink - vibrant et moderne
  primaryDark: '#C71585',
  primaryLight: '#FF69B4',

  // Secondary colors
  secondary: '#9D4EDD',    // Purple
  accent: '#00D9FF',       // Cyan électrique

  // Backgrounds
  background: '#0A0A0F',   // Noir profond
  surface: '#1A1A24',      // Gris foncé
  surfaceLight: '#2A2A38',

  // Text colors
  text: '#FFFFFF',
  textSecondary: '#B0B0C0',
  textTertiary: '#707080',

  // Status colors
  success: '#00FF87',
  warning: '#FFB800',
  error: '#FF3B5C',
  info: '#00D9FF',

  // Game specific
  energy: '#FFD700',       // Or pour l'énergie
  money: '#00FF87',        // Vert pour l'argent
  popularity: '#FF1493',   // Pink pour popularité

  // Rarity colors (gacha)
  common: '#B0B0C0',
  rare: '#00D9FF',
  epic: '#9D4EDD',
  legendary: '#FFD700',

  // Transparent overlays
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',

  // Glass morphism
  glass: 'rgba(26, 26, 36, 0.8)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
} as const;

export type ColorKey = keyof typeof colors;
