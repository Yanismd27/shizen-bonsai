import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { items } = body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Stripe utilise les centimes
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  return { sessionId: session.id, url: session.url };
});