import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { Product } from "../types/types";

const productsCollection = collection(db, "products");

// ✅ **Create Product**
export const addProduct = async (name: string, price: number, imageUrl: string, category: string) => {
  try {
    const docRef = await addDoc(productsCollection, {
      name,
      price,
      imageUrl,
      category,
      createdAt: new Date(),
    });
    return docRef.id; // Return the new product ID
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// ✅ **Read All Products**
// productService.ts
export const fetchProducts = async (): Promise<Product[]> => {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "Untitled Product", // Fallback for title
        price: data.price || 0, // Ensure price is a number
        imageUrl: data.imageUrl || "/apple-touch-icon.jpg", // Use imageUrl or fallback to placeholder
        category: data.category || "", // Ensure category exists
      } as Product;
    });
  };


// ✅ **Read Single Product**
export const getProductById = async (id: string) => {
  try {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() };
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// ✅ **Update Product**
export const updateProduct = async (id: string, updatedData: { name?: string; price?: number; imageUrl?: string, category: string }) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedData);
    return true;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// ✅ **Delete Product**
export const deleteProduct = async (id: string) => {
  try {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
