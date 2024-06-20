"use client";

import { useRouter } from "next/navigation";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import InputIcon from "@mui/icons-material/Input";
import Dialog from "@mui/material/Dialog";
import moment from "moment";
import {
  deleteHouseLog,
  getHouseDetails,
  getHouseLogsOnDateRange,
} from "../../service/firebase.service";
import { confirmAlert } from "../../service/alert.service";
import React from "react";
import DialogActions from "@mui/material/DialogActions";
import PhotoIcon from "@mui/icons-material/Photo";
import { getStorage, ref, deleteObject } from "firebase/storage";
import firebase from "../../../clientApp";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { LoadingIndicator } from "@/app/component/indicator/Loading";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export default function HouseLogs() {
  const storage = getStorage(firebase.app());
  const [open, setOpen] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  function handleClickOpen(file: any) {
    setFileName(file);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();

  function createNewLogs() {
    router.push("/newLogs/" + params["houseId"]);
  }
  var [houseDetail, updatehouseDetail] = useState({});
  var [houseLogs, setHouseLogs]: any = useState();
  var [amount, updateAmount] = useState(0);
  var [monthVal, updateMonthVal] = useState(1);
  var [yearVal, updateYear] = useState(2023);
  const params = useParams();

  useEffect(() => {
    // get the year, month and house id
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    getHouseLogsOnDateRange(params["houseId"].toString(), month, year).then(
      (val: any) => {
        updateMonthVal(month);
        updateYear(year);
        setHouseLogs(val);
        updateTotalAmount(val ?? []);
      }
    );
    getHouseDetails(params["houseId"].toString()).then((val) => {
      updatehouseDetail(val);
    });
  }, []);

  async function updateMonth(event: SelectChangeEvent<number>): Promise<void> {
    const vale: string | number = event.target.value.toString();
    updateMonthVal(parseInt(vale))
    getHouseLogs(parseInt(vale), undefined)
  }

  function updateYearVal(event: SelectChangeEvent<number>) {
    const vale: string | number = event.target.value.toString();
    updateYear(parseInt(vale));
    getHouseLogs(undefined, parseInt(vale))
  }

  function getHouseLogs(month?: number, year?: number): void {
    let targetMonth = month ?? monthVal
    let targetYear = year ?? yearVal
    console.log(params["houseId"])
    getHouseLogsOnDateRange(params["houseId"].toString(), targetMonth, targetYear).then(
      (val: any) => {

        updateMonthVal(targetMonth);
        updateYear(targetYear);
        updateTotalAmount(val);
        setHouseLogs(val);
      }
    );
  }

  function updateTotalAmount(houseLogs: any) {
    amount = houseLogs.reduce((a: any, b: any) => +a + +b.total, 0);
    updateAmount(Number.isNaN(amount) ? 0.0 : amount);
  }

  function editItem(houseId: string){
    router.push("/editHouseLogs/" + houseId);
  }

  function deleteItem(event: any, filenameForDelete: any) {
    // delete this and show alert
    console.log(filenameForDelete);
    confirmAlert("delete", "confirm to delete this record?", () => {
      if (filenameForDelete) {
        const fileRef = ref(storage, filenameForDelete);
        deleteObject(fileRef)
          .then(() => {
            console.log("file deleted");
          })
          .catch((error) => {});
      }
      deleteHouseLog(event)
        // .then(() => {
        //   window.location.reload();
        // })
        .catch(function (error: any) {
          console.error("Error removing document: ", error);
        });
    });
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
      <Button variant="outlined" onClick={() => router.back()}>
        Back
      </Button>
      <Button
                style={{ margin: "10px" }}
                variant="outlined"
                className="mt-3"
                onClick={createNewLogs}
                endIcon={<AddIcon />}
              >
                Logs
              </Button>
      <h2>House Details</h2>
      <div className="grid lg:grid-cols-6 gap-4 p-4">
        <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <p className="text-gray-600">Name</p>
            <p className="text-2xl font-bold">
              {" "}
              {(houseDetail as any)["houseName"]}
            </p>
          </div>
        </div>
        <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            {/* <p className="text-gray-600">Installment</p>
            <p className="text-2xl font-bold">
              RM {(houseDetail as any)["installment"]}
            </p> */}
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
        </div>
        <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            {/* <p className="text-gray-600">Maintenance+Sinking</p>
            <p className="text-2xl font-bold">
              RM {(houseDetail as any)["maintenance"]}
            </p> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={yearVal}
                  label="Year"
                  onChange={updateYearVal}
                >
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                </Select>
              </FormControl>
          </div>
        </div>
        <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <p className="text-gray-600">Amount</p>
            <p className="text-2xl font-bold">
            RM {amount.toFixed(2)}{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="col-span border bg-white p-4 rounded-lg">
          <div>
            {" "}
            <img
              alt="Placeholder"
              className="block h-auto w-full"
              src={(houseDetail as any)["house_image"]}
            />{" "}
          </div>
        </div>
        <div className="col-span">
        </div>
        <div className="col-span">
          <div className="grid grid-cols-2 gap-4 ">
            <div className="col-span">
            </div>
            <div className="col-span">
              <div className="col-span">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 p-4"></div>
      <div>
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <div>
            <h1 style={{ float: "left" }}>Logs </h1>
          </div>
          {houseLogs ? (
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                    No.
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Details
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Category
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Image
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Date
                  </th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                    Total
                  </th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                    Edit
                  </th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {houseLogs.map((row: any, i: number) => {
                  let bgColor = "";
                  switch (row["category"]) {
                    case "grocery":
                      bgColor = "text-green-800 bg-green-200";
                      break;
                    case "cleaning":
                      bgColor = "text-blue-800 bg-blue-200";
                      break;
                    case "utility":
                      bgColor = "text-orange-800 bg-orange-200";
                      break;
                    case "utility":
                      bgColor = "text-grey-800 bg-grey-200";
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
                        {row["notes"]}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span
                          className={`p-1.5 text-xs font-medium uppercase tracking-wider ${bgColor} rounded-lg bg-opacity-50`}
                        >
                          <span> {row["category"]} </span>
                        </span>
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <Button
                          endIcon={<PhotoIcon />}
                          onClick={() => {
                            handleClickOpen(row["filename"]);
                          }}
                        ></Button>
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {row["date"]
                          ? moment(row["date"].toDate()).format("DD-MM-YYYY")
                          : ""}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {row["total"]}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <Button
                          endIcon={<ModeEditIcon />}
                          onClick={() =>
                            editItem(row["id"])
                          }
                        ></Button>
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <Button
                          endIcon={<DeleteIcon />}
                          onClick={() =>
                            deleteItem(row["id"], row["filenameForDelete"])
                          }
                        ></Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <LoadingIndicator />
          )}
        </div>
      </div>
    </div>
  );
}
