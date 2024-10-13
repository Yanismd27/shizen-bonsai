<template>
  <div>
    <Transition name="fade">
      <LoadingScreen v-if="isLoading" />
    </Transition>
    <div v-show="!isLoading" class="min-h-screen bg-zen">
      <header class="bg-earth text-zen shadow-md">
        <nav class="container mx-auto px-4 py-3">
          <div class="flex justify-between items-center">
            <NuxtLink to="/" class="text-2xl font-serif"> 盆栽 Shizen Bonsai</NuxtLink>
            <div class="flex items-center space-x-6">
              <NuxtLink to="/" class="hover:text-sand transition-colors duration-200">Accueil</NuxtLink>
              <div class="relative">
                <NuxtLink to="/cart" class="hover:text-sand transition-colors duration-200">
                  Panier ({{ cartStore.totalItems }})
                </NuxtLink>
                <ClientOnly>
                  <div
                    v-if="showCartAnimation"
                    v-motion="{
                      initial: { opacity: 0, scale: 0.5 },
                      enter: { opacity: 1, scale: 1, transition: { duration: 300 } },
                      leave: { opacity: 0, scale: 0.5, transition: { duration: 300 } }
                    }"
                    class="absolute -top-2 -right-2 bg-leaf text-zen rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    +1
                  </div>
                </ClientOnly>
              </div>
              <ClientOnly>
                <template v-if="authStore.user">
                  <NuxtLink to="/profile" class="hover:text-sand transition-colors duration-200">Profil</NuxtLink>
                  <button @click="handleSignOut" class="hover:text-sand transition-colors duration-200">Déconnexion</button>
                </template>
                <template v-else>
                  <NuxtLink to="/login" class="hover:text-sand transition-colors duration-200">Connexion</NuxtLink>
                  <NuxtLink to="/register" class="hover:text-sand transition-colors duration-200">Inscription</NuxtLink>
                </template>
              </ClientOnly>
            </div>
          </div>
        </nav>
      </header>

      <main class="container mx-auto py-8 px-4">
        <NuxtPage />
      </main>

      <footer class="bg-earth text-zen mt-12">
        <div class="container mx-auto py-6 px-4 text-center">
          <p>&copy; 2023 Shizen Bonsai. Cultivez votre paix intérieure.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'
import LoadingScreen from '~/components/LoadingScreen.vue'

const authStore = useAuthStore()
const cartStore = useCartStore()

const showCartAnimation = ref(false)
const isLoading = ref(true)

watch(() => cartStore.totalItems, (newValue, oldValue) => {
  if (newValue > oldValue) {
    showCartAnimation.value = true
    setTimeout(() => {
      showCartAnimation.value = false
    }, 1000)
  }
})

const handleSignOut = async () => {
  try {
    await authStore.signOut()
    console.log("Déconnexion réussie, état de l'utilisateur:", authStore.user)
    navigateTo('/')
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error)
  }
}

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 4000) // 3 secondes pour correspondre à la durée de l'animation
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>