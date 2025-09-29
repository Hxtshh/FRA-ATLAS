import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'claimant' | 'district' | 'central' | 'public';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  district?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, User> = {
  'claimant@fra.gov': {
    id: '1',
    name: 'John Doe',
    email: 'claimant@fra.gov',
    role: 'claimant',
    district: 'Bastar'
  },
  'district@fra.gov': {
    id: '2',
    name: 'District Officer',
    email: 'district@fra.gov',
    role: 'district',
    district: 'Bastar'
  },
  'central@fra.gov': {
    id: '3',
    name: 'Central Authority',
    email: 'central@fra.gov',
    role: 'central'
  },
  'public@fra.gov': {
    id: '4',
    name: 'Public User',
    email: 'public@fra.gov',
    role: 'public'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('fra_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers[email];
    if (foundUser && foundUser.role === role) {
      setUser(foundUser);
      localStorage.setItem('fra_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fra_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};