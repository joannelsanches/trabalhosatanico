import { initializeApp } from "firebase/config"; // ou "firebase/app"
import { initializeApp as initApp } from "firebase/app";

//
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Corrigido o 'getstorage' que estava com 's' minúsculo

//
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFHcPkXuxaxiSW7K-HqoyZ1bd3dFGVGDU",
  authDomain: "lupla-9fa70.firebaseapp.com",
  projectId: "lupla-9fa70",
  storageBucket: "lupla-9fa70.firebasestorage.app",
  messagingSenderId: "879569798724",
  appId: "1:879569798724:web:bfccccdc16fc5fe6305e11",
};

// Inicializa o Firebase Core
const app = initApp(firebaseConfig);

// Inicializa o Auth forçando a compatibilidade com React Native e AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, app, db, storage };
