import Stripe from "stripe";

// The secret key lives only on the server (Vercel env vars / .env.local).
// It is never sent to the browser.
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local (dev) or your hosting provider's environment variables (production)."
    );
  }
  return new Stripe(key, { apiVersion: "2024-06-20" });
}
