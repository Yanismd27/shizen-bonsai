import { defineStore } from 'pinia'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously as firebaseSignInAnonymously,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: true,
    error: null,
  }),
  actions: {
    async register(email, password) {
      this.loading = true
      this.error = null
      const auth = getAuth()
      try {
        console.log("Tentative d'inscription avec:", email)
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
        console.log("Inscription réussie:", this.user)
        
        // Envoyer l'email de vérification
        await sendEmailVerification(this.user)
        console.log("Email de vérification envoyé à:", email)
        
        return { success: true, message: "Inscription réussie. Veuillez vérifier votre email pour confirmer votre compte." }
      } catch (error) {
        console.error("Erreur d'inscription:", error)
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    async login(email, password) {
      this.loading = true
      this.error = null
      const auth = getAuth()
      try {
        console.log("Tentative de connexion avec:", email)
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
        console.log("Connexion réussie:", this.user)
      } catch (error) {
        console.error("Erreur de connexion:", error)
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    async signInWithGoogle() {
      this.loading = true
      this.error = null
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      try {
        console.log("Tentative de connexion avec Google")
        const result = await signInWithPopup(auth, provider)
        this.user = result.user
        console.log("Connexion Google réussie:", this.user)
      } catch (error) {
        console.error("Erreur de connexion Google:", error)
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    async signInAnonymously() {
      this.loading = true
      this.error = null
      const auth = getAuth()
      try {
        console.log("Tentative de connexion anonyme")
        const result = await firebaseSignInAnonymously(auth)
        this.user = result.user
        console.log("Connexion anonyme réussie:", this.user)
      } catch (error) {
        console.error("Erreur de connexion anonyme:", error)
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    async signOut() {
      this.loading = true
      this.error = null
      const auth = getAuth()
      try {
        console.log("Tentative de déconnexion")
        await firebaseSignOut(auth)
        this.user = null
        console.log("Déconnexion réussie")
      } catch (error) {
        console.error("Erreur de déconnexion:", error)
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    initializeAuthStateListener() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        console.log("Changement d'état d'authentification:", user ? user.email : 'Déconnecté')
        this.user = user
        this.loading = false
      })
    }
  },
})