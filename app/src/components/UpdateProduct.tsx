import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../components/productService";
import { Product } from "../types/types";
import { db } from "../firebaseConfig";
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

const UpdateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [newData, setNewData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    category: "",
  });
  const [message, setMessage] = useState<string>(""); // Message state for success or error
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      alert("Product ID is missing");
      navigate("/home");
      return;
    }

    const fetchProductDetails = async () => {
      try {
        const productRef = doc(db, 'products', id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data();
          const productWithId = {
            id: productSnap.id,
            ...productData,
          } as Product;

          setProduct(productWithId);
          setNewData({
            name: productWithId.name,
            price: productWithId.price.toString(),
            imageUrl: productWithId.imageUrl,
            category: productWithId.category,
          });
        } else {
          alert('Product not found');
          navigate('/home');
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        alert('Error fetching product details');
      }
    };

    fetchProductDetails();
  }, [id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    if (!newData.name || !newData.price || !newData.imageUrl || !newData.category) {
      alert("Please fill out all fields!");
      return;
    }

    if (!id) {
      alert("Product ID is missing");
      return;
    }

    const updatedProductData = {
      name: newData.name,
      price: parseFloat(newData.price),
      imageUrl: newData.imageUrl,
      category: newData.category,
    };

    try {
      const success = await updateProduct(id, updatedProductData);
      if (success) {
        alert("Product updated successfully!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  // Delete product logic
  const handleDelete = async () => {
    if (!id) {
      alert("Product ID is missing");
      return;
    }

    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
      setMessage("Product successfully deleted!"); // Set success message
      navigate("/home");
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Error deleting product. Please try again."); // Set error message
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      {message && <p>{message}</p>} {/* Render the message */}

      {product ? (
        <form>
          <div>
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={newData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={newData.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={newData.imageUrl}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={newData.category}
              onChange={handleInputChange}
            />
          </div>
          <button type="button" onClick={handleUpdate}>Update Product</button>
        </form>
      ) : (
        <p>Loading product details...</p>
      )}

      <button onClick={handleDelete}>Delete Product</button>
      <button onClick={() => navigate("/home")}>Go Back to Home</button>
    </div>
  );
};

export default UpdateProduct;
