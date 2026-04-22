import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  const signIn = async () => {
    try {
      setUser({ name: 'Test User' });
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    try {
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return { user, signIn, signOut };
};
