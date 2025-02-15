
// utils/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged } from '@/lib/firebase';
import type { User } from 'firebase/auth';
import { UserProfile } from '../../types/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
}

// utils/validation.ts
export const validateProfileData = (data: Partial<UserProfile>) => {
  const errors: Record<string, string> = {};

  if (!data.name?.trim()) errors.name = 'Name is required';
  if (!data.college?.trim()) errors.college = 'College is required';
  if (!data.semester?.trim()) errors.semester = 'Semester is required';
  if (!data.enrollment?.trim()) errors.enrollment = 'Enrollment number is required';
  if (!data.course?.trim()) errors.course = 'Course is required';

  // Validate social links if provided
  if (data.socialLinks) {
    const { linkedin, github, twitter } = data.socialLinks;
    const urlPattern = /^https?:\/\/.+/;

    if (linkedin && !urlPattern.test(linkedin)) {
      errors['socialLinks.linkedin'] = 'Invalid LinkedIn URL';
    }
    if (github && !urlPattern.test(github)) {
      errors['socialLinks.github'] = 'Invalid GitHub URL';
    }
    if (twitter && !urlPattern.test(twitter)) {
      errors['socialLinks.twitter'] = 'Invalid Twitter URL';
    }
  }

  return errors;
};
