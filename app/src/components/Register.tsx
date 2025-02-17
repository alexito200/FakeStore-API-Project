import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";
import { 
    createUserProfile 
} from "./userService";

const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // Initialize navigate function

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await createUserProfile(user.uid, email, fullName);

            alert("Registration successful! User data saved.");
            
            // Redirect to login page after the alert
            navigate("/");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
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

            <Link to="/">Login</Link>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Register;
