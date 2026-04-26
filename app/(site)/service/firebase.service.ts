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
export const createArticle = async (data: any) => {
  const docRef = await addDoc(collection(db, "articles"), data);
  return docRef.id;
};


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
): Promise<{ id: string;[key: string]: any } | null> => {
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

/**
 * 📦 Fetch product details by ID
 */
export const fetchProduct = async (productId: string): Promise<{
  title: string;
  price: number;
  features: string[];
  images: string[];
  description: string;
} | null> => {
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error(`Product ${productId} not found`);
      return null;
    }

    const data = docSnap.data();
    const images = [data.image_1, data.image_2, data.image_3, data.image_4].filter(Boolean);

    return {
      title: data.title,
      price: data.price,
      features: data.features || [],
      images,
      description: data.description || "",
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const submitJoyrideRequest = async (data: {
  name: string;
  email: string;
  preferredDate: string;
  flightType: string;
  notes?: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, "joyride_requests"), {
      ...data,
      status: "pending", // 🔥 useful for tracking later
      createdAt: serverTimestamp(),
    });

    console.log(`✅ Joyride request submitted: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error submitting joyride request:", error);
    throw error;
  }
};

/**
 * 🚁 Submit a new drone service request
 */
export const submitDroneRequest = async (data: {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  preferredDate: string;
  location?: string;
  description?: string;
  budget?: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, "drone_requests"), {
      ...data,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    console.log(`✅ Drone service request submitted: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error submitting drone service request:", error);
    throw error;
  }
};

/**
 * ✈️ Get all planes
 */
export const getAllPlanes = async (): Promise<any[]> => {
  const planesRef = collection(db, "planes");
  const snapshot = await getDocs(planesRef);
  const planes = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description || data["description "] || "", // Handle field name with space
      images: data.images || data["images "] || [], // Handle field name with space
      registrationNo: data.registrationNo || data["registrationNo "] || "", // Handle field name with space
      ...data, // Include any other fields
    };
  });
  console.log("All planes from Firestore:", planes);
  return planes;
};

/**
 * ✈️ Get plane details by ID
 */
export const getPlaneDetails = async (
  planeId: string
): Promise<{ id: string;[key: string]: any } | null> => {
  const docRef = doc(db, "planes", planeId);
  const docSnap = await getDoc(docRef);
  console.log("Plane details from Firestore:", docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null);

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data();
  return {
    id: docSnap.id,
    title: data.title,
    description: data.description || data["description "] || "",
    images: data.images || data["images "] || [],
    registrationNo: data.registrationNo || data["registrationNo "] || "",
    ...data,
  };
};