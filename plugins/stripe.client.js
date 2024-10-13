import { loadStripe } from '@stripe/stripe-js';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  let stripePromise = null;

  const initStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(config.public.stripePublishableKey);
    }
    return stripePromise;
  };

  if (process.client) {
    // Initialise Stripe immédiatement côté client
    initStripe();
  }

  return {
    provide: {
      initStripe
    }
  };
});