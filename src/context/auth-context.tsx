import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AuthStep, User, TinNpi } from '../shared/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface AuthState {
  authStep: AuthStep;
  user: User | null;
  isAuthenticated: boolean;
  selectedTin: TinNpi | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  selectTin: (tin: TinNpi) => void;
  verifyMfa: (code: string) => Promise<void>;
  logout: () => void;
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const MOCK_USER: User = {
  id: '1',
  firstName: 'Sarah',
  lastName: 'Chen',
  email: 'sarah.chen@acmehealth.com',
  role: 'admin',
};

/* ------------------------------------------------------------------ */
/*  Initial state                                                      */
/* ------------------------------------------------------------------ */

const initialState: AuthState = {
  authStep: 'login',
  user: null,
  isAuthenticated: false,
  selectedTin: null,
  loading: false,
};

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);

  const login = useCallback(async (_email: string, _password: string) => {
    setState((prev) => ({ ...prev, loading: true }));

    // Simulate async network request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setState((prev) => ({
      ...prev,
      user: MOCK_USER,
      authStep: 'tin-select',
      loading: false,
    }));
  }, []);

  const selectTin = useCallback((tin: TinNpi) => {
    setState((prev) => ({
      ...prev,
      selectedTin: tin,
      authStep: 'mfa',
    }));
  }, []);

  const verifyMfa = useCallback(async (_code: string) => {
    setState((prev) => ({ ...prev, loading: true }));

    // Simulate async MFA verification
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setState((prev) => ({
      ...prev,
      isAuthenticated: true,
      loading: false,
    }));
  }, []);

  const logout = useCallback(() => {
    setState(initialState);
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    selectTin,
    verifyMfa,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
