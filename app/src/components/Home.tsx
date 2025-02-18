import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addItemToCart, loadCart } from "../redux/cartSlice";
import { fetchProducts } from "../components/productService";
import ProductCard from "./ProductCard";
import { Product } from "../types/types";
import "../App.css";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      dispatch(loadCart(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl || "",
        count: 1,
      })
    );
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((acc, item) => acc + item.count, 0)
  );

  return (
    <div className="home">
      <div className="top-navigation">
        <Link to="/user-profile" className="profile-button">Profile</Link>

        <Link to="/cart" className="cart-container">
          <FaShoppingCart className="cart-icon" />
          {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
        </Link>
      </div>

      <div className="category-filter">
        <label htmlFor="category">Filter by Category: </label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>
      </div>

      <Link to="/add-product" className="add-product-link">Add New Product</Link>

      <div className="product-list">
        {filteredProducts.map((product: Product) => (
          <div key={product.id} className="product-card-container">
            <ProductCard product={product} onAddToCart={handleAddToCart} />
            <Link to={`/update-product/${product.id}`} className="update-product-button">
              <button>Update Product</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
