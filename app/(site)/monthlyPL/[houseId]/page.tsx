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
import { Button, Stack } from "@mui/material";
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
    const currentExpenses  = Number(data.currentMonthExpenses)
    const totalExpenses = Number(data.installment) + Number(data.maintenance) + Number(data.sinkingFund) + Number(data.wifi) + currentExpenses
    const currentMonthRevenue = Number(data.currentMonthRevenue)

    const margin = currentMonthRevenue - totalExpenses

    var submitData = {
      date: new Date(date),
      expenses: totalExpenses,
      profit: currentMonthRevenue,
      margin: Number(margin.toFixed(2)),
      houseId: params["houseId"],
    };

    console.log(submitData)
    firebase
    .firestore()
    .collection("/profitLossBreakdowns")
    .doc()
    .set(submitData)
    .then(() => {
      alert("success!");
    });
    // console.log(submitData);
    // console.log(file);

    // if (file) {
    //   file?.arrayBuffer().then((val) => {
    //     const storage = getStorage(firebase.app());
    //     const filenameForDelete =
    //       "/uploads/" +
    //       data.houseName.replace(" ", "_") +
    //       params["houseId"] +
    //       `_${year}-${month}-${day}.jpg`;
    //     const storageref = ref(storage, filenameForDelete);
    //     console.log(storageref);
    //     const uploadTask = uploadBytesResumable(storageref, val);
    //     uploadTask.on(
    //       "state_changed",
    //       (snapshot) => {
    //         const progress =
    //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    //         // setProgressUpload(progress) // to show progress upload
    //         switch (snapshot.state) {
    //           case "paused":
    //             console.log("Upload is paused");
    //             break;
    //           case "running":
    //             console.log("Upload is running");
    //             break;
    //         }
    //       },
    //       (error) => {
    //         // message.error(error.message)
    //       },
    //       () => {
    //         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //           //url is download url of file
    //           console.log(url);
    //           // setDownloadURL(url)
    //           // we get the url here, then start updating the logs
    //           submitData["house_image"] = url;
    //           firebase
    //             .firestore()
    //             .collection("/houses")
    //             .doc(submitData["houseId"].toString())
    //             .set(submitData)
    //             .then(() => {
    //               alert("success!");
    //             });
    //         });
    //       }
    //     );
    //   });
    // } else {
    //   firebase
    //     .firestore()
    //     .collection("/houses")
    //     .doc(submitData["houseId"].toString())
    //     .set(submitData)
    //     .then(() => {
    //       alert("success!");
    //     });
    // }
  };

  function toChartPage() {
    console.log(monthArray);
    console.log(monthExpenses);
    console.log(monthProfit);
    router.push("/analysis/" + monthArray + monthExpenses + monthProfit);
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

  return (
    <div className="p-2 space-y-10">
      <div>
        <h1 style={{textAlign: 'center'}}>House: {(houseDetail as any)["houseName"] } </h1>
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
              </tr>
            );
          })}
        </tbody>
      </table>

      <Button variant="outlined" onClick={() => router.back()}>
        Back
      </Button>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
        <h1>New Monthly PL</h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="col-span">
            <Stack spacing={2} sx={{ width: 300 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Controlled picker"
                    value={value}
                    onChange={(newValue) => setDateValue(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <PrimaryTextInputWithLabel
                label="Installment"
                name="installment"
                placeholder=""
                type="decimal"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Maintenance"
                name="maintenance"
                placeholder=""
                type="decimal"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Sinking Fund"
                name="sinkingFund"
                placeholder=""
                type="decimal"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="wifi"
                name="wifi"
                placeholder=""
                type="decimal"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Current Expenses"
                name="currentMonthExpenses"
                placeholder=""
                type="decimal"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Month Revenue"
                name="currentMonthRevenue"
                placeholder=""
                type="decimal"
                required
                errors={errors}
                register={register}
              />
              <PrimaryButton
                type="submit"
                className="mt-3"
                isProcessing={isSubmitting}
                disabled={isSubmitting}
              >
                Enter
              </PrimaryButton>
            </Stack>
          </div>
          <div className="col-span">
            <Stack spacing={2} sx={{ width: 300 }}></Stack>
          </div>
        </div>
      </form>
    </div>
  );
}
