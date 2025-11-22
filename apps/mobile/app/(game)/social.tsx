import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export default function SocialScreen() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[colors.secondary, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Ionicons name="people" size={40} color={colors.text} />
        <Text style={styles.headerTitle}>Social</Text>
        <Text style={styles.headerSubtitle}>Rencontres & Relations</Text>
      </LinearGradient>

      <Card style={styles.card}>
        <Text style={styles.comingSoon}>🔜 Coming Soon</Text>
        <Text style={styles.description}>
          • Rencontres sociales{'\n'}
          • Soirées & Events{'\n'}
          • Système d'affinités{'\n'}
          • Crush & Dating{'\n'}
          • Classements popularité
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
  },
  card: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  comingSoon: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
