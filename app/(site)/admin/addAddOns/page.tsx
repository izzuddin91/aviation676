"use client";

import React, { useState } from "react";
import { saveAddOn } from "../../service/firebase.service";


const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (file: File | null) => {
    setPhoto(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !price || !photo) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await saveAddOn({ title, description, price, photo });
      alert("Article created successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setPhoto(null);
    } catch (error) {
      console.error("Failed to save article:", error);
      alert("Failed to save article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Create New Add-On</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        {/* Title */}
        <div className="mb-4">
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border w-full p-2 rounded"
          ></textarea>
        </div>
        {/* Price */}
        <div className="mb-4">
          <label className="block font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>
        {/* Photo */}
        <div className="mb-4">
          <label className="block font-medium">Photo</label>
          <label className="w-32 h-32 border border-gray-300 rounded flex items-center justify-center cursor-pointer relative">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="Selected"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <span className="text-gray-400 text-3xl">+</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) =>
                handlePhotoChange(e.target.files ? e.target.files[0] : null)
              }
            />
          </label>
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
