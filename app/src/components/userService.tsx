import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { deleteUser } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Ensure auth is imported properly

// Create user in Firestore after registration
export const createUserProfile = async (uid: string, email: string, fullName: string) => {
try {
    await setDoc(doc(db, "users", uid), {
    uid,
    fullName,
    email,
    address: "", // Default empty address
    createdAt: new Date().toISOString(),
    });
    console.log("User profile created successfully!");
} catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
}
};

// Read user profile from Firestore
export const getUserProfile = async (uid: string) => {
try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
    return userDoc.data();
    } else {
    console.log("No such user found!");
    return null;
    }
} catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
}
};

// Update user profile in Firestore
export const updateUserProfile = async (uid: string, updates: { fullName?: string; address?: string }) => {
try {
    await updateDoc(doc(db, "users", uid), updates);
    console.log("User profile updated successfully!");
} catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
}
};

// Delete user account and Firestore document
export const deleteUserAccount = async (uid: string) => {
try {
    await deleteDoc(doc(db, "users", uid)); // Delete Firestore user document
    const user = auth.currentUser;
    if (user) {
      await deleteUser(user); // Delete from Firebase Authentication
    }
    console.log("User account deleted successfully!");
} catch (error) {
    console.error("Error deleting user account:", error);
    throw error;
}
};
