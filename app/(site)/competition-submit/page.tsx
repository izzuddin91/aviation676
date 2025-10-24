"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { getAuth } from "firebase/auth";
import app from "@/app/clientApp";
import { submitPhoto } from "../service/firebase.service";
import { uploadPhotoAndSubmit } from "../service/firebase.service";

const auth = getAuth(app);

// after successful upload
const user = auth.currentUser;

export default function SubmitPhotoPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { user } = useAuth();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    country: "",
    planeName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Redirect only after render phase
  useEffect(() => {
    console.log(user);
    // if (!isAuthenticated) {
    //   router.push("/signin");
    // }
  }, [isAuthenticated, router, user]);

  // Optional: Show a loading or redirecting message
  // if (!isAuthenticated) {
  //   return <div className="text-center mt-10">Redirecting to sign-in...</div>;
  // }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simple image size control: between 200KB and 3MB
    if (file.size < 200 * 1024 || file.size > 3 * 1024 * 1024) {
      setError("Please upload an image between 200KB and 3MB.");
      return;
    }

    setError(null);
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    setError(null);
console.log(user)
    if (!image) {
      setError("Please upload a photo.");
      return;
    }

    setLoading(true);

    try {
      await uploadPhotoAndSubmit(image, form, user!.uid);
      alert("Photo submitted successfully! 🎉");
      // router.push("/competition");
    } catch (err) {
      console.error(err);
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          ✈️ Submit Your Planespotting Photo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 rounded-lg border border-gray-200 object-cover max-h-60 mx-auto"
              />
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="e.g. Sunset Departure at KLIA"
            />
          </div>

          {/* Plane Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Plane Name
            </label>
            <input
              type="text"
              name="planeName"
              value={form.planeName}
              onChange={handleChange}
              placeholder="e.g. Gulfstream G700"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="e.g. Malaysia"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell us about this photo..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            ></textarea>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg text-white font-medium transition-all ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Photo"}
          </button>
        </form>
      </div>
    </div>
  );
}
