// Login.tsx
import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch
import { setUser, clearUser } from "../redux/userSlice"; // Import setUser and clearUser actions
import { getUserProfile } from "./userService"; // Import getUserProfile function
import { UserProfileProps } from "../redux/userSlice"; // Adjust path as needed

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  // Fetch user profile and update Redux and localStorage
// In Login.tsx

const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Ensure the user is authenticated
      if (user) {
        // Fetch user profile by passing user.uid as argument
        const profile = await getUserProfile(user.uid);
  
        if (profile) {
          // Assert that the profile conforms to UserProfile type
          const userProfile: UserProfileProps = {
            uid: user.uid,
            email: user.email || "",
            fullName: profile.fullName || "",
            address: profile.address || "",
          };
  
          // Store user data in Redux
          dispatch(setUser(userProfile));
  
          // Save user data to localStorage
          localStorage.setItem("userProfile", JSON.stringify(userProfile));
  
          alert("Login successful!");
          navigate("/user-profile");
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser()); // Clear user data from Redux
      localStorage.removeItem("userProfile"); // Remove user data from localStorage
      alert("Logged out!");
      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/register">Create Account</Link>
    </>
  );
};

export default Login;
