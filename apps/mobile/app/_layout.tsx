import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { loadFonts } from '@/utils/fonts';
import { useGameStore } from '@/store/gameStore';

const queryClient = new QueryClient();

export default function RootLayout() {
  const initializeGame = useGameStore((state) => state.initialize);

  useEffect(() => {
    const setup = async () => {
      await loadFonts();
      await initializeGame();
    };
    setup();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            contentStyle: { backgroundColor: '#000' },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(game)" />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
