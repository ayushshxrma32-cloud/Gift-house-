"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand">
          Gift House <small>Est. shop</small>
        </Link>
        <nav className="nav-links">
          <Link href="/">Shop</Link>
          <Link href="/cart" className="cart-link">
            Cart {count > 0 && <span className="cart-count">{count}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
