/**
 * Lightweight animated bottom sheet built on React Native's Modal plus
 * Reanimated (no extra dependency). Slides up with a spring, dims the backdrop,
 * and closes on backdrop tap or Android back. The sheet surface is glass.
 */
import { type ReactNode, useEffect } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Glass } from '@/components/glass';
import { radii, spacing } from '@/theme/tokens';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(400);
  const backdrop = useSharedValue(0);
  const mounted = useSharedValue(false);

  useEffect(() => {
    if (visible) {
      mounted.value = true;
      backdrop.value = withTiming(1, { duration: 220 });
      translateY.value = withSpring(0, { damping: 20, stiffness: 180 });
    } else {
      backdrop.value = withTiming(0, { duration: 180 });
      translateY.value = withTiming(400, { duration: 220 }, (finished) => {
        if (finished) mounted.value = false;
      });
    }
  }, [visible, backdrop, translateY, mounted]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdrop.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.root}>
        <AnimatedPressable
          style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]}
          onPress={onClose}
          accessibilityLabel="Dismiss"
          accessibilityRole="button"
        />
        <Animated.View style={[styles.sheetWrap, { paddingBottom: insets.bottom + spacing.lg }, sheetStyle]}>
          <Glass radius={radii.card} style={styles.sheet}>
            <View style={styles.handle} />
            {children}
          </Glass>
        </Animated.View>
      </View>
    </Modal>
  );
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { backgroundColor: 'rgba(20,22,34,0.45)' },
  sheetWrap: {
    paddingHorizontal: spacing.md,
  },
  sheet: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(30,34,48,0.25)',
    marginBottom: spacing.lg,
  },
});
