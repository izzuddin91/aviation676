"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAddOnList,
  deleteAddOn,
  getHouseList,
} from "../../service/firebase.service";
import secureLocalStorage from "react-secure-storage";
import { Button } from "@mui/material";

const AdminDashboard = () => {
  const router = useRouter();
  const [addOns, setAddOns] = useState<any[]>([]); // State to hold add-ons data
  const [houses, setHouses]: any = useState([]);
  const [loadingAddOns, setLoadingAddOns] = useState(true);
  const [loadingHouses, setLoadingHouses] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  // Fetch add-ons and houses
  useEffect(() => {
    const fetchRoleAndData = async () => {
      const storedRole = secureLocalStorage.getItem("role"); // Retrieve role from storage
      setRole(storedRole as string);

      try {
        // Fetch add-ons
        const addOnsData = await getAddOnList();
        setAddOns(addOnsData);

        // Fetch houses based on role
        const houseList = await getHouseList(storedRole as string);
        setHouses(houseList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingAddOns(false);
        setLoadingHouses(false);
      }
    };

    fetchRoleAndData();
  }, []);

  const handleDeleteAddOn = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      try {
        await deleteAddOn(id); // Call the delete function
        setAddOns((prevAddOns) =>
          prevAddOns.filter((addOn) => addOn.id !== id)
        ); // Remove deleted add-on from UI
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
{/* Add-On Section */}
<div className="mt-10">
  <h2 className="text-xl font-semibold">Add-Ons</h2>
  <Button
    onClick={() => router.push("/admin/addAddOns")}
    variant="contained"
    color="primary"
    className="mt-4"
  >
    Create New Add-On
  </Button>

  {/* Loading Add-Ons */}
  {loadingAddOns ? (
    <p className="mt-4 text-gray-600">Loading add-ons...</p>
  ) : (
    <div className="mt-4">
      {addOns.length > 0 ? (
        addOns.map((addOn) => (
          <div
            key={addOn.id}
            className="flex flex-row items-center border-b py-4 space-x-4"
          >
            {/* Thumbnail */}
            <img
              src={addOn.imageUrl || "https://via.placeholder.com/80"}
              alt={addOn.title}
              className="rounded-lg object-cover w-20 h-20"
            />
            {/* Add-On Details */}
            <div className="flex-1">
              <h3 className="text-lg font-medium">{addOn.title}</h3>
              <p className="text-sm text-gray-600">{addOn.description}</p>
              <p className="text-sm text-gray-800 font-semibold">
                Prices: RM {addOn.price}
              </p>
              {/* Action Buttons */}
              <div className="mt-2 flex space-x-3">
                <Button
                  onClick={() => handleDeleteAddOn(addOn.id)}
                  variant="outlined"
                  size="small"
                >
                  Delete
                </Button>
                <Button
                  onClick={() =>
                    router.push(`/admin/view-add-on/${addOn.id}`)
                  }
                  variant="outlined"
                  size="small"
                >
                  See More
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="mt-4 text-gray-600">No add-ons available.</p>
      )}
    </div>
  )}
</div>


      {/* House List Section */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Houses</h2>
        <Button
    onClick={() => router.push("/admin/addAddOns")}
    variant="contained"
    color="primary"
    className="mt-4"
  >
    Create House
  </Button>
        {houses.length > 0 ? (
          houses.map((row: any) => {
            const link = "/houseLogs/" + row["houseId"];
            return (
              <div
                key={row["houseId"]}
                className="border-b py-4 flex items-center gap-4"
              >
                {/* Image */}
                <img
                  alt={row.houseName}
                  className="rounded-lg object-cover w-20 h-20"
                  src={row["house_image"] || "https://via.placeholder.com/80"}
                />
                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-black">
                    {row.houseName}
                  </h3>
                  <p className="text-sm text-gray-600">{row.location}</p>
                  <div className="mt-2 flex space-x-3">
                    <Button
                      onClick={() =>
                        router.push(
                          `/houseList/${row.houseId}-${row.houseName}`
                        )
                      }
                      variant="outlined"
                      size="small"
                    >
                      Details
                    </Button>
                    <Button
                      onClick={() =>
                        router.push(
                          `${link}-${row.houseName
                            .replaceAll(" ", "_")
                            .replaceAll("@", "_")}`
                        )
                      }
                      variant="outlined"
                      size="small"
                    >
                      Logs
                    </Button>
                    <Button
                      onClick={() => router.push(`/monthlyPL/${row.houseId}`)}
                      variant="outlined"
                      size="small"
                    >
                      Monthly Logs
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="mt-4 text-gray-600">No houses available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
