/**
 * Full-screen background: a vertical linear gradient with 2–3 soft radial
 * light blobs painted on top via SVG. The `variant` switches between the home
 * palette and the note-detail palette (more pink-lilac in the center).
 */
import { type ReactNode } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { gradient } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

export interface GradientBackgroundProps {
  children?: ReactNode;
  variant?: 'home' | 'detail';
}

export function GradientBackground({
  children,
  variant = 'home',
}: GradientBackgroundProps) {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const blobs = variant === 'detail' ? gradient.blobsDetail : gradient.blobs;

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={theme.gradient.colors}
        start={theme.gradient.start}
        end={theme.gradient.end}
        style={StyleSheet.absoluteFill}
      />
      <Svg
        style={StyleSheet.absoluteFill}
        width={width}
        height={height}
        pointerEvents="none"
      >
        <Defs>
          {blobs.map((blob, i) => {
            const color = 'color' in blob && blob.color ? blob.color : '#FFFFFF';
            return (
              <RadialGradient
                key={`blob-grad-${i}`}
                id={`blob-${i}`}
                cx="50%"
                cy="50%"
                r="50%"
              >
                <Stop offset="0%" stopColor={color} stopOpacity={blob.opacity} />
                <Stop offset="100%" stopColor={color} stopOpacity={0} />
              </RadialGradient>
            );
          })}
        </Defs>
        {blobs.map((blob, i) => {
          const r = blob.radius * width;
          return (
            <Rect
              key={`blob-rect-${i}`}
              x={blob.cx * width - r}
              y={blob.cy * height - r}
              width={r * 2}
              height={r * 2}
              fill={`url(#blob-${i})`}
            />
          );
        })}
      </Svg>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
