"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../components/CartProvider";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, qty: i.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="wrap empty-state">
        <h2>Your cart is empty.</h2>
        <p>Find something thoughtful for someone (or yourself).</p>
        <Link href="/" className="btn btn-outline">
          Browse gifts
        </Link>
      </div>
    );
  }

  return (
    <main className="wrap cart-page">
      <h1 style={{ marginBottom: 24 }}>Your cart</h1>

      {items.map((item) => (
        <div className="cart-row" key={item.id}>
          <img src={item.image} alt={item.name} />
          <div>
            <div className="cart-row-cat">{item.category}</div>
            <div className="cart-row-name">{item.name}</div>
          </div>
          <div className="qty-control">
            <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
            <span>{item.qty}</span>
            <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
          </div>
          <div className="count-label">${(item.price * item.qty).toFixed(2)}</div>
          <button className="remove-btn" onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <div className="cart-summary">
        <div className="summary-line">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-line" style={{ color: "var(--ink-soft)" }}>
          <span>Shipping &amp; tax</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="summary-line summary-total">
          <span>Estimated total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {error && (
          <p style={{ color: "#a4372c", fontSize: "0.85rem", marginTop: 10 }}>
            {error}
          </p>
        )}

        <button
          className="btn btn-block"
          style={{ marginTop: 16 }}
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? "Redirecting to Stripe…" : "Checkout with Stripe"}
        </button>
      </div>
    </main>
  );
}
