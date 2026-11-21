/**
 * Circular button. `variant="glass"` renders a glass surface; `variant="solid"`
 * renders a filled circle (e.g. the white "+" button). Always at least the
 * standard 52px, satisfying the 44px minimum touch target.
 */
import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Glass } from '@/components/glass';
import { PressableScale } from './PressableScale';
import { sizes } from '@/theme/tokens';

export interface CircleButtonProps {
  children: ReactNode;
  onPress?: () => void;
  accessibilityLabel: string;
  variant?: 'glass' | 'solid';
  size?: number;
  /** Fill color when variant is "solid". */
  color?: string;
  shadow?: boolean;
}

export function CircleButton({
  children,
  onPress,
  accessibilityLabel,
  variant = 'glass',
  size = sizes.circleButton,
  color = '#FFFFFF',
  shadow = true,
}: CircleButtonProps) {
  const radius = size / 2;

  return (
    <PressableScale
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      style={{ width: size, height: size }}
    >
      {variant === 'glass' ? (
        <Glass radius={radius} shadow={shadow} style={[styles.center, { width: size, height: size }]}>
          {children}
        </Glass>
      ) : (
        <View
          style={[
            styles.center,
            shadow && styles.shadow,
            { width: size, height: size, borderRadius: radius, backgroundColor: color },
          ]}
        >
          {children}
        </View>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  shadow: {
    shadowColor: '#1E2230',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
});
