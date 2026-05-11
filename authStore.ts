import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/api";

interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  role: string;
  avatar_url?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setTokens: (access: string, refresh: string, user: User) => void;
  fetchMe: () => Promise<void>;
}

interface RegisterData {
  email: string;
  username: string;
  full_name: string;
  password: string;
  role?: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      isAuthenticated: false,

      setTokens: (access, refresh, user) => {
        set({ accessToken: access, refreshToken: refresh, user, isAuthenticated: true });
        api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      },

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post("/api/v1/auth/login", { email, password });
          get().setTokens(data.access_token, data.refresh_token, data.user);
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (registerData) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post("/api/v1/auth/register", registerData);
          get().setTokens(data.access_token, data.refresh_token, data.user);
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
        delete api.defaults.headers.common["Authorization"];
      },

      fetchMe: async () => {
        try {
          const { data } = await api.get("/api/v1/auth/me");
          set({ user: data, isAuthenticated: true });
        } catch {
          get().logout();
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.accessToken) {
          api.defaults.headers.common["Authorization"] = `Bearer ${state.accessToken}`;
        }
      },
    }
  )
);
