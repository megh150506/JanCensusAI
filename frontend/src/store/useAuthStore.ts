import { create } from "zustand";

export type UserRole = "citizen" | "admin";

export interface UserProfile {
  id?: string;
  name: string;
  emailOrPhone: string;
  role: UserRole;
  avatarUrl?: string;
  state?: string;
  district?: string;
  isVerified?: boolean;
}

export interface AuthLoginData {
  name: string;
  emailOrPhone: string;
  role: UserRole;
  avatarUrl?: string;
  state?: string;
  district?: string;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (data: AuthLoginData) => void;
  loginAsCitizen: (phoneOrEmail: string, name?: string) => void;
  loginAsAdmin: (email: string, name?: string) => void;
  loginWithGoogle: (role: UserRole, customName?: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

const STORAGE_KEY = "jancensus_user";

// Helper to get initial state from localStorage safely
const getStoredAuth = () => {
  if (typeof window === "undefined") return { user: null, isAuthenticated: false, token: null };
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed?.user && parsed?.isAuthenticated) {
        return {
          user: parsed.user as UserProfile,
          isAuthenticated: true,
          token: parsed.token || "token_restored",
        };
      }
    }
  } catch (e) {
    console.error("Failed to parse stored auth", e);
  }
  return { user: null, isAuthenticated: false, token: null };
};

export const useAuthStore = create<AuthState>((set, get) => {
  const initial = getStoredAuth();

  return {
    user: initial.user,
    isAuthenticated: initial.isAuthenticated,
    token: initial.token,

    login: (data: AuthLoginData) => {
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name: data.name || (data.role === "admin" ? "Census Officer" : "Citizen User"),
        emailOrPhone: data.emailOrPhone,
        role: data.role,
        avatarUrl: data.avatarUrl || (data.role === "admin"
          ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"),
        state: data.state || "Maharashtra",
        district: data.district || "Pune",
        isVerified: true,
      };

      const token = `jwt_token_${Date.now()}`;
      const authPayload = { user: newUser, isAuthenticated: true, token };

      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authPayload));
      }

      set({
        user: newUser,
        isAuthenticated: true,
        token,
      });
    },

    loginAsCitizen: (phoneOrEmail: string, name = "Citizen") => {
      get().login({
        name,
        emailOrPhone: phoneOrEmail,
        role: "citizen",
      });
    },

    loginAsAdmin: (email: string, name = "Dr. Rajesh K. Varma") => {
      get().login({
        name,
        emailOrPhone: email || "admin@censusindia.gov.in",
        role: "admin",
      });
    },

    loginWithGoogle: (role: UserRole, customName?: string) => {
      get().login({
        name: customName || (role === "admin" ? "Dr. Sunita Rao (IAS)" : "Citizen User"),
        emailOrPhone: role === "admin" ? "sunita.rao@censusindia.gov.in" : "user@gmail.com",
        role,
        avatarUrl: "https://lh3.googleusercontent.com/a/default-user=s96-c",
      });
    },

    logout: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
      set({
        user: null,
        isAuthenticated: false,
        token: null,
      });
    },

    initializeAuth: () => {
      if (typeof window !== "undefined") {
        const stored = getStoredAuth();
        if (stored.user && stored.isAuthenticated) {
          set({
            user: stored.user,
            isAuthenticated: stored.isAuthenticated,
            token: stored.token,
          });
        }
      }
    },
  };
});

