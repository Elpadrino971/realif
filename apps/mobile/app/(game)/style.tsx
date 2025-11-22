import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore } from '@/store/gameStore';
import { useInventoryStore } from '@/store/inventoryStore';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { colors } from '@/theme/colors';
import { spacing, borderRadius } from '@/theme/spacing';
import { gachaService } from '@/services/gachaService';

export default function StyleScreen() {
  const { stats, spendMoney, addXP } = useGameStore();
  const { items, addItem } = useInventoryStore();
  const [isPulling, setIsPulling] = useState(false);

  const prices = gachaService.getPrices();

  const handleSinglePull = async () => {
    if (stats.money < prices.single) {
      Alert.alert('Pas assez d\'argent', `Il te faut $${prices.single} pour tirer.`);
      return;
    }

    const success = spendMoney(prices.single);
    if (!success) return;

    setIsPulling(true);

    // Simulate gacha animation delay
    setTimeout(() => {
      const item = gachaService.pullSingle();
      addItem(item);
      addXP(10);

      setIsPulling(false);

      Alert.alert(
        `${item.rarity.toUpperCase()}!`,
        `Tu as obtenu : ${item.name}\n+${item.stats?.style || 0} Style`,
        [{ text: 'Cool! 🔥' }]
      );
    }, 1500);
  };

  const handleMultiPull = async () => {
    if (stats.money < prices.multi) {
      Alert.alert('Pas assez d\'argent', `Il te faut $${prices.multi} pour un x10.`);
      return;
    }

    const success = spendMoney(prices.multi);
    if (!success) return;

    setIsPulling(true);

    // Simulate gacha animation delay
    setTimeout(() => {
      const pulledItems = gachaService.pullMultiple(10);
      pulledItems.forEach((item) => addItem(item));
      addXP(100);

      setIsPulling(false);

      const rarityCount = pulledItems.reduce((acc, item) => {
        acc[item.rarity] = (acc[item.rarity] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const message = Object.entries(rarityCount)
        .map(([rarity, count]) => `${count}x ${rarity}`)
        .join('\n');

      Alert.alert('x10 Pull Résultat!', message, [{ text: 'Voir l\'inventaire' }]);
    }, 2000);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return colors.common;
      case 'rare':
        return colors.rare;
      case 'epic':
        return colors.epic;
      case 'legendary':
        return colors.legendary;
      default:
        return colors.text;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Style Gacha</Text>
        <Text style={styles.headerSubtitle}>Collectionne des fringues exclusives</Text>
      </LinearGradient>

      {/* Money Display */}
      <Card style={styles.moneyCard} variant="glass">
        <Ionicons name="cash" size={32} color={colors.money} />
        <View>
          <Text style={styles.moneyLabel}>Ton argent</Text>
          <Text style={styles.moneyValue}>${stats.money}</Text>
        </View>
      </Card>

      {/* Gacha Buttons */}
      <Card style={styles.gachaCard}>
        <Text style={styles.sectionTitle}>Tire ton item</Text>

        <View style={styles.gachaOption}>
          <View style={styles.gachaInfo}>
            <Ionicons name="shirt" size={40} color={colors.primary} />
            <View>
              <Text style={styles.gachaTitle}>Single Pull</Text>
              <Text style={styles.gachaPrice}>${prices.single}</Text>
            </View>
          </View>
          <Button
            title="Tirer x1"
            onPress={handleSinglePull}
            disabled={isPulling || stats.money < prices.single}
            loading={isPulling}
            variant="primary"
            size="small"
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.gachaOption}>
          <View style={styles.gachaInfo}>
            <Ionicons name="gift" size={40} color={colors.legendary} />
            <View>
              <Text style={styles.gachaTitle}>x10 Pull</Text>
              <Text style={styles.gachaPrice}>${prices.multi}</Text>
              <Text style={styles.gachaBonus}>+1 Rare garanti!</Text>
            </View>
          </View>
          <Button
            title="Tirer x10"
            onPress={handleMultiPull}
            disabled={isPulling || stats.money < prices.multi}
            loading={isPulling}
            variant="primary"
            size="small"
          />
        </View>
      </Card>

      {/* Drop Rates */}
      <Card style={styles.ratesCard} variant="glass">
        <Text style={styles.sectionTitle}>Taux de Drop</Text>
        <View style={styles.ratesList}>
          <View style={styles.rateItem}>
            <View style={[styles.rarityBadge, { backgroundColor: colors.common }]} />
            <Text style={styles.rateText}>Common - 60%</Text>
          </View>
          <View style={styles.rateItem}>
            <View style={[styles.rarityBadge, { backgroundColor: colors.rare }]} />
            <Text style={styles.rateText}>Rare - 30%</Text>
          </View>
          <View style={styles.rateItem}>
            <View style={[styles.rarityBadge, { backgroundColor: colors.epic }]} />
            <Text style={styles.rateText}>Epic - 9%</Text>
          </View>
          <View style={styles.rateItem}>
            <View style={[styles.rarityBadge, { backgroundColor: colors.legendary }]} />
            <Text style={styles.rateText}>Legendary - 1%</Text>
          </View>
        </View>
      </Card>

      {/* Recent Items */}
      <Card style={styles.inventoryCard}>
        <Text style={styles.sectionTitle}>Inventaire ({items.length})</Text>
        {items.length === 0 ? (
          <Text style={styles.emptyText}>Tire ton premier item!</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.itemsList}>
              {items.slice(0, 10).map((item) => (
                <TouchableOpacity key={item.id} style={styles.itemCard}>
                  <LinearGradient
                    colors={[getRarityColor(item.rarity), colors.surfaceLight]}
                    style={styles.itemGradient}
                  >
                    <Ionicons name="shirt-outline" size={32} color={colors.text} />
                    <Text style={styles.itemName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={[styles.itemRarity, { color: getRarityColor(item.rarity) }]}>
                      {item.rarity}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
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
    alignItems: 'center',
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
    marginTop: spacing.xs,
  },
  moneyCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  moneyLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  moneyValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  gachaCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  gachaOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  gachaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  gachaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  gachaPrice: {
    fontSize: 16,
    color: colors.money,
    fontWeight: '600',
  },
  gachaBonus: {
    fontSize: 12,
    color: colors.legendary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.glassBorder,
    marginVertical: spacing.sm,
  },
  ratesCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  ratesList: {
    gap: spacing.sm,
  },
  rateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rarityBadge: {
    width: 16,
    height: 16,
    borderRadius: borderRadius.sm,
  },
  rateText: {
    fontSize: 14,
    color: colors.text,
  },
  inventoryCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
  itemsList: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  itemCard: {
    width: 120,
    height: 140,
  },
  itemGradient: {
    flex: 1,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  itemName: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  itemRarity: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
