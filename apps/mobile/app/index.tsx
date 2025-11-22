import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/theme/colors';

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        if (isAuthenticated) {
          router.replace('/(game)/home');
        } else {
          router.replace('/(auth)/welcome');
        }
      }, 1500);
    }
  }, [isLoading, isAuthenticated]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>REAL LIFE+</Text>
      <Text style={styles.tagline}>Ta vraie vie devient ton jeu</Text>
      <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});
