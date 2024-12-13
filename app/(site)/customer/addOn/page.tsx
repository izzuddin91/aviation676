"use client";

import React, { useEffect, useState } from "react";
import { addOrder, getAddOnList } from "../../service/firebase.service"; // Firebase service
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Firestore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal"; // Install via npm install react-modal
import { format } from "date-fns";

const db = getFirestore(); // Initialize Firestore

type Item = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
};

type SelectedItem = {
  id: string;
  quantity: number;
};

export default function AncillaryRevenue() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch add-ons from Firestore
  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        const addOnsData = await getAddOnList();
        setItems(addOnsData);
      } catch (error) {
        console.error("Error fetching add-ons:", error);
      }
    };

    fetchAddOns();
  }, []);

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setSelectedItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== itemId);
      if (quantity > 0) {
        updatedItems.push({ id: itemId, quantity });
      }
      return updatedItems;
    });
  };

  const calculateTotalPrice = () => {
    const total = selectedItems.reduce((sum, item) => {
      const product = items.find((i) => i.id === item.id);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedItems]);

  const handleConfirm = async () => {
    try {
      await addOrder(selectedItems, items, totalPrice, notes, selectedDate);
      alert("Order placed successfully!");
      setIsModalOpen(false);
    } catch (error) {
      alert("Failed to place the order.");
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Add-On for your stay</h1>
      <div className="space-y-6">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center border rounded-lg shadow-md p-4 space-x-4"
            >
              <img
                src={item.imageUrl || "https://via.placeholder.com/80"}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-lg font-semibold text-green-600">
                  RM{item.price}
                </p>
              </div>
              <div>
                <select
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value, 10))
                  }
                  className="border rounded-lg p-2"
                  defaultValue={0}
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No add-ons available.</p>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label className="font-semibold">
          Select Date (Starting 3 Days Ahead):
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date(new Date().setDate(new Date().getDate() + 3))} // Start from 3 days ahead
          className="border rounded-lg p-2 w-full"
          placeholderText="Select a date"
        />
                <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border rounded-lg p-2"
          rows={3}
          placeholder="Add any additional notes here..."
        />
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
      >
        Proceed to Confirm
      </button>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Order Confirmation"
        className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl font-bold mb-4">Order Confirmation</h2>
        <div className="space-y-2">
          {selectedItems.map((item) => {
            const product = items.find((i) => i.id === item.id);
            return (
              <div key={item.id} className="flex justify-between">
                <span>
                  {product?.title} x {item.quantity}
                </span>
                <span>RM{(product?.price || 0) * item.quantity}</span>
              </div>
            );
          })}
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total Price:</span>
            <span>RM{totalPrice}</span>
          </div>
          <div>
            <p className="font-semibold">
              Date: {selectedDate?.toDateString()}
            </p>
            <p className="font-semibold">
              Notes: {notes || "No additional notes"}
            </p>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-400 text-white py-2 px-4 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
}
