import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export default function CareerScreen() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[colors.money, '#00CC70']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Ionicons name="briefcase" size={40} color={colors.text} />
        <Text style={styles.headerTitle}>Carrière</Text>
        <Text style={styles.headerSubtitle}>Jobs & Business</Text>
      </LinearGradient>

      <Card style={styles.card}>
        <Text style={styles.comingSoon}>💼 Coming Soon</Text>
        <Text style={styles.description}>
          • Jobs évolutifs{'\n'}
          • Serveur → Influenceur → Entrepreneur{'\n'}
          • Mini-jeux business{'\n'}
          • Salaire quotidien{'\n'}
          • Investissements
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
