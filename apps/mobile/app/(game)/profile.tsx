import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { useGameStore } from '@/store/gameStore';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { colors } from '@/theme/colors';
import { spacing, borderRadius } from '@/theme/spacing';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { progress, stats, stepsToday } = useGameStore();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/welcome');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={100} color={colors.primary} />
        </View>
        <Text style={styles.username}>{user?.username || 'Player'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <Card style={styles.statsCard}>
        <Text style={styles.sectionTitle}>Statistiques</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Niveau</Text>
          <Text style={styles.statValue}>{progress.level}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Jours joués</Text>
          <Text style={styles.statValue}>{progress.daysPlayed}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Pas aujourd'hui</Text>
          <Text style={styles.statValue}>{stepsToday}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Argent total</Text>
          <Text style={styles.statValue}>${stats.money}</Text>
        </View>
      </Card>

      <Card style={styles.actionsCard}>
        <Button
          title="Paramètres"
          onPress={() => {}}
          variant="outline"
          fullWidth
          icon={<Ionicons name="settings" size={20} color={colors.primary} />}
        />
        <Button
          title="Déconnexion"
          onPress={handleLogout}
          variant="ghost"
          fullWidth
          icon={<Ionicons name="log-out" size={20} color={colors.error} />}
          textStyle={{ color: colors.error }}
        />
      </Card>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statsCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  actionsCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    gap: spacing.md,
  },
});
