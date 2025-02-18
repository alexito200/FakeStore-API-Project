import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
apiKey: "AIzaSyBkN1teCggKcRgbB5-lWvai3T_oEYVugIU",
authDomain: "react-e-commerce-app-54528.firebaseapp.com",
projectId: "react-e-commerce-app-54528",
storageBucket: "react-e-commerce-app-54528.firebasestorage.app",
messagingSenderId: "525875212191",
appId: "1:525875212191:web:d4744f504ac2c473ef57aa"
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };