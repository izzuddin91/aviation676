"use client"
import React, { useState } from "react";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState<(string | null)[]>([null, null]);

  const handlePhotoChange = (index: number, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedPhotos = [...photos];
        updatedPhotos[index] = reader.result as string; // Convert image to base64
        setPhotos(updatedPhotos);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Article Created:", { title, content, photos });
    alert("Article created successfully!");
    setTitle("");
    setContent("");
    setPhotos([null, null]); // Reset photos
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Create New Article</h1>
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
        {/* Content */}
        <div className="mb-4">
          <label className="block font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border w-full p-2 rounded"
          ></textarea>
        </div>
        {/* Photos */}
        <div className="mb-4">
          <label className="block font-medium">Photos</label>
          <div className="flex gap-4">
            {photos.map((photo, index) => (
              <label
                key={index}
                className="w-24 h-24 border border-gray-300 rounded flex items-center justify-center cursor-pointer relative"
              >
                {photo ? (
                  <img
                    src={photo}
                    alt={`Selected ${index + 1}`}
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
                    handlePhotoChange(index, e.target.files ? e.target.files[0] : null)
                  }
                />
              </label>
            ))}
          </div>
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
