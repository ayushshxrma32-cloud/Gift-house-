import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} className="product-card">
      <div className="product-thumb">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-body">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
      </div>
      <span className="price-tag">${product.price}</span>
    </Link>
  );
}
