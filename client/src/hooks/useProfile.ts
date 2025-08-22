import { useState } from 'react';
import type { User } from '../types';
import { userService } from '../services/userService';

export function useProfile(initialProfile?: User | null) {
  const [profile, setProfile] = useState<User | null>(initialProfile || userService.getProfile());
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string>('');

  const handleProfileUpdate = async (profileData: Partial<User>) => {
    setIsUpdating(true);
    setUpdateError('');
    try {
      const updated = await userService.updateProfile(profileData);
      setProfile(prev => ({ ...prev, ...updated } as User));
    } catch (err: any) {
      setUpdateError(err.message || 'Profile update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    profile,
    setProfile,
    isUpdating,
    updateError,
    handleProfileUpdate,
  };
} 