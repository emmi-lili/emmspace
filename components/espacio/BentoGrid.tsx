/**
 * Two-column bento layout. Each card declares which filters it belongs to;
 * selecting a chip hides the cards that don't match and the columns reflow.
 * "Todo" shows everything.
 */
import { StyleSheet, View } from 'react-native';
import { spacing } from '@/theme/tokens';
import { type EspacioFilter, cardVisible } from './filters';
import { PendientesCard } from './PendientesCard';
import { IdeasCard } from './IdeasCard';
import { AgendaCard } from './AgendaCard';
import { FedeCard } from './FedeCard';
import { VoiceCard } from './VoiceCard';
import { FraseCard } from './FraseCard';
import { EmmcriptadaCard } from './EmmcriptadaCard';

export interface BentoGridProps {
  activeFilter: EspacioFilter;
  onOpenFede?: () => void;
  onOpenAgenda?: () => void;
}

export function BentoGrid({
  activeFilter,
  onOpenFede,
  onOpenAgenda,
}: BentoGridProps) {
  const show = (tags: readonly EspacioFilter[]) => cardVisible(tags, activeFilter);

  return (
    <View style={styles.grid}>
      <View style={styles.col}>
        {show(['recordatorios']) && <PendientesCard />}
        {show(['ideas']) && <IdeasCard />}
        {show(['agenda']) && <AgendaCard onPress={onOpenAgenda} />}
      </View>
      <View style={styles.col}>
        {show(['fede']) && <FedeCard onPress={onOpenFede} />}
        {show(['fede']) && <VoiceCard />}
        {show([]) && <FraseCard />}
        {show(['ideas']) && <EmmcriptadaCard />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  col: {
    flex: 1,
    gap: spacing.md,
  },
});
