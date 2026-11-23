/**
 * Floating dock: a dark translucent capsule centered 26px above the bottom
 * edge, holding three 58px circular buttons — a solid white "+" (new note), a
 * glass mic (dictate) and a glass sparkle (open Fede).
 */
import { Platform, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { CircleButton } from '@/components/ui/CircleButton';
import { PlusIcon, MicIcon, SparkleIcon } from '@/components/ui/icons';
import { accents, capsule, radii, spacing } from '@/theme/tokens';

const BUTTON = 58;

export interface EspacioDockProps {
  onCreate?: () => void;
  onDictate?: () => void;
  onOpenFede?: () => void;
}

export function EspacioDock({
  onCreate,
  onDictate,
  onOpenFede,
}: EspacioDockProps) {
  return (
    <View style={styles.anchor} pointerEvents="box-none">
      <View style={styles.capsule}>
        {Platform.OS !== 'android' && (
          <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
        )}
        <View style={[StyleSheet.absoluteFill, styles.fill]} />

        <CircleButton
          variant="solid"
          size={BUTTON}
          onPress={onCreate}
          accessibilityLabel="Crear una nota"
        >
          <PlusIcon size={28} color={accents.darkText} />
        </CircleButton>

        <CircleButton
          variant="glass"
          size={BUTTON}
          onPress={onDictate}
          accessibilityLabel="Dictar una nota de voz"
        >
          <MicIcon size={26} color="#FFFFFF" />
        </CircleButton>

        <CircleButton
          variant="glass"
          size={BUTTON}
          onPress={onOpenFede}
          accessibilityLabel="Abrir a Fede, tu asistente"
        >
          <SparkleIcon size={26} color="#FFFFFF" strokeWidth={2} />
        </CircleButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  anchor: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 26,
    alignItems: 'center',
  },
  capsule: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    overflow: 'hidden',
    shadowColor: '#1E2230',
    shadowOpacity: 0.25,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  fill: {
    backgroundColor: capsule.light,
    borderRadius: radii.pill,
  },
});
