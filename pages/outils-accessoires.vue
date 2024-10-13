<template>
    <div class="bg-zen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 v-motion="{ initial: { opacity: 0, y: -50 }, enter: { opacity: 1, y: 0 } }"
            class="text-4xl font-serif text-earth mb-8 text-center">Outils et Accessoires</h1>
        
        <p v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1, transition: { delay: 300 } } }"
           class="text-stone text-lg text-center mb-12">
          Découvrez notre sélection d'outils et d'accessoires pour prendre soin de vos bonsaïs
        </p>
  
        <div v-if="loading" class="text-center text-stone">
          <p>Chargement de nos outils et accessoires...</p>
        </div>
        
        <div v-else-if="error" class="text-center text-red-500">
          {{ error }}
        </div>
        
        <div v-else-if="products.length === 0" class="text-center text-stone">
          <p>Nous préparons actuellement notre collection d'outils et d'accessoires. Revenez bientôt !</p>
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0 } }"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { collection, getDocs, query, where } from 'firebase/firestore'
  import ProductCard from '~/components/ProductCard.vue'
  
  const { $db } = useNuxtApp()
  const products = ref([])
  const loading = ref(true)
  const error = ref(null)
  
  onMounted(async () => {
    console.log("Début du chargement des outils et accessoires")
    try {
      if (!$db) {
        throw new Error("La connexion à Firestore n'est pas initialisée")
      }
      const q = query(collection($db, 'products'), where('category', '==', 'outil'))
      const querySnapshot = await getDocs(q)
      console.log("Nombre d'outils et accessoires récupérés:", querySnapshot.size)
      products.value = querySnapshot.docs.map(doc => {
        const data = doc.data()
        console.log("Produit chargé:", doc.id, data)
        return {
          id: doc.id,
          ...data,
          image: data.image || '/img/tool-placeholder.jpg'
        }
      })
      console.log("Tous les outils et accessoires chargés:", products.value)
    } catch (err) {
      console.error("Erreur lors du chargement des outils et accessoires:", err)
      error.value = `Erreur lors du chargement des outils et accessoires: ${err.message}`
    } finally {
      loading.value = false
    }
  })
  </script>