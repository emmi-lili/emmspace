/**
 * "Mi Espacio" home: the glowing title + greeting, horizontally scrolling
 * filter chips, a two-column bento grid (notes, to-dos, agenda and the Fede
 * assistant) and a floating dock. The grid is cut off by the bottom edge to
 * suggest scrolling.
 */
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { GradientBackground } from '@/components/ui/GradientBackground';
import {
  MiEspacioHeader,
  BentoGrid,
  EspacioDock,
  type EspacioFilter,
} from '@/components/espacio';
import { spacing } from '@/theme/tokens';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [filter, setFilter] = useState<EspacioFilter>('all');

  const openFede = useCallback(() => router.push('/fede'), [router]);
  const openAgenda = useCallback(() => router.push('/agenda'), [router]);

  return (
    <GradientBackground variant="home">
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: insets.top + spacing.sm,
            paddingBottom: insets.bottom + 128,
          }}
        >
          <MiEspacioHeader activeFilter={filter} onFilterChange={setFilter} />
          <BentoGrid
            activeFilter={filter}
            onOpenFede={openFede}
            onOpenAgenda={openAgenda}
          />
        </ScrollView>

        <EspacioDock onOpenFede={openFede} />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
