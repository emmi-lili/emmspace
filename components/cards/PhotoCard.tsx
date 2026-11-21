/**
 * PhotoCard — a full-bleed cover image with a dark bottom gradient carrying the
 * title and date in white, a glass "+N" badge (when there are extra photos) and
 * a glass "Photos" pill. With multiple photos a coral card peeks out behind as
 * a stack.
 */
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { PressableScale } from '@/components/ui/PressableScale';
import { Glass } from '@/components/glass';
import { ImageIcon } from '@/components/ui/icons';
import { cardColors, fonts, radii, spacing } from '@/theme/tokens';
import { formatShortDate } from '@/lib/format';
import { type PhotosNote } from '@/types/note';

export interface PhotoCardProps {
  note: PhotosNote;
  /** Rendered height of the cover. Masonry varies this for visual rhythm. */
  height?: number;
  onPress?: () => void;
}

export function PhotoCard({ note, height = 220, onPress }: PhotoCardProps) {
  const cover = note.mediaUrls[0];
  const extra = Math.max(0, note.mediaUrls.length - 1);
  const hasStack = note.mediaUrls.length > 1;

  return (
    <PressableScale
      onPress={onPress}
      accessibilityLabel={`Photo album: ${note.title}, ${note.mediaUrls.length} photos`}
    >
      <View style={styles.wrap}>
        {hasStack && <View style={[styles.stackBehind, { height }]} />}
        <View style={[styles.card, { height }]}>
          {cover && (
            <Image
              source={{ uri: cover }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              transition={250}
              accessibilityIgnoresInvertColors
            />
          )}
          <LinearGradient
            colors={['transparent', 'rgba(20,22,34,0.75)']}
            style={styles.overlay}
          />

          {extra > 0 && (
            <Glass radius={radii.pill} shadow={false} style={styles.badge}>
              <Text style={styles.badgeText}>+{extra}</Text>
            </Glass>
          )}

          <View style={styles.footer}>
            <View style={styles.footerText}>
              <Text style={styles.title} numberOfLines={1}>
                {note.title}
              </Text>
              <Text style={styles.date}>{formatShortDate(note.createdAt)}</Text>
            </View>
            <Glass radius={radii.pill} shadow={false} style={styles.photosPill}>
              <ImageIcon size={14} color="#FFFFFF" />
              <Text style={styles.photosText}>Photos</Text>
            </Glass>
          </View>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 10,
    paddingRight: 8,
  },
  stackBehind: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 0,
    borderRadius: radii.card,
    backgroundColor: cardColors.coral,
    transform: [{ rotate: '3deg' }],
  },
  card: {
    borderRadius: radii.card,
    overflow: 'hidden',
    backgroundColor: '#C9C3EE',
    shadowColor: '#1E2230',
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
  },
  badge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    minWidth: 40,
    height: 32,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: fonts.uiBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  footer: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  footerText: {
    flexShrink: 1,
  },
  title: {
    fontFamily: fonts.uiBold,
    fontSize: 20,
    color: '#FFFFFF',
  },
  date: {
    fontFamily: fonts.uiRegular,
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  photosPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 34,
    paddingHorizontal: spacing.md,
  },
  photosText: {
    fontFamily: fonts.uiBold,
    fontSize: 12,
    color: '#FFFFFF',
  },
});
