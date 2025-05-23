"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // For accessing URL params
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  getMontlyOccupantList,
  addMonthlyOccupant,
} from "@/app/(site)/service/firebase.service"; // Importing addMonthlyOccupant
import moment from "moment";

export default function TablePage() {
    const params = useParams();
    const id = params.id;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    date: "",
    name: "",
    occupy: 0,
    rentalAmount: 0.0,
  });

  useEffect(() => {
    console.log(params['houseId'])
    const fetchData = async () => {
      try {
        const result = await getMontlyOccupantList(params['houseId'].toString()); // Replace with the actual ID
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

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
      const formattedDate = new Date(date); // Ensuring the date is a Date object
      const result = await addMonthlyOccupant(
        formattedDate,
        name,
        occupy,
        rentalAmount,
        params['houseId'].toString()
      );
      console.log(result);
      setData([...data, result]);
      setShowModal(false);
      //   setNewRecord({ date: "", name: "", occupy: 0, rentalAmount: 0.0 }); // Reset form
    } catch (error) {
      console.error("Error adding new record: ", error);
    }
  };

  return (
    <div>
      <h1>Rental Information</h1>
      <button
        onClick={() => setShowModal(true)}
        style={{ marginBottom: "20px" }}
      >
        Add New Record
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Occupy
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Rental
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {row["date"]
                  ? row["date"].toDate
                    ? moment(row["date"].toDate()).format("DD-MM-YYYY") // Firestore Timestamp
                    : moment(row["date"]).format("DD-MM-YYYY") // Assume string or Date object
                  : ""}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {row.name}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {row.occupy}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {row.rentalAmount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Dialog open={showModal}>
          <DialogTitle>Add new occupant</DialogTitle>
          <DialogContent>
            <div>
              <form>
                <div style={{ marginBottom: "10px" }}>
                  <label>Dates:</label>
                  <input
                    type="date"
                    name="date"
                    value={newRecord.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newRecord.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Occupy:</label>
                  <input
                    type="number"
                    name="occupy"
                    value={newRecord.occupy}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Rental:</label>
                  <input
                    type="number"
                    name="rentalAmount"
                    step="0.01"
                    value={newRecord.rentalAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={addNewRecord}>Add</Button>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Additional details go here.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Dismiss</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
