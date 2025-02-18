import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../redux/userSlice";
import { getUserProfile } from "./userService";
import { UserProfileProps } from "../redux/userSlice";
import '../App.css'

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (user) {
        const profile = await getUserProfile(user.uid);
  
        if (profile) {
          const userProfile: UserProfileProps = {
            uid: user.uid,
            email: user.email || "",
            fullName: profile.fullName || "",
            address: profile.address || "",
          };
  
          dispatch(setUser(userProfile));
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
      dispatch(clearUser());
      localStorage.removeItem("userProfile");
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
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="login-btn">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <Link to="/register" className="register-link"><button>Create Account</button></Link>
    </div>
  );
};

export default Login;
