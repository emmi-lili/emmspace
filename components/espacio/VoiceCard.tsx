/**
 * Voice-note pill: a lavender fully-rounded card with a white play button and
 * a white waveform. The whole pill is the play button.
 */
import { StyleSheet, View } from 'react-native';
import { PlayIcon } from '@/components/ui/icons';
import { espacio, radii, spacing } from '@/theme/tokens';
import { EspacioCard } from './EspacioCard';

// Static bar heights (in px) for the little waveform.
const BARS = [10, 18, 26, 14, 22, 30, 16, 24, 12, 20, 28, 14, 18];

export interface VoiceCardProps {
  onPress?: () => void;
}

export function VoiceCard({ onPress }: VoiceCardProps) {
  return (
    <EspacioCard
      gradient={espacio.gradients.voice}
      radius={radii.pill}
      onPress={onPress}
      accessibilityLabel="Reproducir nota de voz"
      style={styles.card}
    >
      <View style={styles.play}>
        <PlayIcon size={18} color={espacio.navy} />
      </View>
      <View style={styles.wave}>
        {BARS.map((h, i) => (
          <View key={i} style={[styles.bar, { height: h }]} />
        ))}
      </View>
    </EspacioCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    minHeight: 60,
  },
  play: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wave: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 34,
  },
  bar: {
    width: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
});
