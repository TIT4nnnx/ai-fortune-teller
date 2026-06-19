import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { FortuneRecord } from "@/types/fortune";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app };

export async function saveFortuneRecord(
  record: Omit<FortuneRecord, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, "fortunes"), {
    ...record,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getFortuneHistory(
  userId?: string,
  limitCount = 20
): Promise<FortuneRecord[]> {
  const q = userId
    ? query(collection(db, "fortunes"), where("userId", "==", userId), limit(limitCount))
    : query(collection(db, "fortunes"), orderBy("createdAt", "desc"), limit(limitCount));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data() as DocumentData;
    return {
      id: doc.id,
      userId: data.userId,
      name: data.name,
      dateOfBirth: data.dateOfBirth,
      question: data.question,
      response: data.response,
      timestamp: data.timestamp,
      createdAt: data.createdAt?.toDate(),
    };
  });
}
