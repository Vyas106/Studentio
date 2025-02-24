

// hooks/useUserStats.ts
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface UserStats {
  followers: number;
  following: number;
  posts: number;
  projects: number;
}

export const useUserStats = (userId: string) => {
  const [stats, setStats] = useState<UserStats>({
    followers: 0,
    following: 0,
    posts: 0,
    projects: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRef = doc(db, "users", userId);
    
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setStats({
          followers: data.followers?.length || 0,
          following: data.following?.length || 0,
          posts: data.createdPosts?.length || 0,
          projects: data.createdProjects?.length || 0
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return { stats, loading };
};