// hooks/useAvatar.ts
import { useState, useEffect } from 'react';

export interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  category: 'professional' | 'casual' | 'artistic' | 'custom';
}

const defaultAvatars: Avatar[] = [
  {
    id: 'prof-1',
    name: 'Business Professional',
    imageUrl: '/avatars/professional-1.svg',
    description: 'Perfect for corporate and business profiles',
    category: 'professional'
  },
  {
    id: 'art-1',
    name: 'Creative Spirit',
    imageUrl: '/avatars/artistic-1.svg',
    description: 'Express your artistic side',
    category: 'artistic'
  },
  // Add more default avatars...
];

export const useAvatar = (initialAvatarId?: string) => {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [avatars, setAvatars] = useState<Avatar[]>(defaultAvatars);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAvatars = async () => {
      setIsLoading(true);
      try {
        // In a real app, you might fetch from an API
        // For now, we'll use the default avatars
        if (initialAvatarId) {
          const avatar = defaultAvatars.find(a => a.id === initialAvatarId);
          setSelectedAvatar(avatar || null);
        }
        setAvatars(defaultAvatars);
      } catch (error) {
        console.error('Error loading avatars:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAvatars();
  }, [initialAvatarId]);

  const selectAvatar = (avatarId: string) => {
    const avatar = avatars.find(a => a.id === avatarId);
    setSelectedAvatar(avatar || null);
  };

  return {
    selectedAvatar,
    avatars,
    isLoading,
    selectAvatar
  };
};