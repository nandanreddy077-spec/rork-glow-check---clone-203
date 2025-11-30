import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
  };
};

type AuthContextType = {
  user: User | null;
  session: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('auth_user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        const defaultUser: User = {
          id: 'default_user',
          email: 'user@example.com',
          user_metadata: {
            full_name: 'Champion'
          }
        };
        setUser(defaultUser);
        await AsyncStorage.setItem('auth_user', JSON.stringify(defaultUser));
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('auth_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session: user ? { user } : null,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
