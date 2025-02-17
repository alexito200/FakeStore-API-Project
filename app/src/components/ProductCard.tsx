import React from "react";
import { Product } from "../types/types";

// Default placeholder image
const placeholderImage = "/apple-touch-icon.jpg";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      {/* Use the product image or fallback to placeholder */}
      <img
        src={product.imageUrl || placeholderImage} // Use imageUrl from Firestore, fallback to placeholder
        alt={product.name}
        width={100}
        height={100}
        style={{ objectFit: 'cover' }} // Ensure image maintains aspect ratio
      />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
