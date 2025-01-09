import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCefZfHoAEAGQusYLZVl6lQmYWErcTa2tQ",
  authDomain: "fotosdb-656e5.firebaseapp.com",
  projectId: "fotosdb-656e5",
  storageBucket: "fotosdb-656e5.firebasestorage.app",
  messagingSenderId: "156055207340",
  appId: "1:156055207340:web:108b91af1703e3b58ace09"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar instancias
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);