import { getFirestore, collection, getDocs, addDoc, query, orderBy, limit, updateDoc, doc, increment, getDoc, setDoc } from "firebase/firestore";
import app from "@/app/clientApp";

const db = getFirestore(app);

export const getLatestSubmissions = async () => {
  const q = query(collection(db, "submissions"), orderBy("createdAt", "desc"), limit(3));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getAllSubmissions = async () => {
  const q = query(collection(db, "submissions"), orderBy("likes_count", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const likeSubmission = async (submissionId: string, userId: string) => {
  const likesRef = doc(db, "likes", `${userId}_${submissionId}`);
  const submissionRef = doc(db, "submissions", submissionId);

  const existing = await getDoc(likesRef);
  if (existing.exists()) throw new Error("Already liked");

  await updateDoc(submissionRef, { likes_count: increment(1) });
  await setDoc(likesRef, { userId, submissionId, createdAt: new Date() });
};