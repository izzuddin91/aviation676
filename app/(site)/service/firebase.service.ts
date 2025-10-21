"use client";
import app from "@/app/clientApp";
import { getFirestore, collection, getDocs, doc, getDoc, updateDoc, query, orderBy } from "firebase/firestore";
// import { app } from "../../clientApp"; 

const db = getFirestore(app);

/**
 * 📰 Get the latest three articles
 */
export const getLatestThreeArticle = async (): Promise<any[]> => {
  const articlesRef = collection(db, "articles");
  const snapshot = await getDocs(articlesRef);

  return snapshot.docs.slice(0, 3).map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * 📝 Get article details by ID
 */
export const getArticleDetails = async (
  articleId: string
): Promise<{ id: string; [key: string]: any } | null> => {
  const docRef = doc(db, "articles", articleId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};

/**
 * 📋 Get all articles (sorted by createdAt if available)
 */
export const getAllArticles = async (): Promise<any[]> => {
  const articlesRef = collection(db, "articles");

  // Optional sorting if you store createdAt field
  const q = query(articlesRef);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * ✏️ Update an article by ID
 */
export const updateArticle = async (articleId: string, updatedData: any): Promise<void> => {
  const articleRef = doc(db, "articles", articleId);

  await updateDoc(articleRef, {
    ...updatedData,
    updatedAt: new Date(), // optional: track last edit time
  });

  console.log(`✅ Article ${articleId} updated successfully`);
};
