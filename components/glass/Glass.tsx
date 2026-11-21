/**
 * <Glass> — a single surface that adapts to the platform:
 *
 *  1. iOS 26+ with the Liquid Glass API available -> native `GlassView`.
 *  2. Otherwise (Android / older iOS) -> `expo-blur` `BlurView` with a
 *     translucent white fill, 1px border and soft shadow.
 *  3. If the user enabled "Reduce Transparency" -> an opaque 85% white fill
 *     (no blur), per accessibility guidance.
 *
 * Consumers never branch on the platform themselves; they just render <Glass>.
 */
import { type ReactNode } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import {
  GlassView,
  isGlassEffectAPIAvailable,
  type GlassStyle,
} from 'expo-glass-effect';
import { useReduceTransparency } from '@/hooks/useReduceTransparency';
import { useTheme } from '@/theme/useTheme';

export interface GlassProps {
  children?: ReactNode;
  /** Corner radius applied to all layers. */
  radius?: number;
  style?: StyleProp<ViewStyle>;
  /** Native glass style; ignored on the blur fallback. */
  glassEffectStyle?: GlassStyle;
  /** Native-only interactive highlight on press. */
  interactive?: boolean;
  /** Attach the soft drop shadow from the tokens. Default true. */
  shadow?: boolean;
  /** Blur strength for the fallback (expo-blur intensity). Default 50. */
  blurIntensity?: number;
}

const nativeGlassAvailable =
  Platform.OS === 'ios' && isGlassEffectAPIAvailable();

export function Glass({
  children,
  radius = 24,
  style,
  glassEffectStyle = 'regular',
  interactive = false,
  shadow = true,
  blurIntensity,
}: GlassProps) {
  const theme = useTheme();
  const reduceTransparency = useReduceTransparency();

  const shadowStyle = shadow ? theme.glassShadow : null;
  const radiusStyle = { borderRadius: radius } as const;

  // 3. Reduce Transparency -> opaque fill, no blur.
  if (reduceTransparency) {
    return (
      <View
        style={[
          radiusStyle,
          styles.border,
          { borderColor: theme.glass.border, backgroundColor: theme.glass.solidFallback },
          shadowStyle,
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  // 1. Native Liquid Glass (iOS 26+).
  if (nativeGlassAvailable) {
    return (
      <View style={[radiusStyle, shadowStyle, style]}>
        <GlassView
          glassEffectStyle={glassEffectStyle}
          isInteractive={interactive}
          tintColor={theme.glass.tint}
          colorScheme={theme.scheme}
          style={[StyleSheet.absoluteFill, radiusStyle]}
        />
        {children}
      </View>
    );
  }

  // 2. expo-blur fallback.
  return (
    <View style={[radiusStyle, styles.clip, shadowStyle, style]}>
      <BlurView
        intensity={blurIntensity ?? theme.glass.blurIntensity}
        tint={theme.glass.blurTint}
        style={[StyleSheet.absoluteFill, radiusStyle]}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          radiusStyle,
          styles.border,
          { backgroundColor: theme.glass.fill, borderColor: theme.glass.border },
        ]}
        pointerEvents="none"
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  clip: { overflow: 'hidden' },
  border: { borderWidth: 1 },
});
