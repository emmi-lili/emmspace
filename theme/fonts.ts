/**
 * Centralized font map passed to `useFonts`. The keys here must match the
 * family names referenced in `theme/tokens.ts`.
 */
import {
  Quicksand_500Medium,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { DotGothic16_400Regular } from '@expo-google-fonts/dotgothic16';
import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces';
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from '@expo-google-fonts/outfit';
import {
  Doto_400Regular,
  Doto_600SemiBold,
  Doto_700Bold,
} from '@expo-google-fonts/doto';
import {
  InstrumentSerif_400Regular,
  InstrumentSerif_400Regular_Italic,
} from '@expo-google-fonts/instrument-serif';

export const fontMap = {
  Quicksand_500Medium,
  Quicksand_700Bold,
  DotGothic16_400Regular,
  Fraunces_600SemiBold,
  // Mi Espacio type system: Outfit for UI, Doto for the dot-matrix to-do card,
  // Instrument Serif for the big decorative words ("Ideas", "Reels").
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Doto_400Regular,
  Doto_600SemiBold,
  Doto_700Bold,
  InstrumentSerif_400Regular,
  InstrumentSerif_400Regular_Italic,
} as const;
