export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error('Erreur globale:', error)
    console.error('Instance Vue:', instance)
    console.error('Info:', info)
  }

  if (process.client) {
    // Ces écouteurs ne sont ajoutés que côté client
    window.addEventListener('error', (event) => {
      console.error('Erreur non capturée:', event.error)
    })

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Rejet de promesse non géré:', event.reason)
    })
  }
})