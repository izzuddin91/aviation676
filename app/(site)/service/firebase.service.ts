"use client";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../clientApp"; 
import {  doc, getDoc } from "firebase/firestore";
const db = getFirestore(app);

export const getLatestThreeArticle = async (): Promise<any[]> => {
  const articlesRef = collection(db, "articles");
  const snapshot = await getDocs(articlesRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
// ✅ Get article details by ID
export const getArticleDetails = async (
  articleId: string
): Promise<{ id: string; [key: string]: any } | null> => {
  const docRef = doc(db, "articles", articleId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null; // or throw new Error("Article not found");
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};
