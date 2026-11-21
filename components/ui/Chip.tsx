/**
 * Filter chip. Active chips use the yellow accent fill with dark text; inactive
 * chips are glass. Used by the home filter row and the detail-screen chips.
 */
import { StyleSheet, Text, View } from 'react-native';
import { Glass } from '@/components/glass';
import { PressableScale } from './PressableScale';
import { accents, radii, spacing, fonts } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

export interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export function Chip({ label, active = false, onPress }: ChipProps) {
  const theme = useTheme();

  return (
    <PressableScale
      onPress={onPress}
      accessibilityLabel={`${label} filter`}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      {active ? (
        <View style={[styles.chip, styles.active]}>
          <Text style={[styles.label, { color: accents.darkText }]}>{label}</Text>
        </View>
      ) : (
        <Glass radius={radii.pill} shadow={false} style={styles.chip}>
          <Text style={[styles.label, { color: theme.text.onGlass }]}>{label}</Text>
        </Glass>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: accents.activeChip,
  },
  label: {
    fontFamily: fonts.uiBold,
    fontSize: 14,
  },
});
