// userService.ts
// Centralized user profile and session management logic

import type { User } from '../types';

export const userService = {
  async updateProfile(profileData: Partial<User>): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In real app, call backend API and return updated user
    return { ...profileData } as User;
  },

  getProfile(): User | null {
    const storedUser = localStorage.getItem('somasmart_user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        localStorage.removeItem('somasmart_user');
      }
    }
    return null;
  },
}; 