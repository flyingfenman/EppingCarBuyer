import Stripe from "stripe"

// The Stripe client, created the first time it is needed rather than when the code loads. That keeps building the
// site (and starting it on Cloudflare) independent of the payment key, which is only read when a payment is made.
// Stripe's fetch-based connection is used so this works on Cloudflare as well as on Node.
let client: Stripe | undefined

export function getStripe(): Stripe {
  if (!client) {
    client = new Stripe(process.env.STRIPE_SECRET_KEY || "", { httpClient: Stripe.createFetchHttpClient() })
  }
  return client
}
