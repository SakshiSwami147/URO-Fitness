"use client";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChFwj2kmXuHXqfc5WV7NI3In_vrgYHnlM",
  authDomain: "urofitness-54907.firebaseapp.com",
  projectId: "urofitness-54907",
  storageBucket: "urofitness-54907.firebasestorage.app",
  messagingSenderId: "813711396621",
  appId: "1:813711396621:web:33856463abc64f568dea44",
  measurementId: "G-CNPN0D7GVM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


setPersistence(auth, browserSessionPersistence);