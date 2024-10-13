<template>
    <div class="bg-zen min-h-screen py-12">
      <div class="container mx-auto px-4">
        <h1 v-motion="{ initial: { opacity: 0, y: -50 }, enter: { opacity: 1, y: 0 } }" 
            class="text-4xl font-serif text-earth mb-8 text-center">
          Bonsaïs {{ categoryTitle }}
        </h1>
  
        <div v-if="loading" class="text-center text-stone text-xl">
          <p>Chargement de nos précieux bonsaïs...</p>
        </div>
  
        <div v-else-if="error" class="text-center text-red-500">
          {{ error }}
        </div>
  
        <div v-else-if="products.length === 0" class="text-center text-stone text-xl">
          <p>Aucun bonsaï {{ categoryTitle.toLowerCase() }} n'est disponible pour le moment.</p>
          <p class="mt-4">Nous travaillons à enrichir notre collection. Revenez bientôt !</p>
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
  import { ref, onMounted, computed } from 'vue'
  import { collection, query, where, getDocs } from 'firebase/firestore'
  import { useCartStore } from '~/stores/cart'
  
  const props = defineProps({
    category: {
      type: String,
      required: true,
      validator: (value) => ['interieur', 'exterieur'].includes(value)
    }
  })
  
  const { $db } = useNuxtApp()
  const cartStore = useCartStore()
  
  const products = ref([])
  const loading = ref(true)
  const error = ref(null)
  
  const categoryTitle = computed(() => props.category === 'interieur' ? "d'intérieur" : "d'extérieur")
  
  onMounted(async () => {
    try {
      console.log("Chargement des produits pour la catégorie:", props.category)
      const q = query(
        collection($db, 'products'), 
        where('category', '==', props.category.toLowerCase())
      )
      const querySnapshot = await getDocs(q)
      console.log("Nombre de produits trouvés:", querySnapshot.size)
      products.value = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log("Catégorie du produit:", data.category);
        return {
          id: doc.id,
          ...data
        };
      })
      console.log("Produits chargés:", products.value)
    } catch (err) {
      console.error("Erreur lors du chargement des produits:", err)
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