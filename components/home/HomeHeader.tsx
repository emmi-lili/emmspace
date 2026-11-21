/**
 * Home header: the burst logo on the left, a glass 4-dot menu button on the
 * right, the big glowing "Your Notes" display title, and the horizontally
 * scrolling filter chips.
 */
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CircleButton } from '@/components/ui/CircleButton';
import { Chip } from '@/components/ui/Chip';
import { Logo } from '@/components/ui/Logo';
import { DotsIcon } from '@/components/ui/icons';
import { FILTERS } from '@/lib/filterNotes';
import { spacing, typography } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';
import { type NoteFilter } from '@/types/note';

export interface HomeHeaderProps {
  activeFilter: NoteFilter;
  onFilterChange: (filter: NoteFilter) => void;
  onMenuPress?: () => void;
}

export function HomeHeader({
  activeFilter,
  onFilterChange,
  onMenuPress,
}: HomeHeaderProps) {
  const theme = useTheme();

  return (
    <View style={styles.root}>
      <View style={styles.topRow}>
        <Logo size={34} color={theme.text.onGradient} />
        <CircleButton accessibilityLabel="Options menu" onPress={onMenuPress}>
          <DotsIcon size={22} color={theme.text.onGradient} />
        </CircleButton>
      </View>

      <Text
        style={[
          typography.display,
          typography.glow,
          styles.title,
          { color: theme.text.onGradient },
        ]}
        accessibilityRole="header"
      >
        Your Notes
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {FILTERS.map((f) => (
          <Chip
            key={f.key}
            label={f.label}
            active={activeFilter === f.key}
            onPress={() => onFilterChange(f.key)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: spacing.xl,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  chips: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    paddingRight: spacing.xl,
  },
});
