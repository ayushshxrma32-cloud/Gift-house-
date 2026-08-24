import { NextResponse } from "next/server";
import { getStripe } from "../../../lib/stripe";
import { getProductById } from "../../../lib/products";

export async function POST(request) {
  try {
    const { items } = await request.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    // Always recompute prices from our own product catalog on the server.
    // Never trust prices sent from the browser.
    const line_items = items.map(({ id, qty }) => {
      const product = getProductById(id);
      if (!product) throw new Error(`Unknown product: ${id}`);
      const quantity = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
      return {
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.image],
          },
        },
      };
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU"] },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: err.message || "Could not start checkout." },
      { status: 500 }
    );
  }
}
