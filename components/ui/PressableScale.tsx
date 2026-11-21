/**
 * A pressable that scales to 0.96 on press-in with a spring, and fires a light
 * haptic. This is the shared press feedback used by every tappable surface
 * (cards, chips, buttons) so the whole UI feels consistent.
 *
 * Animation runs entirely on the UI thread via Reanimated.
 */
import { type ReactNode, useCallback } from 'react';
import {
  Pressable,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { motion } from '@/theme/tokens';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface PressableScaleProps {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  /** Fire a light haptic on press-in. Default true. */
  haptics?: boolean;
  /** Target scale while pressed. Defaults to the shared 0.96. */
  pressScale?: number;
  accessibilityLabel: string;
  accessibilityRole?: 'button' | 'link' | 'none';
  accessibilityState?: { selected?: boolean; disabled?: boolean };
  hitSlop?: number;
}

export function PressableScale({
  children,
  onPress,
  onLongPress,
  style,
  disabled = false,
  haptics = true,
  pressScale = motion.pressScale,
  accessibilityLabel,
  accessibilityRole = 'button',
  accessibilityState,
  hitSlop,
}: PressableScaleProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(pressScale, motion.spring);
    if (haptics && !disabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  }, [scale, pressScale, haptics, disabled]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, motion.spring);
  }, [scale]);

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled, ...accessibilityState }}
      hitSlop={hitSlop}
      style={[animatedStyle, style]}
    >
      {children}
    </AnimatedPressable>
  );
}
