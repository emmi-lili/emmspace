/**
 * Mi Espacio header: a white line sparkle on the left and a glass avatar button
 * on the right, the big glowing "Mi Espacio" title (layered so it gets both a
 * white glow and a soft blue shadow for legibility), the date + greeting line,
 * and the horizontally scrolling filter chips cut off at the right edge.
 */
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Glass } from '@/components/glass';
import { PressableScale } from '@/components/ui/PressableScale';
import { SparkleIcon } from '@/components/ui/icons';
import { espacio, fonts, radii, sizes, spacing } from '@/theme/tokens';
import { type EspacioFilter, ESPACIO_FILTERS } from './filters';

export interface MiEspacioHeaderProps {
  activeFilter: EspacioFilter;
  onFilterChange: (filter: EspacioFilter) => void;
  onAvatarPress?: () => void;
}

export function MiEspacioHeader({
  activeFilter,
  onFilterChange,
  onAvatarPress,
}: MiEspacioHeaderProps) {
  return (
    <View style={styles.root}>
      <View style={styles.topRow}>
        <SparkleIcon size={30} color="#FFFFFF" strokeWidth={2} />

        <PressableScale
          accessibilityLabel="Tu perfil, Emmi"
          accessibilityRole="button"
          onPress={onAvatarPress}
          style={styles.avatarPress}
        >
          <Glass radius={sizes.circleButton / 2} style={styles.avatarGlass}>
            <LinearGradient
              colors={espacio.gradients.avatar}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarFill}
            >
              <Text style={styles.avatarInitial}>E</Text>
            </LinearGradient>
          </Glass>
        </PressableScale>
      </View>

      <View style={styles.titleWrap} accessibilityRole="header">
        {/* Back layer carries the soft blue shadow; front layer the white glow. */}
        <Text style={[styles.title, styles.titleShadow]} accessible={false}>
          Mi Espacio
        </Text>
        <Text style={[styles.title, styles.titleGlow]}>Mi Espacio</Text>
      </View>

      <Text style={styles.subtitle}>Domingo 22 nov · Buenas noches, Emmi</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {ESPACIO_FILTERS.map((f) => (
          <EspacioChip
            key={f.key}
            label={f.label}
            active={activeFilter === f.key}
            onPress={() => onFilterChange(f.key)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

interface EspacioChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

function EspacioChip({ label, active, onPress }: EspacioChipProps) {
  return (
    <PressableScale
      onPress={onPress}
      accessibilityLabel={`Filtro ${label}`}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      {active ? (
        <View style={[styles.chip, styles.chipActive]}>
          <Text style={[styles.chipLabel, styles.chipLabelActive]}>{label}</Text>
        </View>
      ) : (
        <Glass radius={radii.pill} shadow={false} style={styles.chip}>
          <Text style={styles.chipLabel}>{label}</Text>
        </Glass>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: spacing.xl,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: sizes.minTouchTarget,
  },
  avatarPress: {
    borderRadius: sizes.circleButton / 2,
  },
  avatarGlass: {
    width: sizes.circleButton,
    height: sizes.circleButton,
    overflow: 'hidden',
  },
  avatarFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: fonts.outfitSemi,
    fontSize: 22,
    color: '#FFFFFF',
  },
  titleWrap: {
    marginTop: spacing.lg,
    position: 'relative',
  },
  title: {
    fontFamily: fonts.outfitMedium,
    fontSize: 54,
    lineHeight: 60,
    color: '#FFFFFF',
  },
  titleShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    textShadowColor: 'rgba(54,78,150,0.45)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 10,
  },
  titleGlow: {
    textShadowColor: 'rgba(255,255,255,0.65)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 14,
  },
  subtitle: {
    fontFamily: fonts.outfitMedium,
    fontSize: 15,
    lineHeight: 20,
    color: espacio.navy,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  chips: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    paddingRight: spacing.huge,
  },
  chip: {
    minHeight: sizes.minTouchTarget,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: espacio.cardBorder,
  },
  chipActive: {
    backgroundColor: espacio.activeChip,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  chipLabel: {
    fontFamily: fonts.outfitSemi,
    fontSize: 14,
    color: espacio.navy,
  },
  chipLabelActive: {
    color: espacio.navy,
  },
});
