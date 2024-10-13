export default defineNuxtConfig({
  // Global page headers
  app: {
    head: {
      title: 'shizen-bonzai',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  // Router configuration
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'product-id',
        path: '/product/:id',
        component: resolve(__dirname, 'pages/product/[id].vue')
      })
    }
  },

  // Global CSS
  css: ['~/assets/css/tailwind.css'],

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/motion/nuxt'
  ],

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    viewer: true,
  },

  // Plugins
  plugins: [
    '~/plugins/firebase.client.js',
    '~/plugins/stripe.client.js',  // Ajout du plugin Stripe
    '~/plugins/auth.js'
  ],

  // Runtime config
  runtimeConfig: {
    public: {
      firebaseConfig: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      },
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY  // Ajout de la clé publique Stripe
    }
  },

  // PostCSS Configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Build Configuration
  build: {},

  // Explicitly enable pages
  pages: true,

  // Compatibility date
  compatibilityDate: '2024-10-09'
})