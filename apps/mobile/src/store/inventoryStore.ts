import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type ItemCategory = 'clothing' | 'accessory' | 'hair' | 'furniture' | 'vehicle';

export interface InventoryItem {
  id: string;
  name: string;
  category: ItemCategory;
  rarity: ItemRarity;
  imageUrl: string;
  description: string;
  isEquipped: boolean;
  acquiredAt: string;
  stats?: {
    style?: number;
    popularity?: number;
    energy?: number;
  };
}

export interface ClothingItem extends InventoryItem {
  category: 'clothing';
  slot: 'top' | 'bottom' | 'shoes' | 'outfit' | 'outerwear';
  style: string; // 'casual', 'formal', 'streetwear', 'luxury', etc.
}

interface InventoryState {
  items: InventoryItem[];
  equippedItems: Record<string, string>; // slot -> itemId

  // Actions
  addItem: (item: InventoryItem) => void;
  removeItem: (itemId: string) => void;
  equipItem: (itemId: string) => void;
  unequipItem: (itemId: string) => void;
  getItemsByCategory: (category: ItemCategory) => InventoryItem[];
  getItemsByRarity: (rarity: ItemRarity) => InventoryItem[];
  hasItem: (itemId: string) => boolean;
  getTotalStyleBonus: () => number;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      items: [],
      equippedItems: {},

      addItem: (item) =>
        set((state) => {
          // Check if item already exists
          if (state.items.find((i) => i.id === item.id)) {
            return state;
          }
          return {
            items: [...state.items, { ...item, acquiredAt: new Date().toISOString() }],
          };
        }),

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),

      equipItem: (itemId) =>
        set((state) => {
          const item = state.items.find((i) => i.id === itemId) as ClothingItem;
          if (!item || item.category !== 'clothing') return state;

          // Unequip previous item in same slot
          const slot = item.slot;
          const previousItemId = state.equippedItems[slot];

          const updatedItems = state.items.map((i) => {
            if (i.id === itemId) return { ...i, isEquipped: true };
            if (i.id === previousItemId) return { ...i, isEquipped: false };
            return i;
          });

          return {
            items: updatedItems,
            equippedItems: { ...state.equippedItems, [slot]: itemId },
          };
        }),

      unequipItem: (itemId) =>
        set((state) => {
          const item = state.items.find((i) => i.id === itemId) as ClothingItem;
          if (!item) return state;

          const slot = item.slot;
          const updatedEquipped = { ...state.equippedItems };
          delete updatedEquipped[slot];

          return {
            items: state.items.map((i) =>
              i.id === itemId ? { ...i, isEquipped: false } : i
            ),
            equippedItems: updatedEquipped,
          };
        }),

      getItemsByCategory: (category) =>
        get().items.filter((item) => item.category === category),

      getItemsByRarity: (rarity) =>
        get().items.filter((item) => item.rarity === rarity),

      hasItem: (itemId) => get().items.some((item) => item.id === itemId),

      getTotalStyleBonus: () => {
        const equippedItemIds = Object.values(get().equippedItems);
        const equippedItems = get().items.filter((item) =>
          equippedItemIds.includes(item.id)
        );

        return equippedItems.reduce((total, item) => {
          return total + (item.stats?.style || 0);
        }, 0);
      },
    }),
    {
      name: 'inventory-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
