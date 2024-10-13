import { initializeApp } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  const firebaseConfig = {
    apiKey: config.public.firebaseConfig.apiKey,
    authDomain: config.public.firebaseConfig.authDomain,
    projectId: config.public.firebaseConfig.projectId,
    storageBucket: config.public.firebaseConfig.storageBucket,
    messagingSenderId: config.public.firebaseConfig.messagingSenderId,
    appId: config.public.firebaseConfig.appId,
    measurementId: config.public.firebaseConfig.measurementId
  }

  console.log('Firebase Config:', firebaseConfig) // Log pour déboguer

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)

  await setPersistence(auth, browserLocalPersistence)

  nuxtApp.provide('auth', auth)
  nuxtApp.provide('db', db)
  console.log('Firebase initialized successfully with Auth')

  // Ajout d'un listener pour l'état de l'authentification
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('Utilisateur connecté:', user.email)
    } else {
      console.log('Utilisateur déconnecté')
    }
  })
})