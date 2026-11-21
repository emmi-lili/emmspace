/**
 * Wraps a child in a staggered fade + translateY entrance. `index` offsets the
 * delay so grid items cascade in. Runs on the UI thread via Reanimated.
 */
import { type ReactNode, useEffect } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export interface AnimatedEntranceProps {
  children: ReactNode;
  index?: number;
  style?: StyleProp<ViewStyle>;
  /** Per-item stagger in ms. */
  stagger?: number;
}

export function AnimatedEntrance({
  children,
  index = 0,
  style,
  stagger = 55,
}: AnimatedEntranceProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      index * stagger,
      withTiming(1, { duration: 420, easing: Easing.out(Easing.cubic) }),
    );
  }, [index, stagger, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 18 }],
  }));

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
}
