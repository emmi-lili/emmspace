/**
 * A swipeable stack of collection notes. Two pastel panels peek out behind the
 * white front card (scaled 0.94 / 0.88 and nudged up). Dragging the front card
 * horizontally past a threshold flings it off with a slight rotation, then the
 * next note springs up into place. All animation is on the UI thread.
 */
import { useCallback } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { ReflectionCard } from './ReflectionCard';
import { cardColors, radii } from '@/theme/tokens';
import { useUIStore } from '@/hooks/useUIStore';
import { type Note } from '@/types/note';

export interface SwipeableCardStackProps {
  notes: Note[];
  cardHeight: number;
}

const SWIPE_THRESHOLD = 110;

export function SwipeableCardStack({ notes, cardHeight }: SwipeableCardStackProps) {
  const { width } = useWindowDimensions();
  const index = useUIStore((s) => s.detailIndex);
  const setIndex = useUIStore((s) => s.setDetailIndex);

  const translateX = useSharedValue(0);
  const enter = useSharedValue(1);

  const advance = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setIndex((index + 1) % notes.length);
    translateX.value = 0;
    enter.value = 0;
    enter.value = withSpring(1, { damping: 18, stiffness: 160 });
  }, [index, notes.length, setIndex, translateX, enter]);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      if (Math.abs(e.translationX) > SWIPE_THRESHOLD || Math.abs(e.velocityX) > 800) {
        const dir = e.translationX > 0 ? 1 : -1;
        translateX.value = withTiming(dir * width * 1.3, { duration: 260 }, (done) => {
          if (done) runOnJS(advance)();
        });
      } else {
        translateX.value = withSpring(0, { damping: 18, stiffness: 180 });
      }
    });

  const frontStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [-width, 0, width], [-10, 0, 10]);
    // When a new card enters, it springs up from slightly down/scaled.
    const enterTranslate = (1 - enter.value) * 26;
    const enterScale = 0.94 + enter.value * 0.06;
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: enterTranslate },
        { rotateZ: `${rotate}deg` },
        { scale: enterScale },
      ],
    };
  });

  // Behind panels react to drag progress, rising slightly as the top leaves.
  const panel1Style = useAnimatedStyle(() => {
    const p = Math.min(1, Math.abs(translateX.value) / width);
    return {
      transform: [
        { scale: interpolate(p, [0, 1], [0.94, 0.97]) },
        { translateY: interpolate(p, [0, 1], [-18, -10]) },
      ],
    };
  });

  const panel2Style = useAnimatedStyle(() => {
    const p = Math.min(1, Math.abs(translateX.value) / width);
    return {
      transform: [
        { scale: interpolate(p, [0, 1], [0.88, 0.92]) },
        { translateY: interpolate(p, [0, 1], [-36, -26]) },
      ],
    };
  });

  const current = notes[index % notes.length];
  if (!current) return null;

  return (
    <View style={[styles.stack, { height: cardHeight + 44 }]}>
      <Animated.View
        style={[styles.panel, { height: cardHeight, backgroundColor: cardColors.lavender }, panel2Style]}
      />
      <Animated.View
        style={[styles.panel, { height: cardHeight, backgroundColor: cardColors.cream }, panel1Style]}
      />
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.front, frontStyle]}>
          <ReflectionCard note={current} height={cardHeight} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  panel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderRadius: radii.card,
    shadowColor: '#1E2230',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  front: {
    width: '100%',
  },
});
