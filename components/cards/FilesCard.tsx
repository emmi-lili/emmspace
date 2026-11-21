/**
 * FilesCard / PdfCard — one component covering both. Renders the big serif word
 * ("Files" in olive-gold on cream, "Pdf" in soft magenta on pink-lilac) with
 * two overlapping white document icons.
 */
import { StyleSheet, Text, View } from 'react-native';
import { DocumentIcon } from '@/components/ui/icons';
import { CardShell } from './CardShell';
import { accents, fonts, spacing } from '@/theme/tokens';
import { type FilesNote, type PdfNote } from '@/types/note';

export interface FilesCardProps {
  note: FilesNote | PdfNote;
  onPress?: () => void;
}

export function FilesCard({ note, onPress }: FilesCardProps) {
  const isPdf = note.type === 'pdf';
  const word = isPdf ? 'Pdf' : 'Files';
  const wordColor = isPdf ? accents.softMagenta : accents.oliveGold;
  const count = note.mediaUrls.length;

  return (
    <CardShell
      color={note.color}
      onPress={onPress}
      accessibilityLabel={`${word} note with ${count} ${count === 1 ? 'file' : 'files'}`}
    >
      <View style={styles.docs}>
        <View style={[styles.doc, styles.docBack]}>
          <DocumentIcon size={40} color="rgba(255,255,255,0.7)" />
        </View>
        <View style={[styles.doc, styles.docFront]}>
          <DocumentIcon size={40} color="#FFFFFF" />
        </View>
      </View>
      <Text style={[styles.word, { color: wordColor }]}>{word}</Text>
      <Text style={styles.count}>
        {count} {count === 1 ? 'item' : 'items'}
      </Text>
    </CardShell>
  );
}

const styles = StyleSheet.create({
  docs: {
    height: 64,
    marginBottom: spacing.md,
  },
  doc: {
    position: 'absolute',
  },
  docBack: {
    left: 14,
    top: 6,
    transform: [{ rotate: '-8deg' }],
  },
  docFront: {
    left: 0,
    top: 0,
    transform: [{ rotate: '6deg' }],
  },
  word: {
    fontFamily: fonts.serif,
    fontSize: 34,
  },
  count: {
    marginTop: spacing.xs,
    fontFamily: fonts.uiRegular,
    fontSize: 11,
    color: 'rgba(30,34,48,0.5)',
  },
});
