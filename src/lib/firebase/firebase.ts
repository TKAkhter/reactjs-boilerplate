import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  CollectionReference,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  onAuthStateChanged,
  User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export class FirebaseService<T extends object> {
  private collectionRef: CollectionReference;

  constructor(collectionName: string) {
    this.collectionRef = collection(db, collectionName);
  }

  async register(email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }

  async deleteCurrentUser(): Promise<void> {
    const { currentUser } = auth;
    if (currentUser) {
      await deleteUser(currentUser);
    } else {
      throw new Error("No user is currently signed in.");
    }
  }

  async add(data: T): Promise<string> {
    const docRef = await addDoc(this.collectionRef, data);
    return docRef.id;
  }

  async set(id: string, data: T): Promise<void> {
    await setDoc(doc(db, this.collectionRef.path, id), data);
  }

  async get(id: string): Promise<(T & { id: string }) | null> {
    const docRef = doc(db, this.collectionRef.path, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as T & { id: string }) : null;
  }

  async getAll(): Promise<(T & { id: string })[]> {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map(
      (document) => ({ id: document.id, ...document.data() }) as T & { id: string },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getWhere(field: string, operator: any, value: any): Promise<(T & { id: string })[]> {
    const q = query(this.collectionRef, where(field, operator, value));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (document) => ({ id: document.id, ...document.data() }) as T & { id: string },
    );
  }

  onSnapshot(callback: (data: (T & { id: string })[]) => void): () => void {
    return onSnapshot(this.collectionRef, (snapshot) => {
      const data = snapshot.docs.map(
        (document) => ({ id: document.id, ...document.data() }) as T & { id: string },
      );
      callback(data);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async update(id: string, data: any): Promise<void> {
    const docRef = doc(db, this.collectionRef.path, id);
    await updateDoc(docRef, data);
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, this.collectionRef.path, id));
  }

  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }
}
