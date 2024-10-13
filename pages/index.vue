<template>
  <div>
    <LoadingScreen v-if="isLoading" />
    <div v-else class="bg-zen min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center mb-16">
          <h1 v-motion="{ initial: { opacity: 0, y: -50 }, enter: { opacity: 1, y: 0 } }"
              class="text-5xl font-serif text-earth mb-4">Bienvenue chez Shizen Bonsai</h1>
          <p v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1, transition: { delay: 300 } } }"
             class="text-stone text-xl">Découvrez l'art du bonsaï et cultivez votre propre oasis de tranquillité</p>
        </div>

        <!-- Introduction au catalogue et à la vidéo -->
        <div class="mb-16 text-center">
          <h2 class="text-3xl font-serif text-earth mb-4">Notre univers Bonsaï</h2>
          <div class="flex flex-col md:flex-row justify-center items-center gap-8">
            <div class="md:w-1/2 bg-sand bg-opacity-20 p-6 rounded-lg">
              <h3 class="text-2xl font-semibold mb-2 text-earth">Découvrez notre catalogue</h3>
              <p class="text-stone mb-4">Explorez notre sélection de bonsaïs d'intérieur, d'extérieur et nos accessoires de qualité.</p>
              <a href="#catalogue" class="bg-earth text-zen py-2 px-4 rounded hover:bg-opacity-90 transition-colors duration-200">
                Voir le catalogue
              </a>
            </div>
            <div class="md:w-1/2 bg-leaf bg-opacity-20 p-6 rounded-lg">
              <h3 class="text-2xl font-semibold mb-2 text-earth">Apprenez l'art du Bonsaï</h3>
              <p class="text-stone mb-4">Regardez notre vidéo pour découvrir les secrets de l'entretien des bonsaïs.</p>
              <a href="#train-your-bonsai" class="bg-earth text-zen py-2 px-4 rounded hover:bg-opacity-90 transition-colors duration-200">
                Voir la vidéo
              </a>
            </div>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Left sidebar -->
          <aside class="lg:w-1/4">
            <div v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0 } }"
                 class="bg-sand bg-opacity-20 p-6 rounded-lg sticky top-4">
              <h2 class="text-2xl font-serif text-earth mb-4">Collections</h2>
              <ul class="space-y-2 text-stone">
                <li>
                  <NuxtLink to="/bonsais-interieur" class="hover:text-earth transition-colors duration-200 cursor-pointer">
                    Bonsaïs d'intérieur
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/bonsais-exterieur" class="hover:text-earth transition-colors duration-200 cursor-pointer">
                    Bonsaïs d'extérieur
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/outils-accessoires" class="hover:text-earth transition-colors duration-200 cursor-pointer">
                    Outils et accessoires
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </aside>

          <!-- Main content: Product grid and video section -->
          <div class="lg:w-3/4">
            <!-- Product grid -->
            <section id="catalogue" class="mb-16">
              <h2 class="text-3xl font-serif text-earth mb-8">Notre catalogue</h2>
              <div v-if="loading" class="text-center text-stone">
                <p>Chargement de notre collection zen...</p>
              </div>
              <div v-else-if="error" class="text-center text-red-500">
                {{ error }}
              </div>
              <div v-else-if="products.length === 0" class="text-center text-stone">
                <p>Notre jardin zen est en cours de préparation. Revenez bientôt.</p>
              </div>
              <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProductCard
                  v-for="product in products"
                  :key="product.id"
                  :product="product"
                  v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0 } }"
                />
              </div>
            </section>

            <!-- Video Section -->
            <section id="train-your-bonsai" class="bg-gradient-to-br from-earth to-leaf text-zen p-8 rounded-3xl shadow-2xl overflow-hidden relative">
              <div class="absolute inset-0 bg-bonsai-pattern opacity-10"></div>
              <div class="relative z-10">
                <h2 class="text-4xl font-bold mb-8 text-center">Cultivez votre Bonsaï intérieur</h2>
                <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div class="video-container w-full lg:w-2/3 rounded-2xl overflow-hidden shadow-lg">
                    <div class="relative pt-percentage" style="padding-top: 56.25%;">
                      <iframe
                        class="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/vihWettcK_c"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                  <div class="content w-full lg:w-1/3 bg-zen bg-opacity-90 p-6 rounded-2xl shadow-inner">
                    <h3 class="text-2xl font-semibold mb-4 text-earth">L'art du Bonsaï</h3>
                    <p class="mb-4 text-earth">
                      Découvrez les secrets de l'entretien des bonsaïs dans cette vidéo captivante. 
                      Apprenez à créer et maintenir votre propre jardin miniature, symbole de paix et d'harmonie.
                    </p>
                    <ul class="list-none mb-4 space-y-2">
                      <li class="flex items-center text-earth">
                        <span class="mr-2 text-leaf">🍃</span> Techniques d'arrosage précises
                      </li>
                      <li class="flex items-center text-earth">
                        <span class="mr-2 text-leaf">☀️</span> Gestion de l'exposition solaire
                      </li>
                      <li class="flex items-center text-earth">
                        <span class="mr-2 text-leaf">✂️</span> Art de la taille et de la mise en forme
                      </li>
                      <li class="flex items-center text-earth">
                        <span class="mr-2 text-leaf">🌱</span> Secrets de fertilisation
                      </li>
                      <li class="flex items-center text-earth">
                        <span class="mr-2 text-leaf">🪴</span> Techniques de rempotage expertes
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Le script reste inchangé
import { ref, onMounted } from 'vue'
import { collection, getDocs, query, where } from 'firebase/firestore'
import ProductCard from '~/components/ProductCard.vue'
import LoadingScreen from '~/components/LoadingScreen.vue'
import { useAuthStore } from '~/stores/auth'

const { $db } = useNuxtApp()
const products = ref([])
const loading = ref(true)
const error = ref(null)
const isLoading = ref(true)

const authStore = useAuthStore()

onMounted(async () => {
  console.log("Début du chargement des produits")
  try {
    if (!$db) {
      throw new Error("La connexion à Firestore n'est pas initialisée")
    }
    const q = query(collection($db, 'products'), where('category', 'in', ['interieur', 'exterieur']))
    const querySnapshot = await getDocs(q)
    console.log("Nombre de produits récupérés:", querySnapshot.size)
    products.value = querySnapshot.docs.map(doc => {
      const data = doc.data()
      console.log("Produit chargé:", doc.id, data)
      return {
        id: doc.id,
        ...data,
        image: data.image || '/img/bonsai-placeholder.jpg'
      }
    })
    console.log("Tous les produits chargés:", products.value)
  } catch (err) {
    console.error("Erreur lors du chargement des produits:", err)
    error.value = `Erreur lors du chargement des produits: ${err.message}`
  } finally {
    loading.value = false
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }
})
</script>