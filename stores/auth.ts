// stores/auth.ts
import { defineStore } from 'pinia';

interface User {
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    login(username: string, password: string) {
      const mockUser: User = {
        username: 'admin',
      };

      if (username === mockUser.username && password === '123456') {
        this.user = mockUser;
        this.isAuthenticated = true;
      } else {
        throw new Error('Email ou senha inválida');
      }
    },
    logout() {
      this.user = null;
      return this.isAuthenticated = false;
    }
  },
  getters: {
    loginAuthenticated: (state) => state.isAuthenticated,
    loginExit: (state) => state.isAuthenticated,
  },
});
