import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore } from '@/store/gameStore';
import { useInventoryStore } from '@/store/inventoryStore';
import { Card } from '@/components/Card';
import { StatBar } from '@/components/StatBar';
import { Button } from '@/components/Button';
import { colors } from '@/theme/colors';
import { spacing, borderRadius } from '@/theme/spacing';
import { healthKitService } from '@/services/healthKit';

export default function HomeScreen() {
  const router = useRouter();
  const { avatar, stats, progress, updateSteps } = useGameStore();
  const { getTotalStyleBonus } = useInventoryStore();

  useEffect(() => {
    // Fetch today's steps and update rewards
    const fetchSteps = async () => {
      const steps = await healthKitService.getTodaySteps();
      updateSteps(steps);
    };

    fetchSteps();
    // Refresh every 5 minutes
    const interval = setInterval(fetchSteps, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const totalStyle = stats.style + getTotalStyleBonus();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Bonjour,</Text>
            <Text style={styles.username}>{avatar?.name || 'Player'}</Text>
          </View>
          <View style={styles.levelBadge}>
            <Ionicons name="star" size={20} color={colors.energy} />
            <Text style={styles.levelText}>Niv. {progress.level}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Avatar Preview */}
      <Card style={styles.avatarCard} variant="glass">
        <View style={styles.avatarPreview}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={100} color={colors.primary} />
          </View>
          <Button
            title="Personnaliser"
            onPress={() => router.push('/avatar/customize')}
            variant="outline"
            size="small"
          />
        </View>
      </Card>

      {/* Stats */}
      <Card style={styles.statsCard}>
        <Text style={styles.sectionTitle}>Tes Stats</Text>
        <View style={styles.statsContainer}>
          <StatBar
            label="Énergie"
            value={stats.energy}
            maxValue={stats.maxEnergy}
            color="energy"
            icon={<Ionicons name="flash" size={16} color={colors.energy} />}
          />
          <StatBar
            label="Style"
            value={totalStyle}
            maxValue={100}
            color="primary"
            showNumbers={false}
            icon={<Ionicons name="shirt" size={16} color={colors.primary} />}
          />
          <StatBar
            label="Popularité"
            value={stats.popularity}
            maxValue={100}
            color="secondary"
            showNumbers={false}
            icon={<Ionicons name="people" size={16} color={colors.secondary} />}
          />
        </View>
      </Card>

      {/* Money & XP */}
      <View style={styles.resourcesRow}>
        <Card style={styles.resourceCard} variant="gradient">
          <Ionicons name="cash" size={24} color={colors.money} />
          <Text style={styles.resourceLabel}>Argent</Text>
          <Text style={styles.resourceValue}>${stats.money}</Text>
        </Card>
        <Card style={styles.resourceCard} variant="gradient">
          <Ionicons name="trending-up" size={24} color={colors.accent} />
          <Text style={styles.resourceLabel}>XP</Text>
          <Text style={styles.resourceValue}>
            {progress.xp}/{progress.nextLevelXp}
          </Text>
        </Card>
      </View>

      {/* Quick Actions */}
      <Card style={styles.actionsCard}>
        <Text style={styles.sectionTitle}>Actions Rapides</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/(game)/style')}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.actionGradient}
            >
              <Ionicons name="shirt" size={32} color={colors.text} />
              <Text style={styles.actionText}>Gacha</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/(game)/social')}
          >
            <LinearGradient
              colors={[colors.secondary, colors.primaryDark]}
              style={styles.actionGradient}
            >
              <Ionicons name="people" size={32} color={colors.text} />
              <Text style={styles.actionText}>Soirée</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/(game)/career')}
          >
            <LinearGradient
              colors={[colors.money, '#00CC70']}
              style={styles.actionGradient}
            >
              <Ionicons name="briefcase" size={32} color={colors.text} />
              <Text style={styles.actionText}>Bosser</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={[colors.accent, '#00A8CC']}
              style={styles.actionGradient}
            >
              <Ionicons name="home" size={32} color={colors.text} />
              <Text style={styles.actionText}>Maison</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Daily Mission Placeholder */}
      <Card style={styles.missionsCard} variant="glass">
        <Text style={styles.sectionTitle}>Missions du Jour</Text>
        <Text style={styles.comingSoon}>Coming soon...</Text>
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
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: colors.text,
    opacity: 0.8,
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.glass,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  avatarCard: {
    marginHorizontal: spacing.lg,
    marginTop: -40,
  },
  avatarPreview: {
    alignItems: 'center',
    gap: spacing.md,
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
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
  statsContainer: {
    gap: spacing.md,
  },
  resourcesRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  resourceCard: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  resourceLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  resourceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  actionsCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  actionButton: {
    width: '47%',
    aspectRatio: 1,
  },
  actionGradient: {
    flex: 1,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  missionsCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  comingSoon: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
});
