/**
 * Design tokens for the Notes app.
 *
 * Single source of truth for colors, gradients, glass surfaces, spacing,
 * radii and typography. A dark theme is scaffolded alongside light so the
 * app can switch later without touching component code.
 */

export type ColorScheme = 'light' | 'dark';

/** 4pt spacing scale. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
} as const;

/** Border radii. Buttons/chips are fully rounded via `pill`. */
export const radii = {
  sm: 12,
  md: 18,
  card: 28,
  pill: 999,
} as const;

/** Standard circular button size and the minimum accessible touch target. */
export const sizes = {
  circleButton: 52,
  minTouchTarget: 44,
} as const;

/** Pastel card fill colors from the design. */
export const cardColors = {
  mint: '#BFE3CF',
  frostedWhite: '#F4F6FB',
  lavender: '#B9B6F2',
  cream: '#EDE8C8',
  pinkLilac: '#E7C6EC',
  coral: '#F2A99A',
} as const;

export type CardColorName = keyof typeof cardColors;

/** Accent colors. */
export const accents = {
  blue: '#3D6FB5',
  activeChip: '#F7F59A',
  darkText: '#1E2230',
  oliveGold: '#8A7B2E',
  softMagenta: '#C25CC9',
  checklistGreen: '#2F6B4F',
} as const;

/** Vertical background gradient stops + soft radial light blobs. */
export const gradient = {
  light: {
    colors: ['#A9BCE8', '#C9C3EE', '#E3C8F0'] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  dark: {
    colors: ['#1A1E33', '#242347', '#2E2240'] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  /**
   * Radial light blobs painted over the gradient. `cx`/`cy` are 0..1
   * fractions of the screen; `radius` is a fraction of the screen width.
   */
  blobs: [
    { cx: 0.2, cy: 0.12, radius: 0.55, opacity: 0.35 },
    { cx: 0.85, cy: 0.3, radius: 0.5, opacity: 0.22 },
    { cx: 0.5, cy: 0.75, radius: 0.6, opacity: 0.15 },
  ],
  /** The note-detail screen pushes more pink-lilac into the center. */
  blobsDetail: [
    { cx: 0.2, cy: 0.1, radius: 0.5, opacity: 0.3 },
    { cx: 0.5, cy: 0.45, radius: 0.7, opacity: 0.35, color: '#E7C6EC' },
    { cx: 0.85, cy: 0.8, radius: 0.5, opacity: 0.2 },
  ],
} as const;

/**
 * Glass surface recipe. Values feed both the native glass effect (tint) and
 * the blur fallback (fill + border + shadow).
 */
export const glass = {
  light: {
    fill: 'rgba(255,255,255,0.35)',
    /** Opaque fallback used when "reduce transparency" is enabled. */
    solidFallback: 'rgba(255,255,255,0.85)',
    border: 'rgba(255,255,255,0.5)',
    tint: 'rgba(255,255,255,0.18)',
    blurTint: 'light' as const,
    blurIntensity: 50,
  },
  dark: {
    fill: 'rgba(40,44,64,0.4)',
    solidFallback: 'rgba(30,34,48,0.9)',
    border: 'rgba(255,255,255,0.14)',
    tint: 'rgba(255,255,255,0.06)',
    blurTint: 'dark' as const,
    blurIntensity: 50,
  },
  shadow: {
    shadowColor: '#1E2230',
    shadowOpacity: 0.08,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
} as const;

/** Dark translucent capsule that holds the floating action buttons. */
export const capsule = {
  light: 'rgba(30,34,48,0.55)',
  dark: 'rgba(10,12,20,0.6)',
} as const;

/**
 * Font families. Keys map to the names registered via `useFonts` in the root
 * layout, so they must stay in sync with `theme/fonts.ts`.
 */
export const fonts = {
  display: 'Quicksand_700Bold',
  uiRegular: 'Quicksand_500Medium',
  uiBold: 'Quicksand_700Bold',
  pixel: 'DotGothic16_400Regular',
  serif: 'Fraunces_600SemiBold',
} as const;

/** Type scale. `glow` carries the display text-shadow used on the big titles. */
export const typography = {
  display: {
    fontFamily: fonts.display,
    fontSize: 44,
    lineHeight: 48,
  },
  cardTitle: {
    fontFamily: fonts.uiBold,
    fontSize: 26,
    lineHeight: 30,
  },
  body: {
    fontFamily: fonts.uiRegular,
    fontSize: 15,
    lineHeight: 22,
  },
  caption: {
    fontFamily: fonts.uiRegular,
    fontSize: 11,
    lineHeight: 14,
  },
  glow: {
    textShadowColor: 'rgba(255,255,255,0.75)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
} as const;

/** Semantic text colors per scheme. */
export const text = {
  light: {
    onGradient: '#FFFFFF',
    primary: accents.darkText,
    secondary: 'rgba(30,34,48,0.55)',
    onGlass: accents.darkText,
  },
  dark: {
    onGradient: '#FFFFFF',
    primary: '#F4F6FB',
    secondary: 'rgba(244,246,251,0.6)',
    onGlass: '#F4F6FB',
  },
} as const;

/** Shared press-feedback scale for every tappable surface. */
export const motion = {
  pressScale: 0.96,
  spring: { damping: 18, stiffness: 180, mass: 0.9 },
} as const;

export const tokens = {
  spacing,
  radii,
  sizes,
  cardColors,
  accents,
  gradient,
  glass,
  capsule,
  fonts,
  typography,
  text,
  motion,
} as const;

export type Tokens = typeof tokens;
