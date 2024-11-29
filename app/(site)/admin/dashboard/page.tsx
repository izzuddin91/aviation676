"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAddOnList, deleteAddOn } from "../../service/firebase.service";

const AdminDashboard = () => {
  const router = useRouter();
  const [addOns, setAddOns] = useState<any[]>([]); // State to hold add-ons data
  const [loading, setLoading] = useState(true);

  // Fetch add-ons data from Firebase
  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        const data = await getAddOnList();
        setAddOns(data);
      } catch (error) {
        console.error("Failed to fetch add-ons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddOns();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      try {
        await deleteAddOn(id); // Call the delete function
        setAddOns((prevAddOns) => prevAddOns.filter((addOn) => addOn.id !== id)); // Remove deleted add-on from UI
        alert("Add-On deleted successfully!");
      } catch (error) {
        console.error("Failed to delete add-on:", error);
        alert("Failed to delete add-on. Please try again.");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Add-On Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Add-Ons</h2>
        <button
          onClick={() => router.push("/admin/addAddOns")}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Create New Add-On
        </button>

        {/* Loading State */}
        {loading ? (
          <p className="mt-4 text-gray-600">Loading add-ons...</p>
        ) : (
          <div className="mt-4">
            {addOns.length > 0 ? (
              addOns.map((addOn) => (
                <div
                  key={addOn.id}
                  className="border-b py-4 flex items-center gap-4"
                >
                  {/* Thumbnail */}
                  <img
                    src={addOn.imageUrl || "https://via.placeholder.com/80"}
                    alt={addOn.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  {/* Add-On Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{addOn.title}</h3>
                    <p className="text-sm text-gray-600">{addOn.description}</p>
                    <p className="text-sm text-gray-800 font-semibold">
                      Prices: ${addOn.price}
                    </p>
                  </div>
                  {/* Action Buttons */}
                  <button
                    onClick={() => handleDelete(addOn.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      router.push(`/admin/view-add-on/${addOn.id}`)
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    See More
                  </button>
                </div>
              ))
            ) : (
              <p className="mt-4 text-gray-600">No add-ons available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
