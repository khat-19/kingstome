import { createContext, useContext, useState, type ReactNode } from 'react';

export interface FrontendUser {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  program: string;
  educationLevel: string;
}

interface AuthContextValue {
  user: FrontendUser | null;
  signUp: (
    email: string,
    password: string,
    profile: Pick<FrontendUser, 'fullName' | 'phone' | 'program' | 'educationLevel'>,
  ) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FrontendUser | null>(null);

  const signUp = async (
    email: string,
    _password: string,
    profile: Pick<FrontendUser, 'fullName' | 'phone' | 'program' | 'educationLevel'>,
  ) => {
    setUser({ id: crypto.randomUUID(), email, ...profile });
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    void password;
    setUser({
      id: crypto.randomUUID(),
      email,
      fullName: email.split('@')[0] || 'Student',
      phone: '',
      program: '',
      educationLevel: '',
    });
    return { error: null };
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
