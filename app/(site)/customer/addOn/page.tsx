"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Install with: npm install react-datepicker
import "react-datepicker/dist/react-datepicker.css";

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

type SelectedItem = {
  id: number;
  quantity: number;
};

const items: Item[] = [
  {
    id: 1,
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake topped with ganache.",
    price: 25,
    image: "https://www.elevete.com.my/cdn/shop/files/DSC05181.jpg?v=1693386869&width=600",
  },
  {
    id: 2,
    name: "Matcha Set",
    description: "For authentic japanese matcha experience in-house.",
    price: 15,
    image: "https://valleywerks.com/cdn/shop/products/matcha-tea-sets-tea-accessories-Japanese-Tea-tools-set-ceramic-Tea-bowl-tea-sets-complete-set.jpg?v=1689474910&width=1445",
  },
  {
    id: 3,
    name: "Pickleball set (to rent)",
    description: "Enjoy your stay while staying healthy.",
    price: 18,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_EP7kstep2mrpuVF-xNFimUIzfxhRH7wa_A&s",
  },
];

export default function AncillaryRevenue() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");

  const handleQuantityChange = (itemId: number, quantity: number) => {
    setSelectedItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== itemId);
      if (quantity > 0) {
        updatedItems.push({ id: itemId, quantity });
      }
      return updatedItems;
    });
    calculateTotalPrice();
  };

  const calculateTotalPrice = () => {
    const total = selectedItems.reduce((sum, item) => {
      const product = items.find((i) => i.id === item.id);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const handleSubmit = () => {
    alert(`Order Submitted! Total Price: RM${totalPrice}`);
  };

  return (
    <div style={{paddingTop: '60px'}} className="container mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Add-On for your stay</h1>
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center border rounded-lg shadow-md p-4 space-x-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-lg font-semibold text-green-600">RM{item.price}</p>
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
        ))}
      </div>
      <div>
        <button
          onClick={() => setShowSummary(!showSummary)}
          className="bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition"
        >
          {showSummary ? "Hide Summary" : "View Summary"}
        </button>
        {showSummary && (
          <div className="mt-4 border rounded-lg p-4 space-y-4">
            <h2 className="text-xl font-bold">Selected Items</h2>
            {selectedItems.length === 0 ? (
              <p className="text-gray-600">No items selected.</p>
            ) : (
              selectedItems.map((item) => {
                const product = items.find((i) => i.id === item.id);
                return (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {product?.name} x {item.quantity}
                    </span>
                    <span>
                      RM{(product?.price || 0) * item.quantity}
                    </span>
                  </div>
                );
              })
            )}
            <div className="flex justify-between font-bold text-lg">
              <span>Total Price:</span>
              <span>RM{totalPrice}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Select Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="border rounded-lg p-2"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Notes:</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border rounded-lg p-2"
                rows={3}
                placeholder="Add any additional notes here..."
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
