import React from "react";
import { Product } from "../types/types";

const placeholderImage = "/apple-touch-icon.jpg";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl || placeholderImage}
        alt={product.name}
        width={100}
        height={100}
        style={{ objectFit: 'cover' }}
      />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
