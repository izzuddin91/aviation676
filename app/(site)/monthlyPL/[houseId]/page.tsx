"use client";

import firebase from "../../../clientApp";
import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as yup from "yup";
import { PrimaryTextInputWithLabel } from "../../../component/input/PrimaryTextInputWithLabel";
import { PrimaryButton } from "../../../component/button/PrimaryButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import {
  getHouseDetails,
  getHouseList,
  getHouseLogsOnDateRange,
  getProfitLossBreakdown,
} from "../../service/firebase.service";
import moment from "moment";
import BarChart from "@/app/component/bar-chart";
import PhotoIcon from "@mui/icons-material/Photo";

type FormData = {
  houseName: string;
  installment: number;
  address: string;
  maintenance: number;
  sinkingFund: number;
  currentMonthExpenses: number;
  currentMonthRevenue: number;
  wifi: number;
};
const formSchema = yup
  .object({
    // logsTitle: yup.string().required("please key in title"),
    houseName: yup.string().required("please key in description"),
    text2Key: yup.string().default(" "),
    text2Value: yup.string().required(" "),
    installment: yup.number().required("need to add installment"),
  })
  .required();

export default function HouseLogs() {
  var [profitLoss, updateProfitLoss] = useState([{}]);
  var [houseDetail, updatehouseDetail] = useState({});
  const [file, setFile] = useState<File>();
  const todayDate = new Date();
  const day = todayDate.toLocaleString("en-US", { day: "2-digit" });
  const month = todayDate.toLocaleString("en-US", { month: "long" });

  const year = todayDate.getFullYear();
  var [amount, updateAmount] = useState(0.0);
  const [value, setDateValue] = React.useState<Dayjs | null>(
    dayjs(`${year}-${month}-${day}`)
  );
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  var [houses, updateHouses]: any = useState([{}]);
  const month2 = todayDate.toLocaleString("en-US", { month: "2-digit" });

  var [monthArray, updateMonthArray] = useState([""]);
  var [monthExpenses, updateMonthExpenses] = useState([0.0]);
  var [monthProfit, updateMonthProfit] = useState([0.0]);

  async function getData() {
    getHouseDetails(params["houseId"].toString()).then((val) => {
      console.log(val);
      updatehouseDetail(val);
      setValue("houseName", val["houseName"]);
      setValue("installment", val["installment"]);
      setValue("address", val["address"]);
      setValue("maintenance", val["maintenance"]);
      setValue("address", val["address"]);
      setValue("sinkingFund", val["sinkingFund"]);
      setValue("wifi", val["wifi"]);
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
      setValue("currentMonthExpenses", accumulateAmount);
    });

    getProfitLossBreakdown(params["houseId"].toString()).then((val) => {
      for (var i = 0; i < val.length; i++) {
        const dateValue = moment(val[i]["date"].toDate()).format("DD-MM-YYYY");
        monthArray.push(dateValue);
        monthExpenses.push(val[i]["expenses"]);
        monthProfit.push(val[i]["profit"]);
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

  function setForm() {
    const data2 = new FormData();
  }

  const [message, setMessage] = useState("");
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    // resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(value!.format("DD/MM/YYYY"));
    const date = value!.format("YYYY-MM-DD");

    console.log(date);
    console.log(data);
    const currentExpenses = Number(data.currentMonthExpenses);
    const totalExpenses =
      Number(data.installment) +
      Number(data.maintenance) +
      Number(data.sinkingFund) +
      Number(data.wifi) +
      currentExpenses;
    const currentMonthRevenue = Number(data.currentMonthRevenue);

    const margin = currentMonthRevenue - totalExpenses;

    var submitData = {
      date: new Date(date),
      expenses: totalExpenses,
      profit: currentMonthRevenue,
      margin: Number(margin.toFixed(2)),
      houseId: params["houseId"],
    };

    console.log(submitData);
    firebase
      .firestore()
      .collection("/profitLossBreakdowns")
      .doc()
      .set(submitData)
      .then(() => {
        alert("success!");
      });
  };

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
  const [fileName, setFileName] = React.useState("");
  function handleClickOpen(file: any) {
    window.open(file, '_blank')
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="p-2 space-y-10">
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Image</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <embed src={fileName} type="application/pdf"   height="700px" width="500"/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Dismiss</Button>
        </DialogActions>
      </Dialog>
      <div>
        <Button style={{'margin': '10px'}} variant="outlined" onClick={() => router.back()}>
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
              Profit Margin
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
              Date
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
              File
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
                    <span> {row["expenses"]} </span>
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <span
                    className={`p-1.5 text-xs font-medium uppercase tracking-wider ${bgColor} rounded-lg bg-opacity-50`}
                  >
                    <span> {row["profit"]} </span>
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <span
                    className={`p-1.5 text-xs font-medium uppercase tracking-wider ${bgColor} rounded-lg bg-opacity-50`}
                  >
                    <span> {row["margin"]} </span>
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {row["date"]
                    ? moment(row["date"].toDate()).format("DD-MM-YYYY")
                    : ""}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <Button
                        endIcon={<PhotoIcon />}
                        onClick={() => {
                          handleClickOpen(row["filename"]);
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
