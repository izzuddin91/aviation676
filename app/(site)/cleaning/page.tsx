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
    <div className="p-2 space-y-10">
      <div id="container2"></div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Details</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Dismiss</Button>
        </DialogActions>
      </Dialog>
      <div>
        <Button
          style={{ margin: "10px" }}
          variant="outlined"
          onClick={() => router.back()}
        >
          Back
        </Button>

      </div>
      <div>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
              No.
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
              Expenses
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
              Revenue
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
              Date
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
              Notes
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
              File
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
              Edit
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {carParts.map((row: any, i: number) => {
            let bgColor = "";
            switch (row["category"]) {
              case "grocery":
                bgColor = "text-green-800 bg-green-200";
                break;
              case "cleaning":
                bgColor = "text-blue-800 bg-blue-200";
                break;
              case "damage":
                bgColor = "text-red-800 bg-red-200";
                break;
            }
            return (
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
                  <span
                    className={`p-1.5 text-xs font-medium uppercase tracking-wider ${bgColor} rounded-lg bg-opacity-50`}
                  >
                    <span> {row["profitBeforeAdminCharge"]} </span>
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <span
                    className={`p-1.5 text-xs font-medium uppercase tracking-wider ${bgColor} rounded-lg bg-opacity-50`}
                  >
                    <span> {row["revenue"]} </span>
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row["date"]
                    ? moment(row["date"].toDate()).format("DD-MM-YYYY")
                    : ""}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <Button
                    endIcon={<PhotoIcon />}
                    onClick={() => {
                      handleClickOpen(row);
                    }}
                  ></Button>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
