<template>
    <div class="max-w-md mx-auto mt-10 p-8 bg-zen rounded-lg shadow-md">
      <h2 class="text-3xl font-serif mb-8 text-earth text-center">Connexion</h2>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div v-for="field in fields" :key="field.id" class="relative group">
          <input
            :id="field.id"
            v-model="formData[field.id]"
            :type="field.type"
            :placeholder="field.placeholder"
            class="w-full bg-transparent text-earth placeholder-stone/50 border-b border-stone/30 py-3 px-1 focus:outline-none focus:border-leaf/50 transition-colors duration-300"
            required
          >
          <label :for="field.id" class="absolute left-1 -top-6 text-stone/80 text-sm transition-all duration-300">
            {{ field.label }}
          </label>
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-leaf transition-all duration-300 group-hover:w-full"></span>
        </div>
  
        <p v-if="authStore.error" class="text-red-500 text-sm mt-4">{{ authStore.error }}</p>
  
        <button
          type="submit"
          class="w-full bg-leaf text-zen py-3 px-4 rounded-md hover:bg-leaf/90 transition duration-300 mt-6"
          :disabled="authStore.loading"
        >
          {{ authStore.loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
  
      <div class="mt-6 space-y-3">
        <button @click="signInWithGoogle" 
          class="w-full bg-red-500 text-zen py-3 px-4 rounded-md hover:bg-red-600/90 transition duration-300"
          :disabled="authStore.loading">
          Se connecter avec Google
        </button>
        <button @click="signInAnonymously" 
          class="w-full bg-stone text-zen py-3 px-4 rounded-md hover:bg-stone/90 transition duration-300"
          :disabled="authStore.loading">
          Connexion anonyme
        </button>
      </div>
  
      <p class="mt-6 text-center text-sm text-stone/70">
        Pas encore de compte ?
        <NuxtLink to="/register" class="text-leaf hover:underline">S'inscrire</NuxtLink>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { useAuthStore } from '~/stores/auth'
  import { useRouter, useRoute } from 'vue-router'
  
  const authStore = useAuthStore()
  const router = useRouter()
  const route = useRoute()
  
  const fields = [
    { id: 'email', type: 'email', label: 'Email', placeholder: 'Votre email' },
    { id: 'password', type: 'password', label: 'Mot de passe', placeholder: 'Votre mot de passe' }
  ]
  
  const formData = reactive({
    email: '',
    password: ''
  })
  
  const handleLogin = async () => {
    try {
      await authStore.login(formData.email, formData.password)
      const redirectPath = route.query.redirect || '/'
      router.push(redirectPath)
    } catch (err) {
      console.error("Erreur de connexion dans le composant:", err)
    }
  }
  
  const signInWithGoogle = async () => {
    try {
      await authStore.signInWithGoogle()
      const redirectPath = route.query.redirect || '/'
      router.push(redirectPath)
    } catch (err) {
      console.error("Erreur lors de la connexion avec Google dans le composant:", err)
    }
  }
  
  const signInAnonymously = async () => {
    try {
      await authStore.signInAnonymously()
      const redirectPath = route.query.redirect || '/'
      router.push(redirectPath)
    } catch (err) {
      console.error("Erreur lors de la connexion anonyme dans le composant:", err)
    }
  }
  </script>