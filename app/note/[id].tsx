/**
 * Note-detail screen for a collection. Shows the glowing collection title, the
 * Text/Images/Audios chips, and a swipeable stack of the collection's notes,
 * with the "+ Create new" pill mounted over the card's bottom edge.
 */
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { GradientBackground } from '@/components/ui/GradientBackground';
import {
  CreateNewPill,
  DetailHeader,
  SwipeableCardStack,
} from '@/components/detail';
import { useNoteCollection } from '@/hooks/useNotes';
import { useUIStore } from '@/hooks/useUIStore';
import { spacing } from '@/theme/tokens';
import { type Note } from '@/types/note';

type DetailChip = 'Text' | 'Images' | 'Audios';

/** Maps a chip to the note types it keeps in the stack. */
function chipMatches(note: Note, chip: DetailChip): boolean {
  switch (chip) {
    case 'Images':
      return note.type === 'photos';
    case 'Audios':
      return note.type === 'audio';
    case 'Text':
    default:
      return note.type !== 'photos' && note.type !== 'audio';
  }
}

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { height } = useWindowDimensions();
  const { data, isLoading } = useNoteCollection(id ?? '');
  const setDetailIndex = useUIStore((s) => s.setDetailIndex);

  const [activeChip, setActiveChip] = useState<DetailChip>('Text');

  // Reset the stack position whenever the chip or collection changes.
  useEffect(() => {
    setDetailIndex(0);
  }, [activeChip, id, setDetailIndex]);

  const stackNotes = useMemo(() => {
    const notes = data?.notes ?? [];
    const filtered = notes.filter((n) => chipMatches(n, activeChip));
    return filtered.length > 0 ? filtered : notes;
  }, [data?.notes, activeChip]);

  const cardHeight = Math.min(460, height * 0.52);

  return (
    <GradientBackground variant="detail">
      <View style={[styles.root, { paddingTop: insets.top + spacing.sm }]}>
        <DetailHeader
          title={data?.collection ?? 'Note'}
          activeChip={activeChip}
          onChipChange={setActiveChip}
          onBack={() => router.back()}
        />

        <View style={styles.body}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <View style={styles.stackWrap}>
              <SwipeableCardStack notes={stackNotes} cardHeight={cardHeight} />
              <View style={styles.pillWrap} pointerEvents="box-none">
                <CreateNewPill />
              </View>
            </View>
          )}
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
  },
  stackWrap: {
    alignItems: 'center',
  },
  pillWrap: {
    marginTop: -22,
    alignItems: 'center',
  },
});
