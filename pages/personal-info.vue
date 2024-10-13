<template>
    <div class="container mx-auto p-4 bg-mint-100 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold mb-6 text-green-800">Informations personnelles</h1>
      <form @submit.prevent="submitPersonalInfo" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nom complet</label>
          <input type="text" id="name" v-model="personalInfo.name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50">
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="personalInfo.email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50">
        </div>
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700">Adresse</label>
          <input type="text" id="address" v-model="personalInfo.address" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50">
        </div>
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
          <input type="tel" id="phone" v-model="personalInfo.phone" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50">
        </div>
        <button type="submit" class="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
          Continuer vers le paiement
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const personalInfo = ref({
    name: '',
    email: '',
    address: '',
    phone: ''
  })
  
  const submitPersonalInfo = () => {
    // Ici, vous pouvez sauvegarder les informations personnelles dans un store ou les envoyer à votre backend
    console.log('Informations personnelles:', personalInfo.value)
    // Rediriger vers la page de paiement
    router.push('/checkout')
  }
  </script>
  
  <style scoped>
  .bg-mint-100 {
    background-color: #e6fff0;
  }
  </style>