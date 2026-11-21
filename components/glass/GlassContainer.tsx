/**
 * Thin wrapper over the native `GlassContainer`. On platforms without the
 * Liquid Glass API it degrades to a plain `View`, so sibling <Glass> surfaces
 * simply render independently (their own blur / fill) instead of merging.
 */
import { type ReactNode } from 'react';
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';
import {
  GlassContainer as NativeGlassContainer,
  isGlassEffectAPIAvailable,
} from 'expo-glass-effect';

const nativeGlassAvailable =
  Platform.OS === 'ios' && isGlassEffectAPIAvailable();

export interface GlassContainerProps {
  children?: ReactNode;
  /** Distance at which child glass elements begin to merge. */
  spacing?: number;
  style?: StyleProp<ViewStyle>;
}

export function GlassContainer({ children, spacing, style }: GlassContainerProps) {
  if (nativeGlassAvailable) {
    return (
      <NativeGlassContainer spacing={spacing} style={style}>
        {children}
      </NativeGlassContainer>
    );
  }
  return <View style={style}>{children}</View>;
}
