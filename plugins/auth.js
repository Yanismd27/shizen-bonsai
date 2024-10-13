import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const authStore = useAuthStore()
    authStore.initializeAuthStateListener()

    nuxtApp.hook('page:start', () => {
      console.log("Changement de page, état de connexion:", authStore.user)
    })
  }
})