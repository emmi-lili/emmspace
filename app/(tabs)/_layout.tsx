/**
 * Tab group layout. The design replaces the system tab bar with the floating
 * glass capsule on the home screen, so the bar itself is hidden — the group
 * still gives us the `(tabs)/index` route structure from the spec.
 */
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'emmspace' }} />
    </Tabs>
  );
}
