/**
 * "Emmcriptada" — peach → pink → lilac gradient card with the drafts count and
 * the word "Reels" set large in italic Instrument Serif.
 */
import { StyleSheet, Text } from 'react-native';
import { espacio, fonts, spacing } from '@/theme/tokens';
import { EspacioCard } from './EspacioCard';

export function EmmcriptadaCard() {
  return (
    <EspacioCard gradient={espacio.gradients.emmcriptada} style={styles.card}>
      <Text style={styles.label}>Emmcriptada · 2 reels en borrador</Text>
      <Text style={styles.word}>Reels</Text>
    </EspacioCard>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 110,
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: fonts.outfitSemi,
    fontSize: 12,
    lineHeight: 16,
    color: espacio.navy,
  },
  word: {
    fontFamily: fonts.instrumentItalic,
    fontSize: 40,
    lineHeight: 44,
    color: '#FFFFFF',
    marginTop: spacing.md,
  },
});
