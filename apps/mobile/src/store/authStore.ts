import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, username: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => set({ user, isAuthenticated: true }),

      setToken: (token) => set({ token }),

      login: async (email: string, password: string) => {
        try {
          // TODO: Implement actual API call
          // const response = await authAPI.login(email, password);

          // Mock for now
          const mockUser: User = {
            id: '1',
            email,
            username: 'Player',
            createdAt: new Date().toISOString(),
          };

          set({
            user: mockUser,
            token: 'mock-token',
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },

      register: async (email: string, username: string, password: string) => {
        try {
          // TODO: Implement actual API call
          // const response = await authAPI.register(email, username, password);

          // Mock for now
          const mockUser: User = {
            id: '1',
            email,
            username,
            createdAt: new Date().toISOString(),
          };

          set({
            user: mockUser,
            token: 'mock-token',
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Registration failed:', error);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoading = false;
        }
      },
    }
  )
);
