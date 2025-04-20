<script setup lang="ts">
import { onMounted} from 'vue';
import { useProductsStore } from '@/stores/products';
import ProductCard from '@/components/ProductCard.vue';
import SkeletonCard from '@/components/SkeletonCard.vue';
import CategoriesSlider from '@/components/CategoriesSlider.vue'; 
import { storeToRefs } from 'pinia';

const productsStore = useProductsStore();
const { error, filteredProducts } = storeToRefs(productsStore);

onMounted(async () => {
  if (productsStore.products.length === 0) {
    await productsStore.fetchProducts();
  }
});

</script>

<template>
  <main class="container max-w-5xl mx-auto p-4 pb-8">

    <div class="text-sm breadcrumbs mb-6">
      <ul>
        <li><RouterLink to="/published/web/">Home</RouterLink></li>
        <li>Products</li> 
      </ul>
    </div>
    <CategoriesSlider />

    <!-- Estado de carga -->
    <div v-if="productsStore.isLoading" class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <SkeletonCard v-for="n in 6" :key="n" />
    </div>

    <!-- Error -->
    <div v-else-if="productsStore.error" class="alert alert-error mt-4">
      {{ productsStore.error }}
    </div>

    <!-- Mensaje final después de reintentos -->
    <div v-else-if="error" class="error-container">
      <div class="error-content">
        <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
        <h2 class="text-xl font-semibold mb-2">No se encontraron productos</h2>
        <p class="text-gray-600">Por favor verifica tu conexión a internet</p>
        <button 
          @click="productsStore.fetchProducts()"
          class="retry-button mt-4"
        >
          <i class="fas fa-redo mr-2"></i>
          Intentar nuevamente
        </button>
      </div>
    </div>
  
    <!-- Resultados -->
    <div v-else class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
    
  </main>
</template>
<style scoped>

</style>
