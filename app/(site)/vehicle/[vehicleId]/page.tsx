"use client";

import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";
import React from "react";
import { getCarPartsList } from "../../service/firebase.service";
import moment from "moment";
import { useParams, useRouter } from "next/navigation"
 
export default function Vehicle() {
  const router = useRouter()
  var [carParts, updateCarParts]: any = useState([{}]);
  var [total, updateTotal] = useState(0.0)
  const params = useParams();
  console.log(params)
  useEffect(() => {
    getCarPartsList(params['vehicleId'].toString()).then((val) => {
      updateCarParts(val)
      calculateTotal(val)
    })
  }, [])

  function calculateTotal(val: any){
    var total = 0.0
    for (var i =0; i < val.length; i++){
      console.log(val[i]['price'])
      total += val[i]['price']
    }
    console.log(total)
    updateTotal(total)
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

  function addLogs(){
    router.push('/newVehicleLogs/'+ params['vehicleId'].toString())
  }

  return (
    <div className="p-5 h-screen bg-gray-100">
      <Button variant="outlined" onClick={() => router.back()}>Back</Button>
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
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <div>
            <h1  style ={{ float: "left" }}>Vehicle Logs </h1>
          </div>
          <div>
            <h1  style ={{ float: "right" }}>Total: RM { total } </h1>
          </div>
          <div>
            <h1 className="bg-blue-100" style ={{ float: "right" }}> 
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
                  <tr key={row["id"]} className="bg-white">
                    <td
                      className="p-3 text-sm text-gray-700 whitespace-nowrap"
                    >
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
