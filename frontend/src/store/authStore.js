import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../services/api';

/**
 * Zustand Auth Store
 * Manages authentication state and operations
 */


export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: localStorage.getItem('token') || null,
      loading: false,
      isAuthenticated: !!localStorage.getItem('token'),
      userourses:[],
      error: null,

      // Actions
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await authAPI.login(email, password);

          const { user, token } = response.data;
          set({
            user,
            token,
            isAuthenticated: true,
            loading: false,
          });
          localStorage.setItem('token', token);
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.error || 'Login failed',
            loading: false,
          });
          throw error;
        }
      },

      register: async (firstName, lastName, email, password, role) => {
        set({ loading: true, error: null });
        try {
          const response = await authAPI.register({
            firstName,
            lastName,
            email,
            password,
            role,
          });

          const { user, token } = response.data;
          set({
            user,
            token,
            isAuthenticated: true,
            loading: false,
          });
          localStorage.setItem('token', token);
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.error || 'Registration failed',
            loading: false,
          });
          throw error;
        }
      },
      

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        localStorage.removeItem('token');
        setTimeout(() => {
              useAuthStore.persist.clearStorage();
        }, 0);
        
        
      },
       
       
      setUser: (user) => {
        set({ user });
      },

      setLoading: (loading) => {
        set({ loading });
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      fetchUser: async () => {
        set({ loading: true });
        try {
          const response = await authAPI.getCurrentUser();
          set({
            user: response.data.user,
            isAuthenticated: true,
            loading: false,
          });
          return response.data.user;
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: 'Failed to fetch user',
          });
          localStorage.removeItem('token');
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
