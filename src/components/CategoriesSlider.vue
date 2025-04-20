<template>
    <div class="categories-slider-container relative mb-8">
        <!-- Botón izquierdo -->
    <button
        @click="scroll('left')"
        class="nav-button left-0"
        :class="{ 'opacity-0': !showLeftButton }"
    >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
    </button>
    <!-- Contenedor del slider -->
    <div
      ref="slider"
      class="flex overflow-x-auto pb-4 gap-6 px-4 scrollbar-hide"
      @scroll="handleScroll"
    >
        <!-- Skeleton Loading -->
        <div v-if="isLoading" class="flex overflow-x-auto pb-4 gap-6 px-4">
            <div 
            v-for="n in 5" 
            :key="n"
            class="category-card flex-shrink-0 cursor-pointer"
            >
            <div class="image-container skeleton-loader animate-pulse">
                <div class="w-full h-full bg-gray-200 rounded-full"></div>
            </div>
            <div class="skeleton-label">
                <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
            </div>
        </div>
        <!-- Categorías reales -->
        <div 
            v-else
            class="flex overflow-x-auto pb-4 gap-6 px-4"
            ref="slider"
        >
        <div class="flex overflow-x-auto pb-4 gap-6 px-4" ref="slider">
            <!-- Tarjeta "Todos" -->
            <div 
            @click="selectCategory(null)"
            class="category-card flex-shrink-0 cursor-pointer"
            :class="{ 'active-category-card': !selectedCategory }"
            >
            <div class="image-container rounded-full overflow-hidden bg-gray-100">
                <img 
                src="@/assets/categories/default.png" 
                alt="Todas las categorías"
                class="w-full h-full object-cover"
                />
            </div>
            <span class="category-label">Todos</span>
            </div>
    
            <!-- Tarjetas de categorías -->
            <div
            v-for="category in uniqueCategories"
            :key="category"
            @click="selectCategory(category)"
            class="category-card flex-shrink-0 cursor-pointer"
            :class="{ 'active-category-card': selectedCategory === category }"
            >
            <div class="image-container rounded-full overflow-hidden bg-gray-100">
                <img 
                :src="getCategoryImage(category)" 
                :alt="category"
                class="w-full h-full object-cover"
                />
            </div>
            <span class="category-label">{{ category }}</span>
            </div>
        </div>
        </div>
    </div>
    <!-- Botón derecho -->
    <button
      @click="scroll('right')"
      class="nav-button right-0 absolute top-1/2 -translate-y-1/2 z-10"
      :class="{ 'opacity-0': !showRightButton }"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { useProductsStore } from '@/stores/products';
    import { storeToRefs } from 'pinia';
  
    const productsStore = useProductsStore();
    const { uniqueCategories, selectedCategory, isLoading } = storeToRefs(productsStore);
    const slider = ref<HTMLElement>();
    const showLeftButton = ref(false);
    const showRightButton = ref(true);
    const scrollStep = ref(300);

    const scroll = (direction: 'left' | 'right') => {
    if (!slider.value) return;
    
    const currentScroll = slider.value.scrollLeft;
    const newPosition = direction === 'left' 
        ? Math.max(0, currentScroll - scrollStep.value)
        : currentScroll + scrollStep.value;

    slider.value.scrollTo({
        left: newPosition,
        behavior: 'smooth'
    });
    };

    const handleScroll = () => {
    if (slider.value) {
        const { scrollLeft, scrollWidth, clientWidth } = slider.value;
        showLeftButton.value = scrollLeft > 0;
        showRightButton.value = scrollLeft < scrollWidth - clientWidth - 1;
    }
    };
    onMounted(() => {
        if (slider.value) {
            slider.value.addEventListener('scroll', handleScroll);
        }
        });

    onBeforeUnmount(() => {
        if (slider.value) {
            slider.value.removeEventListener('scroll', handleScroll);
        }
        });
  // Mapeo de categorías a imágenes (ajusta según tus necesidades)
  interface CategoryImageMap {
        [key: string]: string; // Firma de índice
        "men's clothing": string;
        "jewelery": string;
        "electronics": string;
        "women's clothing": string;
    }

    const categoryImages: CategoryImageMap = {
        "men's clothing": "men's clothing.svg",
        "jewelery": "jewelery.svg",
        "electronics": "electronics.svg",
        "women's clothing": "women's clothing.svg",
        
    };
   
const getCategoryImage = (category: string) => {
  const imageName = categoryImages[category] || 'default.png';
  return new URL(`/src/assets/categories/${imageName}`, import.meta.url).href;
};
  const selectCategory = (category: string | null) => {
    productsStore.setSelectedCategory(category);
  };
  </script>
  
  <style scoped>
  .nav-button {
    @apply absolute top-1/2 -translate-y-1/2 z-10 
           bg-white dark:bg-gray-800 shadow-lg rounded-full 
           p-3 hover:bg-gray-100 dark:hover:bg-gray-700 
           transition-all duration-300 transform 
           hover:scale-110 focus:outline-none
           max-md:hidden;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  /* Animación de aparición de botones */
  .nav-button {
    opacity: 0.7;
    transition: opacity 0.3s, transform 0.2s;
  }
  
  .nav-button:hover {
    opacity: 1;
  }
  
  .group:hover .nav-button {
    opacity: 0.7;
  }
  .skeleton-loader {
    @apply relative overflow-hidden;
    
    &::after {
      @apply absolute inset-0 -translate-x-full;
      content: '';
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      animation: skeleton-shimmer 1.5s infinite;
    }
  }
  
  @keyframes skeleton-shimmer {
    100% {
      transform: translateX(100%);
    }
  }
  
  .image-container.skeleton-loader {
    @apply border-gray-200 bg-gray-200;
  }
  
  .skeleton-label {
    @apply mt-2 h-4 w-full;
    
    div {
      @apply bg-gray-200 rounded;
    }
  }
  .image-container {
    @apply w-[150px] h-[150px] min-w-[150px] mx-auto mb-2 
           rounded-full overflow-hidden border-4 border-transparent
           shadow-md hover:shadow-lg transition-all duration-300;
  }
  
  /* Estilos para la imagen */
  .category-image {
    @apply w-full h-full object-cover object-center;
  }
  
  /* Tamaños responsivos */
  @media (max-width: 640px) {
    .image-container {
      @apply w-[120px] h-[120px] min-w-[120px];
    }
  }
  
  /* Clase para mantener consistencia en las tarjetas */
  .category-card {
    @apply flex flex-col items-center w-[180px] min-w-[180px] 
           px-2 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 
           rounded-xl transition-colors;
  }
  
  /* Tamaño responsivo para tarjetas en móviles */
  @media (max-width: 640px) {
    .category-card {
      @apply w-[140px] min-w-[140px];
    }
  }
  </style>
