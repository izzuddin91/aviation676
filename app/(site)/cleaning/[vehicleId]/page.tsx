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
import { getCarLogsOnDateRange, getCarPartsList, getHouseLogsOnDateRange } from "../../service/firebase.service";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";

export default function Vehicle() {
  const router = useRouter();
  var [carParts, updateCarParts]: any = useState([{}]);
  var [total, updateTotal] = useState(0.0);
  var [year, updateYear] = useState(2023);
  const params = useParams();
  
  useEffect(() => {
    getCarPartsList(params["vehicleId"].toString()).then((val) => {
      updateCarParts(val);
      calculateTotal(val);
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

    console.log(params["vehicleId"].toString())
    console.log(year)
    getCarLogsOnDateRange(params["vehicleId"].toString(), monthVal, year).then(
      (val: any) => {
        console.log(val)
        updateMonthVal(monthVal);
        updateYear(year);
        calculateTotal(val);
        updateCarParts(val)
      }
    );
  }

  return (
    <div className="p-5 h-screen bg-gray-100">
      <Button variant="outlined" onClick={() => router.back()}>
        Back
      </Button>
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

      <div className="grid grid-cols-5 gap-4 p-4">
        <div className="col-span">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={monthVal}
              label="Month"
              onChange={updateMonth}
            >
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-span">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              label="Year"
              onChange={updateYearVal}
            >
              <MenuItem value={2019}>2019</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-span">
          <Button
            style={{ margin: "10px" }}
            variant="outlined"
            className="mt-3"
            onClick={getHouseLogs}
            endIcon={<SearchIcon />}
          >
            Query
          </Button>
        </div>
      </div>

      <div className="grid grid-cols gap-4 p-4">
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <div>
            <h1 style={{ float: "left" }}>Vehicle Logs </h1>
          </div>
          <div>
            <h1 style={{ float: "right" }}>Total: RM {total} </h1>
          </div>
          <div>
            <h1 className="bg-blue-100" style={{ float: "right" }}>
              <Button onClick={addLogs}>ADD LOG</Button>
            </h1>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  No.
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Parts Name
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Description
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Price
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Image
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Date
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Age Span
                </th>
                {/* <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Delete
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {carParts.map((row: any, i: number) => {
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
                      {row["partsName"]}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                        <a href={row["photoLink"]}>{row["description"]}</a>
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {row["price"]}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <Button
                        endIcon={<PhotoIcon />}
                        onClick={() => {
                          handleClickOpen(row["photoLink"]);
                        }}
                      ></Button>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {row["date"]
                        ? moment(row["date"].toDate()).format("DD-MM-YYYY")
                        : ""}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {row["lifespan"]}
                    </td>
                    {/* <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <button onClick={() => deleteItem(row['id'])}>
                        {row['id']}
                      </button>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
