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

export const fontMap = {
  Quicksand_500Medium,
  Quicksand_700Bold,
  DotGothic16_400Regular,
  Fraunces_600SemiBold,
} as const;
