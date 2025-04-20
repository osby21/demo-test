<template>
    <footer class="bg-gray-800 text-white py-12 mt-20">
      <div class="container max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          <!-- Columna 1: Contacto -->
          <div class="mb-8 md:mb-0">
            <h3 class="text-xl font-bold mb-4 text-primary">Contáctanos</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <i class="fas fa-map-marker-alt mr-2 text-gray-400"></i>
                <span>123 Calle Principal, Ciudad</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-phone mr-2 text-gray-400"></i>
                <span>+1 234 567 890</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-envelope mr-2 text-gray-400"></i>
                <a href="mailto:info@tienda.com" class="hover:text-primary transition">info@tienda.com</a>
              </li>
            </ul>
          </div>
  
          <!-- Columna 2: Enlaces rápidos -->
          <div class="mb-8 md:mb-0">
            <h3 class="text-xl font-bold mb-4 text-primary">Enlaces útiles</h3>
            <ul class="space-y-2">
              <li>
                <RouterLink to="/published/web" class="hover:text-primary transition">Sobre nosotros</RouterLink>
              </li>
              <li>
                <RouterLink to="/published/web" class="hover:text-primary transition">Preguntas frecuentes</RouterLink>
              </li>
              <li>
                <RouterLink to="/published/web" class="hover:text-primary transition">Términos y condiciones</RouterLink>
              </li>
              <li>
                <RouterLink to="/published/web" class="hover:text-primary transition">Política de privacidad</RouterLink>
              </li>
            </ul>
          </div>
  
          <!-- Columna 3: Medios de pago -->
          <div class="mb-8 md:mb-0">
            <h3 class="text-xl font-bold mb-4 text-primary">Medios de pago</h3>
            <div class="grid grid-cols-3 gap-4">
              <img src="@/assets/payment/visa.svg" alt="Visa" class="h-12 object-contain opacity-80 hover:opacity-100 transition">
              <img src="@/assets/payment/mastercard.svg" alt="Mastercard" class="h-12 object-contain opacity-80 hover:opacity-100 transition">
              <img src="@/assets/payment/paypal.png" alt="PayPal" class="h-12 object-contain opacity-80 hover:opacity-100 transition">
              <img src="@/assets/payment/amex.svg" alt="American Express" class="h-12 object-contain opacity-80 hover:opacity-100 transition">
              <img src="@/assets/payment/bitcoin.svg" alt="Bitcoin" class="h-12 object-contain opacity-80 hover:opacity-100 transition">
              <img src="@/assets/payment/bank-transfer.svg" alt="Transferencia bancaria" class="h-12 object-contain opacity-80 hover:opacity-100 transition">
            </div>
          </div>
  
          <!-- Columna 4: Redes sociales -->
          <div>
            <h3 class="text-xl font-bold mb-4 text-primary">Síguenos</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-2xl hover:text-primary transition">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="#" class="text-2xl hover:text-primary transition">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="text-2xl hover:text-primary transition">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="text-2xl hover:text-primary transition">
                <i class="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
  
        <!-- Derechos de autor -->
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Tienda Online. Todos los derechos reservados.</p>
          <p class="mt-2">Desarrollado por [Tu Empresa]</p>
        </div>
      </div>
    </footer>
</template>
  
  <script setup lang="ts">
  import { RouterLink } from 'vue-router';
  </script>
  
  <style scoped>
  /* Efecto hover personalizado para los iconos */
  .fa-facebook:hover { color: #1877f2; }
  .fa-instagram:hover { color: #e4405f; }
  .fa-twitter:hover { color: #1da1f2; }
  .fa-linkedin:hover { color: #0a66c2; }
  </style>