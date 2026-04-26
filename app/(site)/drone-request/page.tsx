"use client";

import { useState } from "react";
import { submitDroneRequest } from "../service/firebase.service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function DroneRequestForm() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    preferredDate: "",
    location: "",
    description: "",
    budget: "",
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center pt-16 min-h-screen">
        <div className="relative w-full max-w-xl p-6 bg-white rounded-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-center text-black">
            Please Sign In
          </h2>
          <p className="text-center text-gray-600 mb-6">
            You need to be signed in to request drone services.
          </p>
          <button
            onClick={() => router.push("/signin")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Sign In Here
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.serviceType || !formData.preferredDate) {
        alert("Please fill in all required fields");
        setLoading(false);
        return;
      }

      await submitDroneRequest(formData);

      alert("Your drone service request has been submitted! We will contact you soon.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        preferredDate: "",
        location: "",
        description: "",
        budget: "",
      });

      // Redirect to home after 2 seconds
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center pt-16 pb-16">
      {/* 🔥 Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/form.jpg')",
        }}
      />

      {/* 🔥 Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 🔥 Centered Form */}
      <div className="relative w-full max-w-2xl p-6 bg-white/10 backdrop-blur-md shadow-xl rounded-2xl mx-4">
        <h2 className="text-3xl font-semibold mb-2 text-center text-white">
          🚁 Drone Service Request
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Fill out the form below to request our professional drone services
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 mt-1 bg-white/90 text-black"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 mt-1 bg-white/90 text-black"
              placeholder="your@email.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-white">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 bg-white/90 text-black"
              placeholder="+60 123 4567890"
            />
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-sm font-medium text-white">
              Type of Service *
            </label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 mt-1 bg-white/90 text-black"
            >
              <option value="">Select a service</option>
              <option value="aerial-photography">Aerial Photography</option>
              <option value="aerial-videography">Aerial Videography</option>
              <option value="surveying-mapping">Surveying & Mapping</option>
              <option value="inspection-services">Inspection Services</option>
              <option value="other">Other (describe in details)</option>
            </select>
          </div>

          {/* Preferred Date */}
          <div>
            <label className="block text-sm font-medium text-white">
              Preferred Date *
            </label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 mt-1 bg-white/90 text-black"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-white">
              Project Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 bg-white/90 text-black"
              placeholder="e.g., Kuala Lumpur, Selangor"
            />
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-sm font-medium text-white">
              Project Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg p-2 mt-1 bg-white/90 text-black"
              placeholder="Tell us more about your project and what you're looking for..."
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-white">
              Budget Range
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 bg-white/90 text-black"
            >
              <option value="">Select budget range</option>
              <option value="below-500">Below RM 500</option>
              <option value="500-1000">RM 500 - RM 1000</option>
              <option value="1000-2000">RM 1000 - RM 2000</option>
              <option value="2000-5000">RM 2000 - RM 5000</option>
              <option value="above-5000">Above RM 5000</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition duration-300 disabled:bg-gray-400 mt-6"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

          <p className="text-sm text-gray-300 text-center mt-4">
            We&apos;ll review your request and contact you within 24-48 hours.
          </p>
        </form>
      </div>
    </div>
  );
}
