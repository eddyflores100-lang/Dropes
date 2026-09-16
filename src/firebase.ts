import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaP1ltDwuOh4UrOGMxtm66iImf4SNdiGHlYhcSAmRW8HE=",
    authDomain: "dropea-shop-2026.firebaseapp.com",
    databaseURL: "https://dropea-shop-2026-default-rtdb.firebaseio.com",
    projectId: "dropea-shop-2026",
    storageBucket: "dropea-shop-2026.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
