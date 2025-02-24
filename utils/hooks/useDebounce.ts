
  // utils/hooks/useDebounce.ts
  import { useState, useEffect } from 'react';
  
  export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  }
  
  // firebase/functions/createSearchableFields.ts
  export function createSearchableFields(user: UserInfo): string[] {
    const searchableFields = new Set<string>();
  
    // Add name words
    if (user.name) {
      user.name.toLowerCase().split(' ').forEach(word => {
        searchableFields.add(word);
      });
    }
  
    // Add email parts
    if (user.email) {
      const [localPart] = user.email.split('@');
      localPart.toLowerCase().split(/[.-_]/).forEach(part => {
        searchableFields.add(part);
      });
    }
  
    // Add skills
    user.skills?.forEach(skill => {
      skill.toLowerCase().split(' ').forEach(word => {
        searchableFields.add(word);
      });
    });
  
    // Add college words
    if (user.college) {
      user.college.toLowerCase().split(' ').forEach(word => {
        searchableFields.add(word);
      });
    }
  
    // Add course words
    if (user.course) {
      user.course.toLowerCase().split(' ').forEach(word => {
        searchableFields.add(word);
      });
    }
  
    return Array.from(searchableFields);
  }