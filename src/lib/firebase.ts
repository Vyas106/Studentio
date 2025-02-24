// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirestore, collection, addDoc, deleteDoc, query, where, doc, setDoc, getDoc, updateDoc, getDocs, orderBy, limit, startAfter, type DocumentData } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { Timestamp } from 'firebase/firestore';
import { arrayUnion, arrayRemove, increment } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const realtimeDb = getDatabase(app);
const provider = new GoogleAuthProvider();

// Initialize analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Utility functions
export const getChatRoomId = (uid1: string, uid2: string) => {
  return [uid1, uid2].sort().join('_');
};

export {
  app,
  auth,
  arrayUnion,
  arrayRemove,
  increment,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  db,
  storage,
  realtimeDb,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  deleteDoc,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  analytics,
  User,
  Timestamp,
  DocumentData
};