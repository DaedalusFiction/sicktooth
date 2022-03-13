import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA4VzkAwJ608aNQClgKcW_i2dItDiAd9SU",
    authDomain: "sicktooth-192b3.firebaseapp.com",
    projectId: "sicktooth-192b3",
    storageBucket: "sicktooth-192b3.appspot.com",
    messagingSenderId: "140152678531",
    appId: "1:140152678531:web:ede2d062e27003bbe913b6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage();

const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, db, storage, provider, auth };
