# Gift House — online store

A ready-to-deploy storefront: 52 placeholder gift products across 12 categories,
a cart, and real Stripe payments (Stripe Checkout).

## What's in here
- `app/page.js` — homepage, category filter, product grid
- `app/product/[id]/page.js` — product detail page
- `app/cart/page.js` — cart + "Checkout with Stripe" button
- `app/api/checkout/route.js` — server route that creates a Stripe Checkout session (your secret key stays here, never in the browser)
- `lib/products.json` — your product catalog. Edit this to add your real products.
- `app/success/page.js` — order confirmation page

## 1. Swap in your real products
Open `lib/products.json`. Each product looks like this:

```json
{
  "id": 1,
  "name": "Confetti Pop Candle Trio",
  "category": "Birthday",
  "price": 28,
  "description": "Three hand-poured soy candles...",
  "image": "https://picsum.photos/seed/gifthouse1/600/600"
}
```

Replace `image` with a real photo URL (upload photos to any image host, or to
Vercel's `/public` folder and reference them as `/your-photo.jpg`). Keep `id`
values unique. `price` is in whole dollars.

## 2. Get a Stripe account (free, ~5 minutes)
1. Sign up at https://dashboard.stripe.com/register
2. Once in the dashboard, make sure you're in **Test mode** (toggle top-right)
3. Go to **Developers → API keys** and copy the **Secret key** (starts with `sk_test_...`)

## 3. Run it locally
```bash
npm install
cp .env.example .env.local
```
Paste your Stripe secret key into `.env.local`:
```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
Then:
```bash
npm run dev
```
Open http://localhost:3000. Add something to your cart and check out —
Stripe's test card is `4242 4242 4242 4242`, any future expiry date, any CVC,
any ZIP.

## 4. Deploy it for real (Vercel, free tier)
1. Push this folder to a GitHub repo
2. Go to https://vercel.com, "Add New Project", import the repo
3. In the project's **Settings → Environment Variables**, add:
   - `STRIPE_SECRET_KEY` = your `sk_test_...` key (switch to `sk_live_...` once you're ready to take real payments)
   - `NEXT_PUBLIC_SITE_URL` = your Vercel URL, e.g. `https://gift-house.vercel.app`
4. Deploy. Vercel gives you a live URL immediately; you can attach your own
   domain later under **Settings → Domains**.

## 5. Go live
When you're ready to accept real cards:
1. In Stripe, finish **Activate your account** (business details, bank account for payouts)
2. Switch the dashboard out of Test mode, copy your **live** secret key (`sk_live_...`)
3. Update `STRIPE_SECRET_KEY` in Vercel to the live key and redeploy

## Notes on what this does and doesn't include
- Payments go through Stripe Checkout, a Stripe-hosted page — you never handle
  raw card numbers, which keeps you out of most PCI-compliance burden.
- Order confirmation emails are sent automatically by Stripe.
- This does **not** yet include: an inventory/stock database, an order
  history/admin view, or a webhook that marks orders as "paid" in your own
  system. For a small catalog, Stripe's own dashboard (Payments tab) is
  enough to see and fulfill orders by hand. If you outgrow that, the next
  step is adding a Stripe webhook (`checkout.session.completed`) that writes
  to a database — happy to help with that when you're there.
