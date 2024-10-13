<template>
    <div class="bg-zen min-h-screen py-8">
      <div v-if="product" class="container mx-auto px-4">
        <NuxtLink to="/" class="inline-block mb-8 text-earth hover:text-leaf transition-colors duration-200">
          <span class="text-2xl">←</span> Retour à l'accueil
        </NuxtLink>
        <div class="flex flex-wrap -mx-4">
          <div class="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <img :src="product.image" :alt="product.name" class="w-full rounded-lg shadow-lg">
          </div>
          <div class="w-full md:w-1/2 px-4">
            <h1 class="text-3xl font-serif text-earth mb-4">{{ product.name }}</h1>
            <p class="text-xl text-stone mb-4">Prix : {{ product.price }} €</p>
            <p class="text-stone mb-6">{{ product.description }}</p>
            <p class="text-stone mb-2">Catégorie : {{ product.category }}</p>
            <p class="text-stone mb-6">En stock : {{ product.stock }}</p>
            <button @click="addToCart" class="bg-leaf text-zen px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors duration-200 shadow-md">
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
      <div v-else class="container mx-auto px-4 text-center">
        <p class="text-stone text-lg">Nous préparons votre bonsaï avec soin...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { doc, getDoc } from 'firebase/firestore'
  import { useNuxtApp } from '#app'
  import { useCartStore } from '~/stores/cart'
  
  const route = useRoute()
  const router = useRouter()
  const { $db } = useNuxtApp()
  const product = ref(null)
  const cartStore = useCartStore()
  
  onMounted(async () => {
    const productId = route.params.id
    console.log("ID du produit:", productId)
  
    try {
      const productRef = doc($db, 'products', productId)
      console.log("Tentative de récupération du produit")
      const docSnap = await getDoc(productRef)
  
      if (docSnap.exists()) {
        product.value = { id: docSnap.id, ...docSnap.data() }
        console.log("Produit trouvé:", product.value)
      } else {
        console.log("Aucun produit trouvé avec cet ID")
      }
    } catch (error) {
      console.error("Erreur lors du chargement du produit:", error)
    }
  })
  
  const addToCart = () => {
    cartStore.addItem(product.value)
    console.log('Produit ajouté au panier:', product.value)
    alert('Votre bonsaï a été ajouté à votre jardin zen (panier) !')
    router.push('/cart')
  }
  </script>