<template>
    <div class="max-w-md mx-auto mt-10 p-8 bg-zen rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold mb-6 text-center text-earth">Inscription</h2>
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div class="relative w-full group">
          <label for="email" class="text-stone text-sm font-medium mb-1 block">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Votre email"
            class="w-full bg-transparent text-earth placeholder-stone border-b border-stone py-2 focus:outline-none focus:border-leaf transition-colors duration-300"
          >
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-leaf transition-all duration-300 group-hover:w-full"></span>
        </div>
        
        <div class="relative w-full group">
          <label for="password" class="text-stone text-sm font-medium mb-1 block">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Votre mot de passe"
            class="w-full bg-transparent text-earth placeholder-stone border-b border-stone py-2 focus:outline-none focus:border-leaf transition-colors duration-300"
          >
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-leaf transition-all duration-300 group-hover:w-full"></span>
        </div>
        
        <div class="relative w-full group">
          <label for="confirmPassword" class="text-stone text-sm font-medium mb-1 block">Confirmer le mot de passe</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="Confirmez votre mot de passe"
            class="w-full bg-transparent text-earth placeholder-stone border-b border-stone py-2 focus:outline-none focus:border-leaf transition-colors duration-300"
          >
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-leaf transition-all duration-300 group-hover:w-full"></span>
        </div>
  
        <div class="flex items-center mb-4">
          <input type="checkbox" id="terms" v-model="acceptTerms" required class="mr-2">
          <label for="terms" class="text-sm text-stone">J'accepte les conditions d'utilisation</label>
        </div>
        <div class="flex items-center mb-4">
          <input type="checkbox" id="privacy" v-model="acceptPrivacy" required class="mr-2">
          <label for="privacy" class="text-sm text-stone">J'accepte la politique de confidentialité</label>
        </div>
        <p v-if="successMessage" class="text-leaf mb-4">{{ successMessage }}</p>
        <p v-if="error || authStore.error" class="text-red-500 mb-4">{{ error || authStore.error }}</p>
        <button
          type="submit"
          class="w-full bg-leaf text-zen py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300"
          :disabled="authStore.loading"
        >
          {{ authStore.loading ? 'Inscription...' : "S'inscrire" }}
        </button>
      </form>
      <p class="mt-6 text-center text-sm text-stone">
        Déjà un compte ?
        <NuxtLink to="/login" class="text-leaf hover:underline">Se connecter</NuxtLink>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '~/stores/auth'
  import { useRouter } from 'vue-router'
  
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const acceptTerms = ref(false)
  const acceptPrivacy = ref(false)
  const error = ref(null)
  const successMessage = ref(null)
  const authStore = useAuthStore()
  const router = useRouter()
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }
  
  const validatePassword = (password) => {
    return password.length >= 8
  }
  
  const handleRegister = async () => {
    console.log("Tentative d'inscription")
    error.value = null
    successMessage.value = null
  
    if (!validateEmail(email.value)) {
      error.value = "L'adresse email n'est pas valide."
      return
    }
    if (!validatePassword(password.value)) {
      error.value = "Le mot de passe doit contenir au moins 8 caractères."
      return
    }
    if (password.value !== confirmPassword.value) {
      error.value = "Les mots de passe ne correspondent pas."
      return
    }
    if (!acceptTerms.value || !acceptPrivacy.value) {
      error.value = "Vous devez accepter les conditions d'utilisation et la politique de confidentialité."
      return
    }
  
    try {
      const result = await authStore.register(email.value, password.value)
      console.log("Inscription réussie")
      successMessage.value = result.message
      // Optionnel : rediriger vers une page de confirmation
      // router.push('/confirm-email')
    } catch (err) {
      console.error("Erreur d'inscription dans le composant:", err)
      error.value = err.message
    }
  }
  </script>