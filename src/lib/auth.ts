// lib/auth.ts
import { auth } from '@/lib/firebase';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
    }
  )
);