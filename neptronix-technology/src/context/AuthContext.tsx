import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { authAPI } from '../services/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isMfaPending: boolean;
  pendingUser: User | null;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'MFA_PENDING'; payload: User }
  | { type: 'MFA_VERIFIED' }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  verifyMfa: (otp: string, generatedOtp: string) => boolean;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return { ...state, isLoading: true, error: null };
    
    case 'MFA_PENDING':
      return {
        ...state,
        pendingUser: action.payload,
        isMfaPending: true,
        isLoading: false,
        error: null
      };

    case 'MFA_VERIFIED':
      return {
        ...state,
        user: state.pendingUser,
        isAuthenticated: true,
        isMfaPending: false,
        pendingUser: null,
        isLoading: false,
        error: null
      };

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isMfaPending: false,
        pendingUser: null,
        isLoading: false,
        error: null
      };
    
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isMfaPending: false,
        pendingUser: null,
        isLoading: false,
        error: null
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const hasToken = !!localStorage.getItem('authToken');
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isMfaPending: false,
    pendingUser: null,
    isLoading: hasToken,
    error: null
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(savedUser) });
        } catch {
          localStorage.removeItem('user');
        }
      }
      authAPI.me()
        .then(({ user }) => dispatch({ type: 'LOGIN_SUCCESS', payload: normalizeUser(user) }))
        .catch(() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          dispatch({ type: 'LOGOUT' });
        })
        .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
    } else {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(savedUser) });
        } catch {
          localStorage.removeItem('user');
        }
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const { token, user } = await authAPI.login(email, password);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(normalizeUser(user)));
      dispatch({ type: 'LOGIN_SUCCESS', payload: normalizeUser(user) });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Invalid email or password';
      dispatch({ type: 'LOGIN_FAILURE', payload: msg });
    }
  };

  const verifyMfa = (otp: string, generatedOtp: string): boolean => {
    if (otp === generatedOtp && state.pendingUser) {
      localStorage.setItem('user', JSON.stringify(state.pendingUser));
      dispatch({ type: 'MFA_VERIFIED' });
      return true;
    }
    return false;
  };

  const normalizeUser = (u: Record<string, unknown>): User => ({
    id: (u._id ?? u.id) as string,
    email: u.email as string,
    firstName: u.firstName as string,
    lastName: u.lastName as string,
    phone: (u.phone as string) ?? '',
    addresses: (u.addresses as User['addresses']) ?? [],
    paymentMethods: (u.paymentMethods as User['paymentMethods']) ?? [],
    wishlist: (u.wishlist as string[]) ?? [],
    orders: (u.orders as User['orders']) ?? [],
    createdAt: (u.createdAt as string) ?? new Date().toISOString(),
    isAdmin: (u.isAdmin as boolean) ?? false,
  });

  const register = async (userData: RegisterData) => {
    dispatch({ type: 'REGISTER_START' });
    try {
      const { token, user } = await authAPI.register(userData);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(normalizeUser(user)));
      dispatch({ type: 'REGISTER_SUCCESS', payload: normalizeUser(user) });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'REGISTER_FAILURE', payload: msg });
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      // Also sync to backend if token present
      if (localStorage.getItem('authToken')) {
        authAPI.updateProfile(userData).catch(() => {});
      }
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        verifyMfa,
        register,
        logout,
        updateUser,
        clearError
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
