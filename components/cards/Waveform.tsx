/**
 * A soft white waveform rendered from normalized amplitudes. While `playing`
 * is true the bars gently pulse in a staggered loop (UI-thread only).
 */
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface WaveBarProps {
  amplitude: number; // 0..1
  index: number;
  playing: boolean;
  maxHeight: number;
  color: string;
}

function WaveBar({ amplitude, index, playing, maxHeight, color }: WaveBarProps) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (playing) {
      pulse.value = withDelay(
        (index % 6) * 60,
        withRepeat(withTiming(1, { duration: 520 }), -1, true),
      );
    } else {
      cancelAnimation(pulse);
      pulse.value = withTiming(0, { duration: 180 });
    }
    return () => cancelAnimation(pulse);
  }, [playing, index, pulse]);

  const base = Math.max(3, amplitude * maxHeight);

  const style = useAnimatedStyle(() => {
    const extra = pulse.value * maxHeight * 0.3;
    const height = Math.min(maxHeight, base + extra);
    return { height, opacity: 0.6 + pulse.value * 0.4 };
  });

  return <Animated.View style={[styles.bar, { backgroundColor: color }, style]} />;
}

export interface WaveformProps {
  amplitudes: number[];
  playing: boolean;
  height?: number;
  color?: string;
}

export function Waveform({
  amplitudes,
  playing,
  height = 44,
  color = 'rgba(255,255,255,0.85)',
}: WaveformProps) {
  return (
    <View style={[styles.row, { height }]}>
      {amplitudes.map((a, i) => (
        <WaveBar
          key={i}
          amplitude={a}
          index={i}
          playing={playing}
          maxHeight={height}
          color={color}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    flex: 1,
  },
  bar: {
    flex: 1,
    borderRadius: 999,
  },
});
