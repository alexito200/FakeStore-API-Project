import { Product } from "../types/types"

const ProductCard: React.FC<{ product: Product}> = ({ product }) => {
return (
    <div>
        <h3>{ product.title }</h3>
        <p>{ product.price }</p>
        <img src={ product.image } alt={ product.title } />
    </div>
    )
}

export default ProductCard