import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that merges Tailwind CSS classes
 * It combines clsx and tailwind-merge for powerful class name management
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}