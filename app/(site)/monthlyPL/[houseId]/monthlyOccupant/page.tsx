"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  getMontlyOccupantList,
  addMonthlyOccupant,
} from "@/app/(site)/service/firebase.service";
import moment from "moment";

export default function TablePage() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    date: "",
    name: "",
    occupy: 0,
    rentalAmount: 0.0,
  });
  const [totalOccupy, setTotalOccupy] = useState(0);
  const [totalRentalAmount, setTotalRentalAmount] = useState(0.0);

  useEffect(() => {
    const fetchData = async () => {
      if (params["houseId"]) {
        try {
          const result = await getMontlyOccupantList(params["houseId"].toString());
          if (result.length > 0) {
            setData(result);
            calculateTotals(result);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
    };

    fetchData();
  }, [params["houseId"]]);

  const calculateTotals = (occupants: any[]) => {
    let totalOccupyCount = 0;
    let totalRental = 0.0;
    occupants.forEach((occupant) => {
      totalOccupyCount += occupant.occupy || 0;
      totalRental += occupant.rentalAmount || 0.0;
    });
    setTotalOccupy(totalOccupyCount);
    setTotalRentalAmount(totalRental);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRecord({
      ...newRecord,
      [name]:
        name === "occupy"
          ? parseInt(value, 10)
          : name === "rentalAmount"
          ? parseFloat(value)
          : value,
    });
  };

  const addNewRecord = async () => {
    try {
      const { date, name, occupy, rentalAmount } = newRecord;
      const formattedDate = new Date(date);
      const result = await addMonthlyOccupant(
        formattedDate,
        name,
        occupy,
        rentalAmount,
        params["houseId"].toString()
      );
      setData([...data, result]);
      calculateTotals([...data, result]);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding new record: ", error);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-semibold">Rental Information</h1>
      <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>
        Add New Record
      </Button>
      <div className="overflow-x-auto rounded-lg shadow-md mt-4">
        <table className="w-full border-collapse bg-white rounded-lg">
          <thead className="bg-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="p-4 text-sm font-semibold tracking-wide text-left">Date</th>
              <th className="p-4 text-sm font-semibold tracking-wide text-left">Name</th>
              <th className="p-4 text-sm font-semibold tracking-wide text-left">Occupy</th>
              <th className="p-4 text-sm font-semibold tracking-wide text-left">Rental</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4 text-sm text-gray-700">
                  {row["date"]
                    ? row["date"].toDate
                      ? moment(row["date"].toDate()).format("DD-MM-YYYY")
                      : moment(row["date"]).format("DD-MM-YYYY")
                    : ""}
                </td>
                <td className="p-4 text-sm text-gray-700">{row.name || ""}</td>
                <td className="p-4 text-sm text-gray-700">{row.occupy || 0}</td>
                <td className="p-4 text-sm text-gray-700">RM {row.rentalAmount?.toFixed(2) || "0.00"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-gray-700">
        <strong>Total Occupy: </strong> {totalOccupy} <br />
        <strong>Total Rental Amount: </strong> RM {totalRentalAmount.toFixed(2)}
      </div>

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Add new occupant</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Date"
            type="date"
            name="date"
            value={newRecord.date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            name="name"
            value={newRecord.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Occupy"
            type="number"
            name="occupy"
            value={newRecord.occupy}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Rental Amount"
            type="number"
            name="rentalAmount"
            value={newRecord.rentalAmount}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addNewRecord}>Add</Button>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}