import { nanoid } from 'nanoid';
import { ItemRarity, ClothingItem } from '@/store/inventoryStore';

interface GachaRates {
  common: number;
  rare: number;
  epic: number;
  legendary: number;
}

const DEFAULT_RATES: GachaRates = {
  common: 0.6,    // 60%
  rare: 0.3,      // 30%
  epic: 0.09,     // 9%
  legendary: 0.01, // 1%
};

// Mock clothing database
const CLOTHING_DATABASE: Omit<ClothingItem, 'id' | 'isEquipped' | 'acquiredAt'>[] = [
  // Common items
  { name: 'Basic White Tee', category: 'clothing', slot: 'top', rarity: 'common', style: 'casual', imageUrl: '', description: 'Simple white t-shirt', stats: { style: 5 } },
  { name: 'Blue Jeans', category: 'clothing', slot: 'bottom', rarity: 'common', style: 'casual', imageUrl: '', description: 'Classic blue jeans', stats: { style: 5 } },
  { name: 'White Sneakers', category: 'clothing', slot: 'shoes', rarity: 'common', style: 'casual', imageUrl: '', description: 'Clean white sneakers', stats: { style: 5 } },

  // Rare items
  { name: 'Designer Hoodie', category: 'clothing', slot: 'top', rarity: 'rare', style: 'streetwear', imageUrl: '', description: 'Trendy designer hoodie', stats: { style: 15, popularity: 5 } },
  { name: 'Leather Jacket', category: 'clothing', slot: 'outerwear', rarity: 'rare', style: 'streetwear', imageUrl: '', description: 'Classic leather jacket', stats: { style: 20, popularity: 10 } },
  { name: 'Cargo Pants', category: 'clothing', slot: 'bottom', rarity: 'rare', style: 'streetwear', imageUrl: '', description: 'Urban cargo pants', stats: { style: 15 } },

  // Epic items
  { name: 'Luxury Suit', category: 'clothing', slot: 'outfit', rarity: 'epic', style: 'luxury', imageUrl: '', description: 'High-end business suit', stats: { style: 40, popularity: 20 } },
  { name: 'Evening Dress', category: 'clothing', slot: 'outfit', rarity: 'epic', style: 'luxury', imageUrl: '', description: 'Elegant evening dress', stats: { style: 45, popularity: 25 } },
  { name: 'Designer Sneakers', category: 'clothing', slot: 'shoes', rarity: 'epic', style: 'luxury', imageUrl: '', description: 'Limited edition sneakers', stats: { style: 30, popularity: 15 } },

  // Legendary items
  { name: 'Runway Outfit', category: 'clothing', slot: 'outfit', rarity: 'legendary', style: 'luxury', imageUrl: '', description: 'Exclusive fashion week outfit', stats: { style: 100, popularity: 50, energy: 10 } },
  { name: 'Celebrity Collab', category: 'clothing', slot: 'outfit', rarity: 'legendary', style: 'luxury', imageUrl: '', description: 'Ultra-rare celebrity collaboration', stats: { style: 120, popularity: 60, energy: 15 } },
];

class GachaService {
  private rates: GachaRates = DEFAULT_RATES;

  /**
   * Determine rarity based on gacha rates
   */
  private rollRarity(): ItemRarity {
    const roll = Math.random();
    let cumulative = 0;

    for (const [rarity, rate] of Object.entries(this.rates)) {
      cumulative += rate;
      if (roll <= cumulative) {
        return rarity as ItemRarity;
      }
    }

    return 'common';
  }

  /**
   * Get a random item of specific rarity
   */
  private getRandomItemByRarity(rarity: ItemRarity): ClothingItem {
    const itemsOfRarity = CLOTHING_DATABASE.filter((item) => item.rarity === rarity);
    const randomItem = itemsOfRarity[Math.floor(Math.random() * itemsOfRarity.length)];

    return {
      ...randomItem,
      id: nanoid(),
      isEquipped: false,
      acquiredAt: new Date().toISOString(),
    };
  }

  /**
   * Perform a single gacha pull
   */
  pullSingle(): ClothingItem {
    const rarity = this.rollRarity();
    return this.getRandomItemByRarity(rarity);
  }

  /**
   * Perform multiple gacha pulls
   * 10-pull guarantees at least one rare or higher
   */
  pullMultiple(count: number): ClothingItem[] {
    const items: ClothingItem[] = [];

    for (let i = 0; i < count; i++) {
      items.push(this.pullSingle());
    }

    // 10-pull guarantee: at least one rare+
    if (count === 10) {
      const hasRareOrBetter = items.some((item) =>
        ['rare', 'epic', 'legendary'].includes(item.rarity)
      );

      if (!hasRareOrBetter) {
        // Replace the last item with a guaranteed rare+
        const guaranteedRarity = Math.random() < 0.9 ? 'rare' : 'epic';
        items[items.length - 1] = this.getRandomItemByRarity(guaranteedRarity);
      }
    }

    return items;
  }

  /**
   * Get gacha prices
   */
  getPrices() {
    return {
      single: 100,      // 100 coins
      multi: 900,       // 10 pulls for the price of 9
    };
  }

  /**
   * Set custom rates (for events, VIP, etc.)
   */
  setRates(rates: Partial<GachaRates>) {
    this.rates = { ...this.rates, ...rates };
  }

  /**
   * Reset to default rates
   */
  resetRates() {
    this.rates = DEFAULT_RATES;
  }
}

export const gachaService = new GachaService();
