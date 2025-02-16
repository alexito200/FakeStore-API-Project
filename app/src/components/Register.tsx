import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";
import { 
createUserProfile, 
getUserProfile, 
updateUserProfile, 
deleteUserAccount 
} from "./userService";

const Register = () => {
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [fullName, setFullName] = useState<string>("");
const [error, setError] = useState<string | null>(null);

const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await createUserProfile(user.uid, email, fullName);

    alert("Registration successful! User data saved.");
    setEmail("");
    setPassword("");
    setFullName("");
    } catch (err: unknown) {
    if (err instanceof Error) {
        setError(err.message);
    } else {
        setError("An unexpected error occurred.");
    }
    }
};

const handleFetchUser = async () => {
    try {
    const user = auth.currentUser;
    if (!user) {
        alert("No user is signed in.");
        return;
    }

    const userData = await getUserProfile(user.uid);
    console.log("User Data:", userData);
    } catch (error) {
    console.error("Error fetching user:", error);
    }
};

const handleUpdateUser = async () => {
    try {
    const user = auth.currentUser;
    if (!user) {
        alert("No user is signed in.");
        return;
    }

    await updateUserProfile(user.uid, { fullName: "Updated Name", address: "123 New Address" });
    alert("User profile updated!");
    } catch (error) {
    console.error("Error updating user:", error);
    }
};

const handleDeleteUser = async () => {
    try {
    const user = auth.currentUser;
    if (!user) {
        alert("No user is signed in.");
        return;
    }

    await deleteUserAccount(user.uid);
    await signOut(auth);
    alert("User account deleted!");
    } catch (error) {
    console.error("Error deleting user:", error);
    }
};

return (
    <div>
    <form onSubmit={handleRegister}>
        <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        />
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <button type="submit">Register</button>
    </form>

    <button onClick={handleFetchUser}>Fetch User Profile</button>
    <button onClick={handleUpdateUser}>Update Profile</button>
    <button onClick={handleDeleteUser}>Delete Account</button>
    <Link to="/">Login</Link>

    {error && <p>{error}</p>}
    </div>
);
};

export default Register;
