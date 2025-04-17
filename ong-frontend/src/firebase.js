import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Configurações do seu projeto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB96GHIgtF1pSiT3KpDFRSIoPR-nmmjk_w",
    authDomain: "ong-promoart.firebaseapp.com",
    projectId: "ong-promoart",
    storageBucket: "ong-promoart.firebasestorage.app",
    messagingSenderId: "187337876789",
    appId: "1:187337876789:web:9c4ac177f8fc591c8fd87c",
    measurementId: "G-MM299R5SQ7"
  };

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
