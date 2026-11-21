/**
 * Note-detail header: glass back (chevron) and "..." buttons flanking a large,
 * centered, glowing collection title, with centered glass filter chips below.
 */
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CircleButton } from '@/components/ui/CircleButton';
import { Chip } from '@/components/ui/Chip';
import { ChevronLeftIcon, DotsHorizontalIcon } from '@/components/ui/icons';
import { spacing, typography } from '@/theme/tokens';
import { useTheme } from '@/theme/useTheme';

const DETAIL_CHIPS = ['Text', 'Images', 'Audios'] as const;
type DetailChip = (typeof DETAIL_CHIPS)[number];

export interface DetailHeaderProps {
  title: string;
  activeChip: DetailChip;
  onChipChange: (chip: DetailChip) => void;
  onBack: () => void;
  onMenuPress?: () => void;
}

export function DetailHeader({
  title,
  activeChip,
  onChipChange,
  onBack,
  onMenuPress,
}: DetailHeaderProps) {
  const theme = useTheme();

  return (
    <View style={styles.root}>
      <View style={styles.topRow}>
        <CircleButton accessibilityLabel="Go back" onPress={onBack}>
          <ChevronLeftIcon size={24} color={theme.text.onGradient} />
        </CircleButton>
        <CircleButton accessibilityLabel="Note options" onPress={onMenuPress}>
          <DotsHorizontalIcon size={22} color={theme.text.onGradient} />
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
        numberOfLines={2}
      >
        {title}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {DETAIL_CHIPS.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            active={activeChip === chip}
            onPress={() => onChipChange(chip)}
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
    textAlign: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  chips: {
    gap: spacing.sm,
    alignSelf: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xl,
  },
});
