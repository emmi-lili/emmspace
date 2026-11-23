/**
 * "Frase del día" — a white glass card with a blue label and the day's quote
 * in navy.
 */
import { StyleSheet, Text } from 'react-native';
import { espacio, fonts, spacing } from '@/theme/tokens';
import { EspacioCard } from './EspacioCard';

export function FraseCard() {
  return (
    <EspacioCard glass>
      <Text style={styles.label}>Frase del día</Text>
      <Text style={styles.quote}>“Si lo explico simple, lo entendí.”</Text>
    </EspacioCard>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.outfitSemi,
    fontSize: 12,
    letterSpacing: 0.4,
    color: '#3A5A99',
    marginBottom: spacing.xs,
  },
  quote: {
    fontFamily: fonts.outfitMedium,
    fontSize: 16,
    lineHeight: 22,
    color: espacio.navy,
  },
});
