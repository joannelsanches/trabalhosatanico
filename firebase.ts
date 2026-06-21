// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFHcPkXuxaxiSW7K-HqoyZlbd3dFGVGDU",
  authDomain: "lupla-9fa70.firebaseapp.com",
  projectId: "lupla-9fa70",
  storageBucket: "lupla-9fa70.firebasestorage.app",
  messagingSenderId: "879569798724",
  appId: "1:879569798724:web:bfccccdc16fc5fe6305e11",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth,app, db, storage };