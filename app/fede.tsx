/**
 * Fede — the assistant screen. Reached from the Fede hero card and the dock
 * sparkle. A placeholder for the conversation UI; shows today's briefing.
 */
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { CircleButton } from '@/components/ui/CircleButton';
import { ChevronLeftIcon, SparkleIcon } from '@/components/ui/icons';
import { espacio, fonts, radii, spacing } from '@/theme/tokens';

const ITEMS = [
  'Confirmar hora con el jurado',
  'Enviar el deck de BNB',
  'Agendar la grabación del reel',
];

export default function FedeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <GradientBackground variant="detail">
      <View style={[styles.root, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.topRow}>
          <CircleButton accessibilityLabel="Volver" onPress={() => router.back()}>
            <ChevronLeftIcon size={22} color={espacio.navy} />
          </CircleButton>
          <SparkleIcon size={26} color="#FFFFFF" />
          <View style={styles.spacer} />
        </View>

        <Text style={styles.kicker}>TU ASISTENTE</Text>
        <Text style={styles.name}>Fede</Text>
        <Text style={styles.copy}>Tengo 3 cosas para ti mañana:</Text>

        <View style={styles.card}>
          {ITEMS.map((it, i) => (
            <View key={it} style={styles.item}>
              <View
                style={[styles.dot, { backgroundColor: espacio.eventDots[i] }]}
              />
              <Text style={styles.itemText}>{it}</Text>
            </View>
          ))}
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: spacing.xl },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spacer: { width: 52 },
  kicker: {
    fontFamily: fonts.outfitSemi,
    fontSize: 12,
    letterSpacing: 1.6,
    color: espacio.navy,
    marginTop: spacing.xl,
  },
  name: {
    fontFamily: fonts.outfitBold,
    fontSize: 48,
    color: espacio.navy,
  },
  copy: {
    fontFamily: fonts.outfitMedium,
    fontSize: 16,
    color: espacio.navy,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  card: {
    gap: spacing.md,
    padding: spacing.xl,
    borderRadius: radii.card,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderWidth: 1,
    borderColor: espacio.cardBorder,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  itemText: {
    fontFamily: fonts.outfitMedium,
    fontSize: 16,
    color: espacio.navy,
    flexShrink: 1,
  },
});
