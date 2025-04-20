<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import {
  Popover, PopoverButton, PopoverPanel
} from '@headlessui/vue';

import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth'; // Asume que tienes un store de autenticación
import { useCurrencyFormatter } from '@/composables/currencyFormatter';

const cartStore = useCartStore();
const authStore = useAuthStore();
const currencyFormatter = useCurrencyFormatter();

const { items, total } = storeToRefs(cartStore);
const searchQuery = ref('');
const handleLogout = () => {
  authStore.logout();
  // Redirigir a login si es necesario
};

const handleSearch = () => {
  //No implementado
};
</script>

<template>
<header class="navbar bg-base-100 shadow sticky top-0 left-0 z-10">
    <div class="flex items-center justify-center max-w-6xl w-full mx-auto">
      <!-- Logo y Menú Izquierdo -->
      <div class="flex-1 flex items-center gap-4">
        <img 
          src="@/assets/logo.svg" 
          alt="Logo empresa" 
          class="h-10 w-10 object-contain"
        />
        <RouterLink 
          to="/published/web/" 
          class="btn btn-ghost text-xl px-0.5 hover:bg-white font-medium"
        >
          Inicio
        </RouterLink>
        <!-- Barra de búsqueda -->
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar productos..."
          class="input input-bordered mb-4 w-full max-w-md"
          @input="handleSearch"     
        />
      </div>
      
      <!-- Menú Derecho -->
      <div class="flex-none flex items-center gap-4">
        <!-- Carrito -->
        <div class="dropdown dropdown-end mr-1">
          <Popover>
            <PopoverButton class="btn btn-ghost btn-circle outline-none">
              <div class="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="badge badge-sm indicator-item">{{ items.length }}</span>
              </div>
            </PopoverButton>

            <PopoverPanel v-slot="{ close }" class="dropdown-content card card-compact mt-4 z-[1] w-52 bg-base-100 shadow">
              <div class="card-body">
                <span class="font-bold text-lg">{{ items.length }} Items</span>
                <span class="text-info">Subtotal: {{ currencyFormatter.format(total) }}</span>
                <div class="card-actions">
                  <RouterLink class="btn btn-primary btn-block" to="/cart" @click="close()">View cart</RouterLink>
                </div>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
        <!-- Menú Usuario -->
        <div class="dropdown dropdown-end">
          <Popover>
            <PopoverButton class="btn btn-ghost btn-circle avatar outline-none">
              <div class="w-10 rounded-full">
                <img src="@/assets/user-avatar.svg" alt="Foto de perfil del usuario" />
              </div>
            </PopoverButton>

            <PopoverPanel class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-4">
              <ul class="flex flex-col gap-2">
                <li>
                  <RouterLink 
                    to="/profile" 
                    class="px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Ver Perfil
                  </RouterLink>
                </li>
                <li>
                  <button 
                    @click="handleLogout" 
                    class="px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors text-left w-full"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </PopoverPanel>
          </Popover>
        </div>
      </div>
    </div>
  </header>
</template>
