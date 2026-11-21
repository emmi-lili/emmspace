/**
 * Shared pastel container for every note card: rounded 28px fill in the card's
 * color, soft shadow, and the standard press-scale + light haptic. Individual
 * cards render their content inside.
 */
import { type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { PressableScale } from '@/components/ui/PressableScale';
import { cardColors, radii, spacing, type CardColorName } from '@/theme/tokens';

export interface CardShellProps {
  color: CardColorName;
  children: ReactNode;
  onPress?: () => void;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
  /** Disable inner padding (e.g. full-bleed photo card). */
  flush?: boolean;
}

export function CardShell({
  color,
  children,
  onPress,
  accessibilityLabel,
  style,
  flush = false,
}: CardShellProps) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={accessibilityLabel}>
      <View
        style={[
          styles.card,
          { backgroundColor: cardColors[color] },
          !flush && styles.padded,
          style,
        ]}
      >
        {children}
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.card,
    overflow: 'hidden',
    shadowColor: '#1E2230',
    shadowOpacity: 0.08,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  padded: {
    padding: spacing.lg,
  },
});
