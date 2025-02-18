import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where } from "firebase/firestore";
import { Product } from "../types/types";
import { Order } from "../types/types";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const productsCollection = collection(db, "products");

export const addProduct = async (name: string, price: number, imageUrl: string, category: string) => {
  try {
    const docRef = await addDoc(productsCollection, {
      name,
      price,
      imageUrl,
      category,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "Untitled Product",
        price: data.price || 0,
        imageUrl: data.imageUrl || "/apple-touch-icon.jpg",
        category: data.category || "",
      } as Product;
    });
  };


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

export const saveOrder = async (orderData: Order, userId: string) => {
  try {
    if (!orderData || !orderData.items || orderData.items.length === 0) {
      throw new Error('Order data is missing or invalid');
    }

    const validOrderData = {
      ...orderData,
      items: orderData.items.map((item) => ({
        name: item.name || '',
        price: item.price || 0,
        imageUrl: item.imageUrl || '',
        quantity: item.quantity || 1,
      })),
      totalAmount: orderData.totalAmount || 0,
      totalPrice: orderData.totalPrice || '0',
      createdAt: orderData.createdAt || new Date(),
      status: orderData.status || 'pending',
      userId: userId,
    };

    const docRef = await addDoc(collection(db, 'orders'), validOrderData);
    console.log('Order saved with ID: ', docRef.id);
  } catch (error) {
    console.error('Error saving order: ', error);
  }
};

export const useUserOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const ordersRef = collection(db, "orders");
          const q = query(ordersRef, where("userId", "==", user.uid));

          const querySnapshot = await getDocs(q);
          const fetchedOrders = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              items: data.items || [],
              totalAmount: data.totalAmount || 0,
              totalPrice: data.totalPrice || "0.00",
              createdAt: data.createdAt?.toDate() || new Date(),
              status: data.status || "pending",
            } as Order;
          });

          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Error fetching orders: ", error);
        }
      } else {
        console.log("User is not logged in");
        setOrders([]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  return { orders, loading, user };
};