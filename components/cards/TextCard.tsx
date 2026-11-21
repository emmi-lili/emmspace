/**
 * TextCard — frosted-white note with a big blue Quicksand title and a small
 * date in the bottom-right. Used for "Thought of the day".
 */
import { StyleSheet, Text, View } from 'react-native';
import { CardShell } from './CardShell';
import { accents, fonts, spacing } from '@/theme/tokens';
import { formatShortDate } from '@/lib/format';
import { type TextNote } from '@/types/note';

export interface TextCardProps {
  note: TextNote;
  onPress?: () => void;
}

export function TextCard({ note, onPress }: TextCardProps) {
  return (
    <CardShell
      color={note.color}
      onPress={onPress}
      accessibilityLabel={`Text note: ${note.title}`}
    >
      <Text style={styles.title}>{note.title}</Text>
      <View style={styles.footer}>
        <Text style={styles.date}>{formatShortDate(note.createdAt)}</Text>
      </View>
    </CardShell>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.uiBold,
    fontSize: 26,
    lineHeight: 30,
    color: accents.blue,
  },
  footer: {
    marginTop: spacing.xl,
    alignItems: 'flex-end',
  },
  date: {
    fontFamily: fonts.uiRegular,
    fontSize: 11,
    color: 'rgba(30,34,48,0.5)',
  },
});
