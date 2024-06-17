"use client";

import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import {
  deleteProfitLossBreakdown,
  getHouseDetails,
  getHouseLogsOnDateRange,
  getProfitLossBreakdowns,
} from "../../service/firebase.service";
import moment from "moment";
import BarChart from "@/app/component/bar-chart";
import PhotoIcon from "@mui/icons-material/Photo";
import ModeEdit from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { confirmAlert, successAlert } from "../../service/alert.service";

export default function HouseLogs() {
  var [profitLoss, updateProfitLoss] = useState([{}]);
  var [houseDetail, updatehouseDetail] = useState({});
  var [descStringArray, updateDescStringArray] = useState([""]);
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  const month2 = todayDate.toLocaleString("en-US", { month: "2-digit" });
  var [monthArray, updateMonthArray] = useState([""]);
  var [monthExpenses, updateMonthExpenses] = useState([0.0]);
  var [monthProfit, updateMonthProfit] = useState([0.0]);

  async function getData() {
    getHouseDetails(params["houseId"].toString()).then((val) => {
      updatehouseDetail(val);
    });
    var accumulateAmount = 0.0;
    // get the amount for this month, get the total expenses and populate the text field
    getHouseLogsOnDateRange(
      params["houseId"].toString(),
      Number(month2),
      year
    ).then((val) => {
      // add date in the label array for graph
      for (var i = 0; i < val.length; i++) {
        accumulateAmount += val[i]["total"];
      }
      accumulateAmount = Math.round(accumulateAmount * 100) / 100;
    });

    getProfitLossBreakdowns(params["houseId"].toString()).then((val) => {
      for (var i = 0; i < val.length; i++) {
        const dateValue = moment(val[i]["date"].toDate()).format("DD-MM-YYYY");
        monthArray.push(dateValue);
        monthExpenses.push(val[i]["profitBeforeAdminCharge"]);
        monthProfit.push(val[i]["revenue"]);
      }
      monthArray.shift();
      monthExpenses.shift();
      monthProfit.shift();
      updateMonthArray(monthArray);
      updateMonthExpenses(monthExpenses);
      updateMonthProfit(monthProfit);
      updateProfitLoss(val);
    });
  }

  var _ = require("lodash");
  function newMonthlyPL() {
    router.push(`${params["houseId"].toString()}/newMonthlyPL`);
  }

  const labels = monthArray;

  const data2 = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: monthExpenses,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Revenue",
        data: monthProfit,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const [open, setOpen] = React.useState(false);
  function handleClickOpen(file: any) {
    window.open(file, "_blank");
  }
  const handleClose = () => {
    updateDescStringArray([""]);
    setOpen(false);
  };

  function openPopup() {
    setOpen(true);
  }

  function editProfitLoss(id: string) {
    router.push(`${id}/editMonthlyPL`);
  }

  function deleteProfitLoss(id: string) {
    confirmAlert("Warning", "Are you sure to delete?", async () => {
      await deleteProfitLossBreakdown(id).then((val) => {
        if (val == 'success'){
          successAlert('Success', 'Data deleted')
        }
      });
    });
  }

  return (
    <div className="p-2 space-y-10">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Details</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {descStringArray.map((row: any, i: number) => {
              return (
                <tr key={i} className="bg-white">
                  {row}
                </tr>
              );
            })}
          </DialogContentText>
        </DialogContent>
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
        <Button variant="outlined" onClick={() => newMonthlyPL()}>
          Create new PL
        </Button>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>
          House: {(houseDetail as any)["houseName"]}{" "}
        </h1>
        <BarChart data={data2} />
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
          {profitLoss.map((row: any, i: number) => {
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
                  {row["notes"] ? (
                    <a
                      onClick={() => {
                        let a = row["notes"].split("//");
                        for (var i = 0; i < a.length; i++) {
                          descStringArray.push(a[i]);
                        }
                        updateDescStringArray(descStringArray);
                        openPopup();
                      }}
                      style={{ color: "blue" }}
                    >
                      {_.truncate(row["notes"])}
                    </a>
                  ) : (
                    ""
                  )}
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
                  <Button
                    endIcon={<ModeEdit />}
                    onClick={() => {
                      editProfitLoss(row["id"]);
                    }}
                  ></Button>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <Button
                    endIcon={<DeleteIcon />}
                    onClick={() => {
                      deleteProfitLoss(row["id"]);
                    }}
                  ></Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
