/**
 * "Your Notes" home screen: glowing header, filter chips and a 2-column masonry
 * grid of note cards, with the floating action capsule anchored at the bottom.
 */
import { useCallback, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { AnimatedEntrance } from '@/components/ui/AnimatedEntrance';
import { HomeHeader } from '@/components/home/HomeHeader';
import { FloatingActions } from '@/components/home/FloatingActions';
import { NoteCard } from '@/components/cards';
import { useNotes } from '@/hooks/useNotes';
import { useUIStore } from '@/hooks/useUIStore';
import { filterNotes } from '@/lib/filterNotes';
import { fonts, spacing } from '@/theme/tokens';
import { type Note } from '@/types/note';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { data: notes, isLoading } = useNotes();
  const activeFilter = useUIStore((s) => s.activeFilter);
  const setFilter = useUIStore((s) => s.setFilter);

  const visible = useMemo(
    () => filterNotes(notes ?? [], activeFilter),
    [notes, activeFilter],
  );

  const openNote = useCallback(
    (id: string) => router.push(`/note/${id}`),
    [router],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Note; index: number }) => (
      <AnimatedEntrance index={index} style={styles.cell}>
        <NoteCard note={item} onPress={() => openNote(item.id)} />
      </AnimatedEntrance>
    ),
    [openNote],
  );

  return (
    <GradientBackground variant="home">
      <View style={[styles.root, { paddingTop: insets.top + spacing.sm }]}>
        <FlashList
          // Remounting on filter change replays the staggered entrance.
          key={activeFilter}
          data={visible}
          numColumns={2}
          masonry
          optimizeItemArrangement
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={
            <HomeHeader
              activeFilter={activeFilter}
              onFilterChange={setFilter}
            />
          }
          ListEmptyComponent={
            isLoading ? (
              <View style={styles.empty}>
                <ActivityIndicator color="#FFFFFF" />
              </View>
            ) : (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No notes here yet.</Text>
              </View>
            )
          }
          contentContainerStyle={{
            paddingHorizontal: spacing.md,
            paddingBottom: insets.bottom + 140,
          }}
          showsVerticalScrollIndicator={false}
        />
        <FloatingActions />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  cell: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.md,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.huge,
  },
  emptyText: {
    fontFamily: fonts.uiRegular,
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
  },
});
