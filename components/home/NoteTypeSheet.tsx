/**
 * Bottom-sheet content for picking a new note type. Each row is a glass tile
 * with a colored dot. Selection is reported via `onSelect` (wiring new-note
 * creation is left to the data layer).
 */
import { StyleSheet, Text, View } from 'react-native';
import { PressableScale } from '@/components/ui/PressableScale';
import { Glass } from '@/components/glass';
import { accents, cardColors, fonts, radii, spacing } from '@/theme/tokens';
import { type NoteType } from '@/types/note';

const OPTIONS: { type: NoteType; label: string; color: keyof typeof cardColors }[] = [
  { type: 'text', label: 'Text note', color: 'frostedWhite' },
  { type: 'checklist', label: 'Checklist', color: 'mint' },
  { type: 'audio', label: 'Voice note', color: 'lavender' },
  { type: 'photos', label: 'Photos', color: 'pinkLilac' },
  { type: 'files', label: 'Files', color: 'cream' },
  { type: 'pdf', label: 'PDF', color: 'coral' },
];

export interface NoteTypeSheetProps {
  onSelect: (type: NoteType) => void;
}

export function NoteTypeSheet({ onSelect }: NoteTypeSheetProps) {
  return (
    <View>
      <Text style={styles.heading}>New note</Text>
      <View style={styles.grid}>
        {OPTIONS.map((opt) => (
          <PressableScale
            key={opt.type}
            onPress={() => onSelect(opt.type)}
            accessibilityLabel={`Create ${opt.label}`}
            style={styles.cell}
          >
            <Glass radius={radii.md} shadow={false} style={styles.tile}>
              <View style={[styles.dot, { backgroundColor: cardColors[opt.color] }]} />
              <Text style={styles.tileLabel}>{opt.label}</Text>
            </Glass>
          </PressableScale>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: fonts.uiBold,
    fontSize: 18,
    color: accents.darkText,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  cell: {
    width: '47%',
  },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 56,
    paddingHorizontal: spacing.lg,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  tileLabel: {
    fontFamily: fonts.uiBold,
    fontSize: 14,
    color: accents.darkText,
  },
});
