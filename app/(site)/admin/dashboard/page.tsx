"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAddOnList,
  deleteAddOn,
  getHouseList,
  getProfitLossBreakdowns,
} from "../../service/firebase.service";
import secureLocalStorage from "react-secure-storage";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

const AdminDashboard = () => {
  const router = useRouter();
  const [addOns, setAddOns] = useState<any[]>([]);
  const [houses, setHouses]: any = useState([]);
  const [loadingAddOns, setLoadingAddOns] = useState(true);
  const [loadingHouses, setLoadingHouses] = useState(true);
  const [profitData, setProfitData] = useState<any[]>([]);
  const [loadingProfit, setLoadingProfit] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  const [addOnPage, setAddOnPage] = useState(0);
  const [profitPage, setProfitPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchRoleAndData = async () => {
      const storedRole = secureLocalStorage.getItem("role");
      setRole(storedRole as string);

      try {
        const addOnsData = await getAddOnList();
        setAddOns(addOnsData);

        const houseList = await getHouseList(storedRole as string);
        setHouses(houseList);

        const profitLossData = await getProfitLossBreakdowns("");
        const formattedProfitData = profitLossData.map((entry: any) => ({
          date: entry.date.toDate().toLocaleDateString(),
          profit: entry.adminCharge,
        }));
        setProfitData(formattedProfitData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingAddOns(false);
        setLoadingHouses(false);
        setLoadingProfit(false);
      }
    };

    fetchRoleAndData();
  }, []);

  const handleDeleteAddOn = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      try {
        await deleteAddOn(id);
        setAddOns((prevAddOns) =>
          prevAddOns.filter((addOn) => addOn.id !== id)
        );
        alert("Add-On deleted successfully!");
      } catch (error) {
        console.error("Failed to delete add-on:", error);
        alert("Failed to delete add-on. Please try again.");
      }
    }
  };

  const handleAddOnChangePage = (event: unknown, newPage: number) => {
    setAddOnPage(newPage);
  };

  const handleProfitChangePage = (event: unknown, newPage: number) => {
    setProfitPage(newPage);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add-On Section */}
        <div>
          <h2 className="text-xl font-semibold">Add-Ons</h2>
          <Button
            onClick={() => router.push("/admin/addAddOns")}
            variant="contained"
            color="primary"
            className="mt-4"
          >
            Create New Add-On
          </Button>

          {loadingAddOns ? (
            <p className="mt-4 text-gray-600">Loading add-ons...</p>
          ) : (
            <div className="mt-4">
              {addOns.length > 0 ? (
                <>
                  {addOns
                    .slice(addOnPage * rowsPerPage, (addOnPage + 1) * rowsPerPage)
                    .map((addOn, index) => (
                      <div
                        key={addOn.id || index}
                        className="flex flex-row items-center border-b py-4 space-x-4"
                      >
                        <img
                          src={addOn.imageUrl || "https://via.placeholder.com/80"}
                          alt={addOn.title}
                          className="rounded-lg object-cover w-20 h-20"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">{addOn.title}</h3>
                          <p className="text-sm text-gray-600">{addOn.description}</p>
                          <p className="text-sm text-gray-800 font-semibold">
                            Prices: RM {addOn.price}
                          </p>
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
                    ))}
                  <TablePagination
                    component="div"
                    count={addOns.length}
                    page={addOnPage}
                    onPageChange={handleAddOnChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                  />
                </>
              ) : (
                <p className="mt-4 text-gray-600">No add-ons available.</p>
              )}
            </div>
          )}
        </div>

        {/* House List Section */}
        <div>
          <h2 className="text-xl font-semibold">Houses</h2>
          <Button
            onClick={() => router.push("/admin/addHouse")}
            variant="contained"
            color="primary"
            className="mt-4"
          >
            Create House
          </Button>

          {loadingHouses ? (
            <p className="mt-4 text-gray-600">Loading houses...</p>
          ) : (
            <div className="mt-4">
              {houses.length > 0 ? (
                houses.map((row: any, index: any) => (
                  <div
                    key={row["id"] || index}
                    className="border-b py-4 flex items-center gap-4"
                  >
                    <img
                      alt={row.houseName}
                      className="rounded-lg object-cover w-20 h-20"
                      src={row["house_image"] || "https://via.placeholder.com/80"}
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-black">
                        {row.houseName}
                      </h3>
                      <p className="text-sm text-gray-600">{row.location}</p>
                      <div className="mt-2 flex space-x-3">
                        <Button
                          onClick={() =>
                            router.push(
                              `/houseList/${row.id}-${row.houseName}`
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
                              `/houseLogs/${row.id}-${row.houseName
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
                          onClick={() => router.push(`/monthlyPL/${row.id}`)}
                          variant="outlined"
                          size="small"
                        >
                          Monthly Logs
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="mt-4 text-gray-600">No houses available.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Profit by Months Table */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Profit by Months</h2>
        {loadingProfit ? (
          <p className="mt-4 text-gray-600">Loading profit data...</p>
        ) : profitData.length > 0 ? (
          <>
            <Table className="mt-4">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Profit (RM)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profitData
                  .slice(profitPage * rowsPerPage, (profitPage + 1) * rowsPerPage)
                  .map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{data.date}</TableCell>
                      <TableCell>{data.profit}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={profitData.length}
              page={profitPage}
              onPageChange={handleProfitChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]}
            />
          </>
        ) : (
          <p className="mt-4 text-gray-600">No profit data available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
