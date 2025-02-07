"use client"

import React, { useState } from "react";
import { addMeetingReservation } from "../service/firebase.service"; // Firebase service
const JoinOurClass: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    console.log('test')
    //make a firebase call to backend
    addMeetingReservation(formData.name, formData.phone, formData.date);
    setFormData({ name: "", phone: "", date: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Make an appointment</h1>
        <p className="mb-6 text-gray-700">
          Hi, my name is Izzuddin. I have been a superhost in Airbnb for 4 years. If you like to start in Airbnb, to know the in and out of this business, which property to focus and what to look for, you can book for an hour zoom session here. (Only for KL area, and based solely on my 4 years of knowledge)
        </p>
        <p className="mb-6 text-gray-700">
          <strong>There will be a RM50 charge for a session. Please make a booking first, so we could finalize the session before you make the transfer.</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          {/* Date Selection */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Select Date
            </label>
            <select
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="" disabled>
                Choose a date
              </option>
              <option value="2024-12-25"> February 15, 2025</option>
              <option value="2024-12-26"> February 16, 2025</option>
              <option value="2024-12-27">February 22, 2025</option>
              <option value="2024-12-27"> February 23, 2025</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-80">
              <h2 className="text-lg font-bold mb-4">Confirm Your Details</h2>
              <p className="mb-2"><strong>Name:</strong> {formData.name}</p>
              <p className="mb-2"><strong>Phone:</strong> {formData.phone}</p>
              <p className="mb-4"><strong>Date:</strong> {formData.date}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCloseModal}
                  className="py-2 px-4 bg-gray-300 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert("Details submitted!");
                    handleCloseModal();
                  }}
                  className="py-2 px-4 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinOurClass;
