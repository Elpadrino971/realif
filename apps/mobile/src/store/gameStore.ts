import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Avatar {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  skinTone: number;
  hairStyle: string;
  hairColor: string;
  faceShape: string;
  eyeShape: string;
  eyeColor: string;
  noseShape: string;
  mouthShape: string;
  bodyType: string;
}

export interface Stats {
  energy: number;
  maxEnergy: number;
  money: number;
  popularity: number;
  style: number;
  happiness: number;
}

export interface GameProgress {
  level: number;
  xp: number;
  nextLevelXp: number;
  daysPlayed: number;
  lastLoginDate: string;
}

interface GameState {
  avatar: Avatar | null;
  stats: Stats;
  progress: GameProgress;

  // IRL Tracking
  stepsToday: number;
  distanceToday: number; // in meters
  placesVisited: string[];

  // Actions
  initialize: () => Promise<void>;
  createAvatar: (avatar: Avatar) => void;
  updateStats: (stats: Partial<Stats>) => void;
  addEnergy: (amount: number) => void;
  spendEnergy: (amount: number) => boolean;
  addMoney: (amount: number) => void;
  spendMoney: (amount: number) => boolean;
  updateSteps: (steps: number) => void;
  addXP: (amount: number) => void;
}

const defaultStats: Stats = {
  energy: 100,
  maxEnergy: 100,
  money: 1000,
  popularity: 0,
  style: 0,
  happiness: 50,
};

const defaultProgress: GameProgress = {
  level: 1,
  xp: 0,
  nextLevelXp: 100,
  daysPlayed: 0,
  lastLoginDate: new Date().toISOString(),
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      avatar: null,
      stats: defaultStats,
      progress: defaultProgress,
      stepsToday: 0,
      distanceToday: 0,
      placesVisited: [],

      initialize: async () => {
        // Check daily login
        const lastLogin = new Date(get().progress.lastLoginDate);
        const today = new Date();
        const isNewDay = lastLogin.toDateString() !== today.toDateString();

        if (isNewDay) {
          set((state) => ({
            progress: {
              ...state.progress,
              daysPlayed: state.progress.daysPlayed + 1,
              lastLoginDate: today.toISOString(),
            },
            stats: {
              ...state.stats,
              energy: state.stats.maxEnergy, // Refill energy on new day
            },
            stepsToday: 0,
            distanceToday: 0,
            placesVisited: [],
          }));
        }
      },

      createAvatar: (avatar) => set({ avatar }),

      updateStats: (newStats) =>
        set((state) => ({
          stats: { ...state.stats, ...newStats },
        })),

      addEnergy: (amount) =>
        set((state) => ({
          stats: {
            ...state.stats,
            energy: Math.min(state.stats.energy + amount, state.stats.maxEnergy),
          },
        })),

      spendEnergy: (amount) => {
        const { stats } = get();
        if (stats.energy >= amount) {
          set((state) => ({
            stats: {
              ...state.stats,
              energy: state.stats.energy - amount,
            },
          }));
          return true;
        }
        return false;
      },

      addMoney: (amount) =>
        set((state) => ({
          stats: {
            ...state.stats,
            money: state.stats.money + amount,
          },
        })),

      spendMoney: (amount) => {
        const { stats } = get();
        if (stats.money >= amount) {
          set((state) => ({
            stats: {
              ...state.stats,
              money: state.stats.money - amount,
            },
          }));
          return true;
        }
        return false;
      },

      updateSteps: (steps) => {
        const previousSteps = get().stepsToday;
        const newSteps = steps - previousSteps;

        if (newSteps > 0) {
          // Reward: 1 energy per 100 steps
          const energyReward = Math.floor(newSteps / 100);
          if (energyReward > 0) {
            get().addEnergy(energyReward);
            get().addXP(energyReward);
          }

          set({
            stepsToday: steps,
            distanceToday: steps * 0.8, // ~0.8m per step
          });
        }
      },

      addXP: (amount) =>
        set((state) => {
          const newXP = state.progress.xp + amount;
          let { level, nextLevelXp } = state.progress;

          // Level up if reached threshold
          if (newXP >= nextLevelXp) {
            level += 1;
            nextLevelXp = Math.floor(nextLevelXp * 1.5); // 50% more XP each level

            // Level up rewards
            const maxEnergyIncrease = 10;
            return {
              progress: { ...state.progress, xp: newXP - state.progress.nextLevelXp, level, nextLevelXp },
              stats: {
                ...state.stats,
                maxEnergy: state.stats.maxEnergy + maxEnergyIncrease,
                energy: state.stats.maxEnergy + maxEnergyIncrease, // Full refill on level up
              },
            };
          }

          return {
            progress: { ...state.progress, xp: newXP },
          };
        }),
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
