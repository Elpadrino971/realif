// Re-export all types
export type { Avatar, Stats, GameProgress } from '../store/gameStore';
export type { User } from '../store/authStore';
export type {
  InventoryItem,
  ClothingItem,
  ItemRarity,
  ItemCategory,
} from '../store/inventoryStore';
export type { HealthData } from '../services/healthKit';

// Common types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Event types for real-time features
export interface GameEvent {
  id: string;
  type: 'party' | 'fashion_show' | 'battle' | 'challenge';
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  participants: number;
  maxParticipants?: number;
  rewards: EventReward[];
}

export interface EventReward {
  type: 'money' | 'xp' | 'item' | 'energy';
  amount?: number;
  itemId?: string;
}

// Social types
export interface Friend {
  id: string;
  username: string;
  avatarUrl?: string;
  level: number;
  popularityScore: number;
  isOnline: boolean;
  lastSeen?: string;
}

export interface SocialInteraction {
  id: string;
  type: 'like' | 'comment' | 'gift' | 'challenge';
  fromUserId: string;
  toUserId: string;
  content?: string;
  createdAt: string;
}

// Career/Job types
export interface Job {
  id: string;
  title: string;
  category: 'service' | 'creative' | 'business' | 'influencer';
  level: number;
  baseSalary: number;
  energyCost: number;
  duration: number; // in minutes
  requirements: {
    minLevel?: number;
    minPopularity?: number;
    minStyle?: number;
  };
}

export interface JobShift {
  id: string;
  jobId: string;
  userId: string;
  startTime: string;
  endTime: string;
  earnings: number;
  completed: boolean;
}
