/**
 * The "+ Create new" pill that sits mounted over the bottom edge of the card
 * stack, wrapped in a dark translucent outer ring.
 */
import { StyleSheet, Text, View } from 'react-native';
import { PressableScale } from '@/components/ui/PressableScale';
import { PlusIcon } from '@/components/ui/icons';
import { accents, capsule, fonts, radii, spacing } from '@/theme/tokens';

export interface CreateNewPillProps {
  onPress?: () => void;
}

export function CreateNewPill({ onPress }: CreateNewPillProps) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel="Create a new note">
      <View style={styles.ring}>
        <View style={styles.pill}>
          <PlusIcon size={18} color={accents.darkText} />
          <Text style={styles.label}>Create new</Text>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  ring: {
    padding: 6,
    borderRadius: radii.pill,
    backgroundColor: capsule.light,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 44,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontFamily: fonts.uiBold,
    fontSize: 15,
    color: accents.darkText,
  },
});
