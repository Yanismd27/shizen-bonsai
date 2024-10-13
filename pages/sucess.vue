<template>
  <div class="container mx-auto p-4 bg-mint-100 rounded-lg shadow-md text-center">
    <h1 class="text-3xl font-bold mb-6 text-green-800">Paiement réussi !</h1>
    <p class="text-xl text-gray-700 mb-4">Merci pour votre achat.</p>
    <p v-if="orderId" class="text-lg text-gray-600 mb-6">Numéro de commande : {{ orderId }}</p>
    <NuxtLink 
      to="/" 
      class="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      Retour à l'accueil
    </NuxtLink>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart';
import { ref, onMounted } from 'vue';

const cartStore = useCartStore();
const orderId = ref('');

onMounted(() => {
  // Récupérer l'ID de commande depuis l'URL ou le store
  const urlParams = new URLSearchParams(window.location.search);
  orderId.value = urlParams.get('session_id') || '';
  
  // Vider le panier
  cartStore.clearCart();
});
</script>

<style scoped>
.bg-mint-100 {
  background-color: #e6fff0;
}
</style>