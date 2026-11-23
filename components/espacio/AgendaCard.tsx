/**
 * Dark agenda card: "Agenda · Lun 23", an event count and a list of the next
 * three events, each with a colored bullet. Tapping opens the Agenda screen.
 */
import { StyleSheet, Text, View } from 'react-native';
import { espacio, fonts, spacing } from '@/theme/tokens';
import { EspacioCard } from './EspacioCard';

const EVENTS = [
  { time: '09:00', label: 'Foco' },
  { time: '11:30', label: 'Sync' },
  { time: '15:00', label: 'Sesión' },
];

export interface AgendaCardProps {
  onPress?: () => void;
}

export function AgendaCard({ onPress }: AgendaCardProps) {
  return (
    <EspacioCard
      gradient={espacio.gradients.agenda}
      onPress={onPress}
      accessibilityLabel="Agenda, 3 eventos. Abrir agenda"
    >
      <Text style={styles.kicker}>Agenda · Lun 23</Text>
      <Text style={styles.count}>3 eventos</Text>
      <View style={styles.list}>
        {EVENTS.map((e, i) => (
          <View key={e.time} style={styles.row}>
            <View
              style={[styles.dot, { backgroundColor: espacio.eventDots[i] }]}
            />
            <Text style={styles.time}>{e.time}</Text>
            <Text style={styles.label}>{e.label}</Text>
          </View>
        ))}
      </View>
    </EspacioCard>
  );
}

const styles = StyleSheet.create({
  kicker: {
    fontFamily: fonts.outfitSemi,
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
  },
  count: {
    fontFamily: fonts.outfitBold,
    fontSize: 22,
    color: '#FFFFFF',
    marginTop: 2,
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  time: {
    fontFamily: fonts.outfitSemi,
    fontSize: 14,
    color: '#FFFFFF',
    width: 46,
  },
  label: {
    fontFamily: fonts.outfit,
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
});
