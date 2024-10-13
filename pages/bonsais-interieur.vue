<template>
    <div class="bg-zen min-h-screen py-12">
      <div class="container mx-auto px-4">
        <h1 v-motion="{ initial: { opacity: 0, y: -50 }, enter: { opacity: 1, y: 0 } }" 
            class="text-4xl font-serif text-earth mb-8 text-center">
          Bonsaïs d'intérieur
        </h1>
        
        <p v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1, transition: { delay: 300 } } }" 
           class="text-stone text-lg text-center mb-12">
          Découvrez notre collection de bonsaïs parfaits pour embellir votre espace intérieur
        </p>
  
        <div v-if="loading" class="text-center text-stone text-xl">
          <p>Nous préparons soigneusement votre sélection de bonsaïs...</p>
        </div>
        
        <div v-else-if="error" class="text-center text-red-500">
          {{ error }}
        </div>
        
        <div v-else-if="products.length === 0" class="text-center text-stone text-xl">
          <p>Nos bonsaïs d'intérieur sont en train de s'épanouir.</p>
          <p class="mt-4">Revenez bientôt pour découvrir notre nouvelle collection !</p>
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="product in products" :key="product.id"
               v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0 } }"
               class="bg-sand bg-opacity-10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <NuxtLink :to="`/products/${product.id}`" class="block">
              <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"/>
              <div class="p-6">
                <h2 class="text-2xl font-semibold text-earth mb-2">{{ product.name }}</h2>
                <p class="text-stone mb-4 line-clamp-2">{{ product.description }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-leaf text-xl font-bold">{{ product.price }} €</span>
                  <button @click.prevent="addToCart(product)" 
                          class="bg-leaf text-zen px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors duration-300">
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { collection, query, where, getDocs } from 'firebase/firestore'
  import { useCartStore } from '~/stores/cart'
  
  const { $db } = useNuxtApp()
  const cartStore = useCartStore()
  
  const products = ref([])
  const loading = ref(true)
  const error = ref(null)
  
  onMounted(async () => {
    try {
      console.log("Chargement des bonsaïs d'intérieur")
      const q = query(collection($db, 'products'), where('category', '==', 'interieur'))
      const querySnapshot = await getDocs(q)
      console.log("Nombre de bonsaïs d'intérieur trouvés:", querySnapshot.size)
      products.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      console.log("Bonsaïs d'intérieur chargés:", products.value)
    } catch (err) {
      console.error("Erreur lors du chargement des bonsaïs d'intérieur:", err)
      error.value = "Une erreur est survenue lors du chargement des bonsaïs."
    } finally {
      loading.value = false
    }
  })
  
  const addToCart = (product) => {
    cartStore.addItem(product)
    alert(`${product.name} a été ajouté à votre panier !`)
  }
  </script>