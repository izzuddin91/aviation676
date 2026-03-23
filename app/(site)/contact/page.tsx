"use client";

import { useState } from "react";

export default function JoyrideForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferredDate: "",
    flightType: "",
    notes: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Joyride request:", formData);
    alert("Your request has been submitted! We will contact you soon.");
  };

  return (
    <div className="flex items-center justify-center pt-16">
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
      <div className="relative w-full max-w-xl p-6 bg-white/0 backdrop-blur-md shadow-xl rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          Cessna 172 Joyride Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-white">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Preferred Date
            </label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Type of Flight
            </label>
            <select
              name="flightType"
              value={formData.flightType}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 mt-1"
            >
              <option value="">Select a flight</option>
              <option value="kl-sightseeing">Kuala Lumpur Sightseeing</option>
              <option value="ipoh">Fly to Ipoh</option>
              <option value="melaka">Fly to Melaka</option>
              <option value="pangkor">Fly to Pangkor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={2}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
