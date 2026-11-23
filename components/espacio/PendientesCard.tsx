/**
 * "Pendientes de hoy" — mint card with the title set in Doto (dot-matrix),
 * centered, over three pill checkboxes. A checked item is a solid dark pill;
 * unchecked items are glassy. Each pill is a real checkbox with its own state.
 */
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PressableScale } from '@/components/ui/PressableScale';
import { CheckIcon } from '@/components/ui/icons';
import { espacio, fonts, radii, sizes, spacing } from '@/theme/tokens';
import { EspacioCard } from './EspacioCard';

interface Item {
  id: string;
  label: string;
  done: boolean;
}

const INITIAL: Item[] = [
  { id: 'reel', label: 'Grabar reel', done: true },
  { id: 'deck', label: 'Deck BNB', done: false },
  { id: 'jurado', label: 'Notas jurado', done: false },
];

export function PendientesCard() {
  const [items, setItems] = useState(INITIAL);

  const toggle = (id: string) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)),
    );

  return (
    <EspacioCard gradient={espacio.gradients.mint}>
      <Text style={styles.title}>Pendientes de hoy</Text>
      <View style={styles.list}>
        {items.map((it) => (
          <CheckPill key={it.id} item={it} onToggle={() => toggle(it.id)} />
        ))}
      </View>
    </EspacioCard>
  );
}

function CheckPill({ item, onToggle }: { item: Item; onToggle: () => void }) {
  return (
    <PressableScale
      onPress={onToggle}
      accessibilityLabel={item.label}
      accessibilityRole="button"
      accessibilityState={{ selected: item.done }}
      style={[styles.pill, item.done ? styles.pillDone : styles.pillOpen]}
    >
      <View style={[styles.box, item.done ? styles.boxDone : styles.boxOpen]}>
        {item.done && <CheckIcon size={13} color={espacio.navy} strokeWidth={2.6} />}
      </View>
      <Text
        style={[styles.pillLabel, item.done ? styles.labelDone : styles.labelOpen]}
        numberOfLines={1}
      >
        {item.label}
      </Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.dotoBold,
    fontSize: 16,
    lineHeight: 20,
    color: espacio.navy,
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.sm,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: sizes.minTouchTarget,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    borderWidth: 1,
  },
  pillDone: {
    backgroundColor: 'rgba(31,38,64,0.92)',
    borderColor: 'rgba(31,38,64,0.92)',
  },
  pillOpen: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderColor: espacio.cardBorder,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  boxDone: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  boxOpen: {
    backgroundColor: 'transparent',
    borderColor: espacio.navy,
  },
  pillLabel: {
    fontFamily: fonts.outfitSemi,
    fontSize: 14,
    flexShrink: 1,
  },
  labelDone: { color: '#FFFFFF' },
  labelOpen: { color: espacio.navy },
});
