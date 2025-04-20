import { ref, computed } from 'vue';
import { defineStore } from "pinia";
import { ProductsService, type Product } from '@/services/productsService';
import Swal from 'sweetalert2'

export const useProductsStore = defineStore('products', () => {
  const productsService = new ProductsService();
  const products = ref<Product[]>([]);
  const product = ref<Product|null>(null);
  const isLoading = ref(false);
  const isProductLoading = ref(false);
  const error = ref<string | null>(null);
  let retryCount = 0;
  const maxRetries = 3;
  const selectedCategory = ref<string | null>(null);

  // Getters computados
  const filteredProducts = computed(() => {
    if (!selectedCategory.value) return products.value;
    return products.value.filter(p => p.category === selectedCategory.value);
  });

  const uniqueCategories = computed(() => {
    const categories = new Set(products.value.map(p => p.category));
    return Array.from(categories);
  });

  // Acciones
  const setSelectedCategory = (category: string | null) => {
    selectedCategory.value = category;
  };

  const fetchProducts = async () => {
    try {
        isLoading.value = true;
        error.value = null;
        products.value = await productsService.getProducts();
        if (!products.value) throw new Error('Error de conexión');
    } catch (err) {
        error.value = 'Error al cargar los productos';
        console.error(err);
        handleError(error.value);
    } finally {
        isLoading.value = false;
    }
  };
  
  const handleError = async(err: string) =>{
    retryCount++;
    error.value = err;

    if (retryCount <= maxRetries) {
      await showErrorAlert();
    } else {
      resetState();
    }
  };

  const showErrorAlert = async() => {
    const result = await Swal.fire({
      title: 'Error de conexión',
      html: `No se pudo conectar al servidor<br>
             Intentos restantes: ${maxRetries - retryCount + 1}/3`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Reintentar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      backdrop: true,
      customClass: {
        popup: 'connection-error-popup'
      }
    });

    if (result.isConfirmed) {
      await fetchProducts();
    } else {
      resetState();
    }
  }

  const resetState = () => {
    retryCount = 0;
  }

  const fetchProduct = async (id: string) => {
    try {
        isProductLoading.value = true;
        error.value = null;
        product.value = null;
        product.value = await productsService.getProduct(id);
    } catch (err) {
        error.value = 'Error al cargar el producto';
        console.error(err);
    } finally {
        isProductLoading.value = false;
    }
  }

  const searchProducts = async (query: string) => {
    try {
      isLoading.value = true;
      error.value = null;
      products.value = await productsService.searchProducts(query);
    } catch (err) {
      error.value = 'Error en la búsqueda';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    product,
    products,
    isLoading,
    isProductLoading,
    error,
    selectedCategory,
    filteredProducts,
    uniqueCategories,
    setSelectedCategory,
    fetchProduct,
    fetchProducts,
    searchProducts,
  }
}, {
  persist: true
});