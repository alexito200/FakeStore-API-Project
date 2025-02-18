import { useState } from "react";
import { addProduct } from "../components/productService";
import { Product } from "../types/types";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AddPage: React.FC = () => {
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    imageUrl: "",
    category: "",
  });

  const navigate = useNavigate();

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.imageUrl || !newProduct.category) {
      alert("Please fill out all fields!");
      return;
    }

    try {
      await addProduct(newProduct.name, newProduct.price, newProduct.imageUrl, newProduct.category);
      alert("Product added successfully!");
      setNewProduct({ id: "", name: "", price: 0, imageUrl: "", category: "" });
      navigate("/home");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add-product-page">
      <h2>Add New Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={newProduct.imageUrl}
        onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={newProduct.category}
        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
      />
      <button onClick={handleAddProduct}>Add Product</button>
      <button className="go-home-button" onClick={() => navigate("/home")}>Go to Home</button>
    </div>
  );
};

export default AddPage;
