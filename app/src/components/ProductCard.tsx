import React from 'react';
import { Product } from '../types/types';

interface ProductCardProps {
product: Product;
onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
return (
    <div>
    <img src={product.image} alt={product.title} width={100} />
    <h3>{product.title}</h3>
    <p>${product.price}</p>
    <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
);
};

export default ProductCard;
