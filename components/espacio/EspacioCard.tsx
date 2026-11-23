/**
 * Shared bento-card frame: a 24px rounded surface with a semi-transparent
 * white border. The fill is either a linear gradient, a solid pastel, or a
 * glass surface. When `onPress` is set the whole card becomes a scale-press
 * button/link; otherwise it renders as a plain container.
 */
import { type ReactNode } from 'react';
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Glass } from '@/components/glass';
import { PressableScale } from '@/components/ui/PressableScale';
import { espacio, radii } from '@/theme/tokens';

export interface EspacioCardProps {
  children: ReactNode;
  /** Linear gradient stops (top-left → bottom-right). */
  gradient?: readonly string[];
  /** Solid fill color. Ignored when `gradient` or `glass` is set. */
  color?: string;
  /** Render a translucent glass surface. */
  glass?: boolean;
  radius?: number;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityRole?: 'button' | 'link' | 'none';
}

export function EspacioCard({
  children,
  gradient,
  color,
  glass = false,
  radius = 24,
  padded = true,
  style,
  onPress,
  accessibilityLabel,
  accessibilityRole = 'button',
}: EspacioCardProps) {
  const frame = [
    styles.frame,
    { borderRadius: radius },
    padded && styles.padded,
    style,
  ];

  const inner = glass ? (
    <Glass radius={radius} style={frame}>
      {children}
    </Glass>
  ) : gradient ? (
    <LinearGradient
      colors={gradient as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={frame}
    >
      {children}
    </LinearGradient>
  ) : (
    <View style={[frame, { backgroundColor: color ?? espacio.cardFill }]}>
      {children}
    </View>
  );

  // The white hairline border sits on top so it reads over any fill.
  const bordered = (
    <View style={[styles.clip, { borderRadius: radius }]}>
      {inner}
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          styles.border,
          { borderRadius: radius },
        ]}
      />
    </View>
  );

  if (!onPress) return bordered;

  return (
    <PressableScale
      onPress={onPress}
      accessibilityLabel={accessibilityLabel ?? ''}
      accessibilityRole={accessibilityRole}
      style={{ borderRadius: radius }}
    >
      {bordered}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  clip: { overflow: 'hidden' },
  frame: { flex: 1, overflow: 'hidden' },
  padded: { padding: 16 },
  border: {
    borderWidth: 1,
    borderColor: espacio.cardBorder,
  },
});
