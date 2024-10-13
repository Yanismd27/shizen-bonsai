<template>
    <div class="bg-zen min-h-screen py-12">
      <div v-if="authInitialized" class="container mx-auto px-4 max-w-4xl">
        <h1 v-motion="{ initial: { opacity: 0, y: -50 }, enter: { opacity: 1, y: 0 } }" 
            class="text-4xl font-serif text-earth mb-8 text-center">
          Votre Jardin Intérieur
        </h1>
        <div v-if="user" v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1 } }"
             class="bg-sand bg-opacity-10 shadow-lg rounded-2xl p-8 backdrop-blur-sm">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="(field, index) in profileFields" :key="field.icon"
                 v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0, transition: { delay: index * 100 } } }">
              <ProfileField 
                :icon="field.icon" 
                :label="field.label" 
                :value="field.value" 
                :editable="field.editable" 
                @update="field.updateFn"
              />
            </div>
          </div>
          <div class="mt-12 text-center">
            <button @click="saveChanges" 
                    v-motion="{ hover: { scale: 1.05 } }"
                    class="bg-leaf text-zen px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-md text-lg font-semibold">
              Cultiver les changements
            </button>
          </div>
        </div>
        <div v-else-if="loading" class="text-center text-stone">
          <p v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1 } }" class="text-xl">
            Nous préparons votre espace zen...
          </p>
        </div>
        <div v-else v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0 } }" 
             class="bg-sand bg-opacity-20 border-l-4 border-earth text-stone p-6 rounded-lg" role="alert">
          <p class="font-bold text-earth text-lg mb-2">Attention</p>
          <p>Veuillez vous connecter pour accéder à votre jardin intérieur.</p>
        </div>
      </div>
      <div v-else class="container mx-auto px-4 text-center text-stone">
        <p v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1 } }" class="text-xl">
          Nous préparons le terrain pour votre jardin zen...
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useAuthStore } from '~/stores/auth'
  import ProfileField from '~/components/ProfileField.vue'
  
  const authStore = useAuthStore()
  const { user, loading } = storeToRefs(authStore)
  
  const authInitialized = ref(false)
  let unsubscribe = null
  
  onMounted(() => {
    unsubscribe = watch([user, loading], ([newUser, newLoading]) => {
      console.log('User:', newUser)
      console.log('Loading:', newLoading)
      if (!newLoading) {
        authInitialized.value = true
      }
    }, { immediate: true })
  })
  
  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })
  
  const fullName = computed(() => user.value?.displayName || 'Non défini')
  const registrationDate = computed(() => {
    return user.value?.metadata?.creationTime 
      ? new Date(user.value.metadata.creationTime).toLocaleDateString()
      : 'Non défini'
  })
  const phoneNumber = ref(user.value?.phoneNumber || 'Non défini')
  const address = ref('Non définie')
  const notificationPreference = ref('Email')
  
  const updateFullName = (newValue) => { /* Implémentez la logique de mise à jour */ }
  const updatePhoneNumber = (newValue) => { phoneNumber.value = newValue }
  const updateAddress = (newValue) => { address.value = newValue }
  const updateNotificationPreference = (newValue) => { notificationPreference.value = newValue }
  
  const profileFields = [
    { icon: "envelope", label: "Email", value: computed(() => user.value?.email || 'Non défini') },
    { icon: "fingerprint", label: "ID", value: computed(() => user.value?.uid || 'Non défini') },
    { icon: "check-circle", label: "Vérifié", value: computed(() => user.value?.emailVerified ? 'Oui' : 'Non') },
    { icon: "user", label: "Nom complet", value: fullName, editable: true, updateFn: updateFullName },
    { icon: "calendar", label: "Date d'inscription", value: registrationDate },
    { icon: "phone", label: "Téléphone", value: phoneNumber, editable: true, updateFn: updatePhoneNumber },
    { icon: "map-pin", label: "Adresse", value: address, editable: true, updateFn: updateAddress },
    { icon: "bell", label: "Notifications", value: notificationPreference, editable: true, updateFn: updateNotificationPreference }
  ]
  
  const saveChanges = async () => {
    try {
      console.log('Cultivation des changements en cours...')
      // Appeler l'API pour mettre à jour le profil
      alert('Vos changements ont été cultivés avec succès dans votre jardin zen.')
    } catch (error) {
      console.error('Une pierre est apparue sur le chemin de la mise à jour:', error)
      alert('Nous avons rencontré un obstacle inattendu. Veuillez réessayer.')
    }
  }
  </script>