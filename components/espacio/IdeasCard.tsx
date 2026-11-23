/**
 * "Ideas" — pale yellow card with the word "Ideas" set large in Instrument
 * Serif at the bottom-left, and two tilted white paper leaves at the top-right.
 */
import { StyleSheet, Text, View } from 'react-native';
import { espacio, fonts, spacing } from '@/theme/tokens';
import { EspacioCard } from './EspacioCard';

export function IdeasCard() {
  return (
    <EspacioCard gradient={espacio.gradients.ideas} style={styles.card}>
      <View style={styles.papers} pointerEvents="none">
        <View style={[styles.paper, styles.paperBack]} />
        <View style={[styles.paper, styles.paperFront]} />
      </View>
      <Text style={styles.word}>Ideas</Text>
    </EspacioCard>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 120,
    justifyContent: 'flex-end',
  },
  papers: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 54,
    height: 54,
  },
  paper: {
    position: 'absolute',
    width: 30,
    height: 38,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(36,48,90,0.08)',
  },
  paperBack: {
    right: 16,
    top: 6,
    transform: [{ rotate: '-16deg' }],
    opacity: 0.8,
  },
  paperFront: {
    right: 0,
    top: 0,
    transform: [{ rotate: '12deg' }],
  },
  word: {
    fontFamily: fonts.instrument,
    fontSize: 44,
    lineHeight: 48,
    color: espacio.navy,
    marginTop: spacing.xl,
  },
});
