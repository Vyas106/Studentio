import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// lib/utils.ts
export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};
// // lib/utils.ts
// export const getInitials = (name: string) => {
//   return name
//     .split(' ')
//     .map(word => word[0])
//     .join('')
//     .toUpperCase();
// };