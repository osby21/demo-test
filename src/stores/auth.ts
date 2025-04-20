// src/stores/auth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  actions: {
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      // Lógica adicional de logout aquí
    }
  }
});