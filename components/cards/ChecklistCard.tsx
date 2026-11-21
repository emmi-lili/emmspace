/**
 * ChecklistCard — mint card with a pixel-font (DotGothic16) title. Each item is
 * a glass pill with a circular checkbox. Checking an item darkens the pill and
 * animates in a white check. Toggles are optimistic (local Zustand override).
 */
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { Glass } from '@/components/glass';
import { PressableScale } from '@/components/ui/PressableScale';
import { CheckIcon } from '@/components/ui/icons';
import { CardShell } from './CardShell';
import { accents, fonts, radii, spacing } from '@/theme/tokens';
import { useUIStore } from '@/hooks/useUIStore';
import { type ChecklistItem, type ChecklistNote } from '@/types/note';

export interface ChecklistCardProps {
  note: ChecklistNote;
  onPress?: () => void;
}

export function ChecklistCard({ note, onPress }: ChecklistCardProps) {
  return (
    <CardShell
      color={note.color}
      onPress={onPress}
      accessibilityLabel={`Checklist: ${note.title}`}
    >
      <Text style={styles.title}>{note.title}</Text>
      <View style={styles.items}>
        {note.items.map((item) => (
          <ChecklistRow key={item.id} noteId={note.id} item={item} />
        ))}
      </View>
    </CardShell>
  );
}

interface ChecklistRowProps {
  noteId: string;
  item: ChecklistItem;
}

function ChecklistRow({ noteId, item }: ChecklistRowProps) {
  const done = useUIStore((s) => s.isItemDone(noteId, item.id, item.done));
  const toggle = useUIStore((s) => s.toggleChecklistItem);

  const progress = useDerivedValue(
    () => withTiming(done ? 1 : 0, { duration: 220 }),
    [done],
  );

  const pillStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(255,255,255,0)', 'rgba(30,34,48,0.55)'],
    ),
  }));

  const boxStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(255,255,255,0)', accents.checklistGreen],
    ),
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(47,107,79,0.6)', accents.checklistGreen],
    ),
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.6 + progress.value * 0.4 }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [accents.checklistGreen, '#FFFFFF'],
    ),
  }));

  const onToggle = useCallback(() => {
    Haptics.selectionAsync().catch(() => {});
    toggle(noteId, item.id, !done);
  }, [toggle, noteId, item.id, done]);

  return (
    <PressableScale
      onPress={onToggle}
      haptics={false}
      accessibilityLabel={item.label}
      accessibilityRole="button"
      accessibilityState={{ selected: done }}
      style={styles.rowWrap}
    >
      <Glass radius={radii.pill} shadow={false} style={styles.pill}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.pillOverlay, pillStyle]} />
        <Animated.View style={[styles.checkbox, boxStyle]}>
          <Animated.View style={checkStyle}>
            <CheckIcon size={13} color="#FFFFFF" />
          </Animated.View>
        </Animated.View>
        <Animated.Text style={[styles.label, labelStyle]} numberOfLines={1}>
          {item.label}
        </Animated.Text>
      </Glass>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.pixel,
    fontSize: 20,
    color: accents.checklistGreen,
    marginBottom: spacing.md,
  },
  items: {
    gap: spacing.sm,
  },
  rowWrap: {
    width: '100%',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  pillOverlay: {
    borderRadius: radii.pill,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.uiBold,
    fontSize: 14,
    flexShrink: 1,
  },
});
