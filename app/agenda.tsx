/**
 * Agenda — reached from the agenda bento card. A placeholder day view listing
 * Monday's events.
 */
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { CircleButton } from '@/components/ui/CircleButton';
import { ChevronLeftIcon } from '@/components/ui/icons';
import { espacio, fonts, radii, spacing } from '@/theme/tokens';

const EVENTS = [
  { time: '09:00', label: 'Foco' },
  { time: '11:30', label: 'Sync' },
  { time: '15:00', label: 'Sesión' },
];

export default function AgendaScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <GradientBackground variant="home">
      <View style={[styles.root, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.topRow}>
          <CircleButton accessibilityLabel="Volver" onPress={() => router.back()}>
            <ChevronLeftIcon size={22} color={espacio.navy} />
          </CircleButton>
          <View style={styles.spacer} />
        </View>

        <Text style={styles.title}>Agenda</Text>
        <Text style={styles.subtitle}>Lunes 23 nov · 3 eventos</Text>

        <View style={styles.list}>
          {EVENTS.map((e, i) => (
            <View key={e.time} style={styles.card}>
              <View
                style={[styles.dot, { backgroundColor: espacio.eventDots[i] }]}
              />
              <Text style={styles.time}>{e.time}</Text>
              <Text style={styles.label}>{e.label}</Text>
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
  title: {
    fontFamily: fonts.outfitBold,
    fontSize: 44,
    color: '#FFFFFF',
    marginTop: spacing.xl,
    textShadowColor: 'rgba(255,255,255,0.5)',
    textShadowRadius: 12,
  },
  subtitle: {
    fontFamily: fonts.outfitMedium,
    fontSize: 15,
    color: espacio.navy,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  list: { gap: spacing.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.card,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderWidth: 1,
    borderColor: espacio.cardBorder,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  time: {
    fontFamily: fonts.outfitSemi,
    fontSize: 16,
    color: espacio.navy,
    width: 56,
  },
  label: {
    fontFamily: fonts.outfitMedium,
    fontSize: 16,
    color: espacio.navy,
  },
});
