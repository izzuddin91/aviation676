"use client";
import app from "@/app/clientApp";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  addDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";


const db = getFirestore(app);
const storage = getStorage(app);
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
export const updateArticle = async (
  articleId: string,
  updatedData: any
): Promise<void> => {
  const articleRef = doc(db, "articles", articleId);

  await updateDoc(articleRef, {
    ...updatedData,
    updatedAt: new Date(), // optional: track last edit time
  });

  console.log(`✅ Article ${articleId} updated successfully`);
};

/**
 * 📸 Submit a new planespotting photo entry
 */
export const submitPhoto = async (data: {
  title: string;
  description: string;
  country: string;
  planeName: string;
  imageUrl: string; // URL from Firebase Storage
  userId: string; // from Firebase Auth or session
}) => {
  const submissionsRef = collection(db, "submissions");

  const docRef = await addDoc(submissionsRef, {
    ...data,
    likes_count: 0,
    createdAt: serverTimestamp(),
  });

  console.log(`✅ Photo submitted with ID: ${docRef.id}`);
  return docRef.id;
};


export const uploadPhotoAndSubmit = async (
  file: File,
  formData: {
    title: string;
    description: string;
    country: string;
    planeName: string;
  },
  userId: string
) => {
  try {
    // 1️⃣ Upload the file to Firebase Storage
    const storageRef = ref(storage, `competition_photos/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);

    // 2️⃣ Get the public download URL
    const downloadURL = await getDownloadURL(storageRef);

    // 3️⃣ Save submission data to Firestore
    const submissionData = {
      title: formData.title,
      description: formData.description,
      country: formData.country,
      planeName: formData.planeName,
      imageUrl: downloadURL,
      userId,
      likes_count: 0,
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "submissions"), submissionData);

    console.log("✅ Submission uploaded successfully!");
    return submissionData;
  } catch (error) {
    console.error("❌ Error uploading submission:", error);
    throw error;
  }
};