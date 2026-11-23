/**
 * FEDE — the hero card. A purple gradient with a luminous orb spilling out of
 * the top-right corner, the "TU ASISTENTE" kicker, the big "Fede" name, a line
 * of copy and a white "Abrir →" pill. The whole card is the button into Fede.
 */
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, RadialGradient, Circle, Stop } from 'react-native-svg';
import { espacio, fonts, radii, spacing } from '@/theme/tokens';
import { ArrowRightIcon } from '@/components/ui/icons';
import { EspacioCard } from './EspacioCard';

export interface FedeCardProps {
  onPress?: () => void;
}

export function FedeCard({ onPress }: FedeCardProps) {
  return (
    <EspacioCard
      gradient={espacio.gradients.fede}
      onPress={onPress}
      accessibilityLabel="Fede, tu asistente. Tengo 3 cosas para ti mañana. Abrir"
      style={styles.card}
    >
      {/* Luminous orb emerging from the top-right corner. */}
      <View style={styles.orb} pointerEvents="none">
        <Svg width={160} height={160} viewBox="0 0 160 160">
          <Defs>
            <RadialGradient id="fede-orb" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.95} />
              <Stop offset="45%" stopColor="#F2ECFF" stopOpacity={0.55} />
              <Stop offset="100%" stopColor="#F2ECFF" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={80} cy={80} r={80} fill="url(#fede-orb)" />
        </Svg>
      </View>

      <Text style={styles.kicker}>TU ASISTENTE</Text>
      <Text style={styles.name}>Fede</Text>
      <Text style={styles.copy}>Tengo 3 cosas para ti mañana</Text>

      <View style={styles.pill}>
        <Text style={styles.pillLabel}>Abrir</Text>
        <ArrowRightIcon size={16} color={espacio.navy} strokeWidth={2.2} />
      </View>
    </EspacioCard>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 210,
  },
  orb: {
    position: 'absolute',
    top: -56,
    right: -56,
  },
  kicker: {
    fontFamily: fonts.outfitSemi,
    fontSize: 11,
    letterSpacing: 1.6,
    color: espacio.navy,
    opacity: 0.8,
  },
  name: {
    fontFamily: fonts.outfitSemi,
    fontSize: 34,
    lineHeight: 38,
    color: espacio.navy,
    marginTop: 2,
  },
  copy: {
    fontFamily: fonts.outfitMedium,
    fontSize: 14,
    lineHeight: 19,
    color: espacio.navy,
    marginTop: spacing.xs,
    maxWidth: '88%',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-start',
    marginTop: 'auto',
    height: 44,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
  },
  pillLabel: {
    fontFamily: fonts.outfitSemi,
    fontSize: 15,
    color: espacio.navy,
  },
});
