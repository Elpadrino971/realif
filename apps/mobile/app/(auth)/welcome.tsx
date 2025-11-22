import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/Button';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[colors.background, colors.surface, colors.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Ionicons name="sparkles" size={80} color={colors.primary} />
        <Text style={styles.logo}>REAL LIFE+</Text>
        <Text style={styles.tagline}>Ta vraie vie devient ton jeu</Text>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Ionicons name="walk" size={24} color={colors.energy} />
            <Text style={styles.featureText}>Tes pas = énergie</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="shirt" size={24} color={colors.primary} />
            <Text style={styles.featureText}>Style & Fashion</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="people" size={24} color={colors.secondary} />
            <Text style={styles.featureText}>Vie sociale</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title="Créer un compte"
          onPress={() => router.push('/(auth)/register')}
          variant="primary"
          fullWidth
          size="large"
        />
        <Button
          title="Se connecter"
          onPress={() => router.push('/(auth)/login')}
          variant="outline"
          fullWidth
          size="large"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxxl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.lg,
  },
  tagline: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  features: {
    marginTop: spacing.xxl,
    gap: spacing.lg,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  featureText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  actions: {
    gap: spacing.md,
  },
});
