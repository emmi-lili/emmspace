/**
 * Resolves the design tokens for the active color scheme.
 *
 * The app ships in light mode; dark values exist in the tokens so this hook
 * (and everything downstream) is already dark-ready. Flip `FORCE_SCHEME` or
 * wire it to `useColorScheme()` to enable system dark mode.
 */
import { useMemo } from 'react';
import {
  capsule,
  gradient,
  glass,
  text,
  tokens,
  type ColorScheme,
} from './tokens';

const FORCE_SCHEME: ColorScheme = 'light';

export interface Theme {
  scheme: ColorScheme;
  gradient: {
    colors: readonly [string, string, string];
    start: { x: number; y: number };
    end: { x: number; y: number };
  };
  glass: {
    fill: string;
    solidFallback: string;
    border: string;
    tint: string;
    blurTint: 'light' | 'dark';
    blurIntensity: number;
  };
  glassShadow: (typeof glass)['shadow'];
  text: {
    onGradient: string;
    primary: string;
    secondary: string;
    onGlass: string;
  };
  capsule: string;
  tokens: typeof tokens;
}

export function useTheme(): Theme {
  const scheme = FORCE_SCHEME;
  return useMemo(
    () => ({
      scheme,
      gradient: gradient[scheme],
      glass: glass[scheme],
      glassShadow: glass.shadow,
      text: text[scheme],
      capsule: capsule[scheme],
      tokens,
    }),
    [scheme],
  );
}
