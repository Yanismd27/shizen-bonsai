<template>
  <div class="group bg-zen rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
    <NuxtLink :to="`/products/${product.id}`" class="block">
      <div class="relative h-64 overflow-hidden">
        <img
          :src="imageSrc"
          :alt="product.name"
          class="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
          @error="handleImageError"
        >
        <div class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
      </div>
      <div class="p-4 bg-zen">
        <h3 class="text-earth text-lg font-semibold mb-2">{{ product.name }}</h3>
        <p class="text-stone">{{ formatPrice(product.price) }}</p>
      </div>
    </NuxtLink>
    <button
      @click="addToCartWithAnimation"
      class="w-full py-2 bg-leaf text-zen font-medium hover:bg-opacity-90 transition-colors duration-300"
    >
      Ajouter au panier
    </button>
    <ClientOnly>
      <Teleport to="body">
        <div
          v-if="showAnimation"
          class="fixed inset-0 flex items-center justify-center z-50"
          :class="{ 'backdrop-blur-sm': showAnimation }"
        >
          <div
            v-motion="{
              initial: { opacity: 0, scale: 0.5 },
              enter: { opacity: 1, scale: 1, transition: { duration: 300 } },
              leave: { opacity: 0, scale: 0.5, transition: { duration: 300 } }
            }"
            class="text-8xl"
          >
            🍃
          </div>
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'

const props = defineProps({
  product: Object
})

const cartStore = useCartStore()
const imageSrc = ref(props.product.image)
const showAnimation = ref(false)

const addToCartWithAnimation = () => {
  cartStore.addItem(props.product)
  console.log('Produit ajouté au panier:', props.product)
  showAnimation.value = true
  setTimeout(() => {
    showAnimation.value = false
  }, 1000)
}

const handleImageError = () => {
  console.log("Erreur de chargement de l'image, utilisation de l'image par défaut")
  imageSrc.value = '/img/bonsai-placeholder.jpg'
}

const formatPrice = (price) => {
  return `${Number(price).toFixed(2)} €`
}
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>