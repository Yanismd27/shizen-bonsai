<template>
  <div class="container mx-auto p-8 bg-zen">
    <h1 class="text-4xl font-serif mb-10 text-earth text-center">Votre Jardin Zen</h1>
    <div v-if="cartStore.items.length > 0">
      <div v-for="item in cartStore.items" :key="item.id" class="mb-6">
        <div
          @click="toggleItem(item.id)"
          class="relative overflow-hidden rounded-xl shadow-md cursor-pointer transform transition-all duration-500 ease-in-out hover:shadow-lg"
          :class="{ 'scale-101': expandedItem === item.id }"
          :style="{ minHeight: expandedItem === item.id ? '280px' : '100px' }"
        >
          <div 
            class="absolute inset-0 bg-gradient-to-r from-leaf via-earth to-sand opacity-70 transition-all duration-500"
            :class="{ 'opacity-80': expandedItem === item.id }"
          ></div>
          <div class="relative z-10 p-6 h-full flex flex-col justify-between text-zen">
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-semibold tracking-wide">{{ item.name }}</h2>
              <span class="transform transition-transform duration-300" :class="{ 'rotate-180': expandedItem === item.id }">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
            <div 
              v-show="expandedItem === item.id" 
              class="mt-4 opacity-0 transition-all duration-500 transform translate-y-2"
              :class="{ 'opacity-100 translate-y-0': expandedItem === item.id }"
            >
              <p class="text-lg mb-2">Prix unitaire: {{ item.price }} €</p>
              <p class="text-lg mb-2">Quantité: {{ item.quantity }}</p>
              <p class="text-lg mb-4">{{ item.description }}</p>
              <div class="flex justify-between items-center">
                <button 
                  @click.stop="cartStore.removeItem(item.id)" 
                  class="bg-zen text-earth px-4 py-2 rounded-full text-sm font-bold transition duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-md"
                >
                  Retirer du panier
                </button>
                <p class="text-xl font-bold">Total: {{ (item.price * item.quantity).toFixed(2) }} €</p>
              </div>
            </div>
            <div v-if="expandedItem !== item.id" class="flex justify-end items-center">
              <p class="text-xl font-bold">Total: {{ (item.price * item.quantity).toFixed(2) }} €</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 text-center">
        <p class="text-3xl font-serif mb-6 text-earth">Total du panier: {{ cartStore.totalPrice.toFixed(2) }} €</p>
        <button
          @click="proceedToCheckout"
          class="bg-gradient-to-r from-leaf to-earth text-zen font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out text-xl shadow-md hover:shadow-lg hover:scale-105 transform"
        >
          Cultiver votre achat
        </button>
      </div>
    </div>
    <p v-else class="text-xl text-stone text-center">Votre jardin zen est en attente de plantation.</p>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-zen p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 class="text-2xl font-serif mb-6 text-earth text-center">Choisissez votre chemin</h2>
        <button @click="goToLogin" class="w-full bg-leaf text-zen py-3 px-6 rounded-full mb-4 hover:bg-opacity-90 transition duration-300 text-lg font-bold">
          Se connecter à votre jardin
        </button>
        <button @click="goToPersonalInfo" class="w-full bg-sand text-earth py-3 px-6 rounded-full hover:bg-opacity-90 transition duration-300 text-lg font-bold">
          Créer un nouveau chemin
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const showModal = ref(false)
const expandedItem = ref(null)

const toggleItem = (itemId) => {
  if (expandedItem.value === itemId) {
    expandedItem.value = null
  } else {
    expandedItem.value = itemId
  }
}

const proceedToCheckout = () => {
  if (authStore.user) {
    router.push('/checkout')
  } else {
    showModal.value = true
  }
}

const goToLogin = () => {
  showModal.value = false
  router.push('/login?redirect=checkout')
}

const goToPersonalInfo = () => {
  showModal.value = false
  router.push('/personal-info')
}
</script>

<style scoped>
.scale-101 {
  transform: scale(1.01);
}
</style>