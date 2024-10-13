<template>
    <div class="container mx-auto p-8 bg-zen rounded-lg shadow-md max-w-md">
      <h1 class="text-3xl font-serif mb-6 text-earth text-center">Finaliser votre achat</h1>
      <div v-if="loading" class="text-center py-4 text-stone">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-leaf mx-auto mb-4"></div>
        Préparation de votre jardin zen...
      </div>
      <div v-else class="space-y-6">
        <div class="bg-white shadow-sm rounded-lg p-6">
          <h2 class="text-xl font-semibold text-earth mb-4">Résumé de votre commande</h2>
          <div class="space-y-2">
            <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between items-center">
              <span class="text-stone">{{ item.name }}</span>
              <span class="text-earth font-medium">{{ item.price }} € x {{ item.quantity }}</span>
            </div>
            <div class="border-t border-stone/20 pt-2 mt-2">
              <div class="flex justify-between items-center text-lg font-bold">
                <span class="text-earth">Total</span>
                <span class="text-leaf">{{ cartStore.totalPrice.toFixed(2) }} €</span>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="handlePayment"
          class="w-full bg-leaf text-zen py-3 px-4 rounded-md hover:bg-leaf/90 transition duration-300 flex items-center justify-center"
          :disabled="loading"
        >
          <span v-if="!loading">Cultiver votre achat</span>
          <span v-else class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Préparation en cours...
          </span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useCartStore } from '~/stores/cart'
  import { useAuthStore } from '~/stores/auth'
  
  const cartStore = useCartStore()
  const authStore = useAuthStore()
  const loading = ref(false)
  const { $initStripe } = useNuxtApp()
  
  const handlePayment = async () => {
    loading.value = true
    try {
      console.log("Début du processus de paiement")
      const { data } = await useFetch('/api/create-checkout-session', {
        method: 'POST',
        body: {
          items: cartStore.items,
          userId: authStore.user?.uid
        }
      })
  
      if (!data.value || !data.value.sessionId) {
        throw new Error("La session de paiement n'a pas pu être créée")
      }
  
      console.log("Session ID reçu:", data.value.sessionId)
  
      const stripe = await $initStripe()
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.value.sessionId
      })
  
      if (error) {
        throw error
      }
    } catch (error) {
      console.error("Erreur lors du paiement:", error)
      alert("Une erreur est survenue lors de la préparation du paiement. Veuillez réessayer.")
    } finally {
      loading.value = false
    }
  }
  </script>