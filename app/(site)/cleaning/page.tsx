"use client";

import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";
import React from "react";
// import { getCarLogsOnDateRange, getCarPartsList, getHouseLogsOnDateRange } from "../../service/firebase.service";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import { getCleaningList } from "../service/firebase.service";

export default function Cleaning() {
  const router = useRouter();
  var [carParts, updateCarParts]: any = useState([{}]);
  var [total, updateTotal] = useState(0.0);
  var [year, updateYear] = useState(2023);
  const params = useParams();
  console.log(params);

  useEffect(() => {
    // getCarPartsList(params["vehicleId"].toString()).then((val) => {
    //   updateCarParts(val);
    //   calculateTotal(val);
    // });
    getCleaningList().then((val) => {
      console.log(val)
      updateCarParts(val);
    });
  }, []);

  function calculateTotal(val: any) {
    var total = 0.0;
    for (var i = 0; i < val.length; i++) {
      console.log(val[i]["price"]);
      total += val[i]["price"];
    }
    console.log(total);
    updateTotal(total);
  }

  const [open, setOpen] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  function handleClickOpen(file: any) {
    setFileName(file);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  function addLogs() {
    router.push("/newVehicleLogs/" + params["vehicleId"].toString());
  }

  var [monthVal, updateMonthVal] = useState(1);
  function updateMonth(event: SelectChangeEvent<number>): void {
    const vale: string | number = event.target.value.toString();
    updateMonthVal(parseInt(vale));
  }

  function updateYearVal(event: SelectChangeEvent<number>) {
    const vale: string | number = event.target.value.toString();
    updateYear(parseInt(vale));
  }

  function getHouseLogs(): void {
    console.log(params["vehicleId"].toString());
    console.log(year);
  }

  return (
    <div className="p-5 h-screen bg-gray-100">
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Image</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <img src={fileName} alt="" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Dismiss</Button>
      </DialogActions>
    </Dialog>
    <div className="grid grid-cols gap-4 p-4">
    Upcoming cleaning
    {carParts.map((row: any, i: number) => {
      return ( <div key={i}>asd</div> )
    })}
      <div className="overflow-auto rounded-lg shadow">
        
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                No.
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                House Name
              </th>
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {carParts.map((row: any, i: number) => (
              <tr key={i} className="bg-white">
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <a
                    href="#"
                    className="font-bold text-blue-500 hover:underline"
                  >
                    {i + 1}
                  </a>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row["houseName"]}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row["date"]
                    ? moment(row["date"].toDate()).format("DD-MM-YYYY")
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="grid grid-cols-1 gap-1">
        Upcoming Cleaning List
        {carParts.map((row, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 text-sm">
              <div>Date: </div>
              <div>
                <strong>
                  {row["date"]
                    ? moment(row["date"].toDate()).format("DD-MM-YYYY")
                    : ""}
                </strong>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div>Location: </div>
              <div>
                <strong>{row["houseName"]}</strong>
              </div>
            </div>
          </div>
        ))}
      </div> */}

    </div>
  </div>
  );
}
