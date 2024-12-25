"use client";

import firebase from "../../../../clientApp";
import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as yup from "yup";
import { PrimaryTextInputWithLabel } from "../../../../component/input/PrimaryTextInputWithLabel";
import { PrimaryButton } from "../../../../component/button/PrimaryButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import dayjs, { Dayjs } from "dayjs";

import {
  getHouse,
  getHouseLogsOnDateRange,
} from "../../../service/firebase.service";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

type FormData = {
  id: string;
  houseId: string;
  revenue: number;
  cleaning: number;
  electricBill: number;
  waterBill: number;
  wifi: number;
  otherExpenses: number;
  totalExpenses: number;
  profitBeforeAdminCharge: number;
  adminCharge: number;
  profitAfterAdminCharge: number;
  notes: string;
  houseName: string;
  address: string;
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
  const params = useParams();
  const router = useRouter();
  // State hooks
  const [houseDetail, updatehouseDetail] = useState({});
  const [file, setFile] = useState<File>();

  const [message, setMessage] = useState("");
  const todayDate = new Date();
  const day = todayDate.toLocaleString("en-US", { day: "2-digit" });
  const month = todayDate.toLocaleString("en-US", { month: "long" });
  const month2 = todayDate.toLocaleString("en-US", { month: "2-digit" });
  const year = todayDate.getFullYear();
  const [value, setDateValue] = React.useState<Dayjs | null>(
    dayjs(`${year}-${month}-${day}`)
  );
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      revenue: 0.0,
      cleaning: 0.0,
      electricBill: 0.0,
      waterBill: 0.0,
      wifi: 0.0,
      otherExpenses: 0.0,
      totalExpenses: 0.0,
      profitBeforeAdminCharge: 0.0,
      adminCharge: 0.0,
      profitAfterAdminCharge: 0.0,
      notes: "",
      houseName: "",
      address: "",
    },
  });

  // Watch for changes in these fields
  const revenue = watch("revenue", 0);
  const cleaning = watch("cleaning", 0);
  const electricBill = watch("electricBill", 0);
  const waterBill = watch("waterBill", 0);
  const wifi = watch("wifi", 0);
  const otherExpenses = watch("otherExpenses", 0);

  async function getData() {
    getHouse(params["houseId"].toString()).then((val) => {
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
      setValue("otherExpenses", accumulateAmount);
    });
  }

  useEffect(() => {
    getData();
    // Convert undefined or null to 0
    const cleanValue = (val: any) => (val ? Number(val) : 0);

    const totalExpenses =
      cleanValue(cleaning) +
      cleanValue(electricBill) +
      cleanValue(waterBill) +
      cleanValue(wifi) +
      cleanValue(otherExpenses);

    setValue("totalExpenses", totalExpenses);

    const profitBeforeAdminCharge = cleanValue(revenue) - totalExpenses;
    setValue("profitBeforeAdminCharge", profitBeforeAdminCharge);

    const adminCharge = profitBeforeAdminCharge * 0.2;
    setValue("adminCharge", adminCharge);

    const profitAfterAdminCharge = profitBeforeAdminCharge - adminCharge;
    setValue("profitAfterAdminCharge", profitAfterAdminCharge);
  }, [
    revenue,
    cleaning,
    electricBill,
    waterBill,
    wifi,
    otherExpenses,
    setValue,
  ]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    const date = value!.format("YYYY-MM-DD");

    
    var submitData = {
      date: new Date(date),
      revenue: Number(data.revenue),
      cleaning: Number(data.cleaning),
      electricBill: Number(data.electricBill),
      waterBill: Number(data.waterBill),
      wifi: Number(data.wifi),
      otherExpenses: Number(data.otherExpenses),
      totalExpenses: Number(data.totalExpenses),
      profitBeforeAdminCharge: Number(data.profitBeforeAdminCharge),
      adminCharge: Number(data.adminCharge),
      profitAfterAdminCharge: Number(data.profitAfterAdminCharge),
      notes: data.notes,
      houseId: params["houseId"],
      filename: '',
      filenameForDelete: ''
    };




    if (file) {
      file?.arrayBuffer().then((val) => {
        const storage = getStorage(firebase.app());
        const filenameForDelete =
          "/uploads/" +
          "profitLossBreakdown" +
          params["houseId"] +
          `_${year}-${month}-${day}.pdf`;
        const storageref = ref(storage, filenameForDelete);

        const uploadTask = uploadBytesResumable(storageref, val);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            // setProgressUpload(progress) // to show progress upload
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // message.error(error.message)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              //url is download url of file
              console.log(url);
              // setDownloadURL(url)
              // we get the url here, then start updating the logs
              submitData["filename"] = url;
              submitData["filenameForDelete"] = filenameForDelete;
              firebase
                .firestore()
                .collection("/profitLossBreakdowns")
                .doc()
                .set(submitData)
                .then(() => {
                  alert("success!");
                });
            });
          }
        );
      });
    } else {
      submitData["filename"] = "";
      firebase
        .firestore()
        .collection("/profitLossBreakdowns")
        .doc()
        .set(submitData)
        .then(() => {
          alert("success!");
        });
    }
  };

  return (
    <div className="p-2 space-y-10">
      <Button variant="outlined" onClick={() => router.back()}>
          Back
        </Button>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <h1>New Monthly Revenue</h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="col-span">
            <Stack spacing={2} sx={{ width: 300 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Controlled picker"
                    value={value}
                    onChange={(newValue) => setDateValue(newValue)}
                    format="DD/MM/YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
              <input
                accept="application/pdf"
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              <PrimaryTextInputWithLabel
                label="Revenue"
                name="revenue"
                placeholder=""
                type="decimal"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Cleaning"
                name="cleaning"
                placeholder=""
                type="decimal"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Electric bill"
                name="electricBill"
                placeholder=""
                type="decimal"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Water bill"
                name="waterBill"
                placeholder=""
                type="decimal"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Wifi"
                name="wifi"
                placeholder=""
                type="decimal"
                required
                errors={errors}
                register={register}
              />
            </Stack>
          </div>
          <div className="col-span">
            <Stack spacing={2} sx={{ width: 300 }}>
              <PrimaryTextInputWithLabel
                label="Other Expenses"
                name="otherExpenses"
                placeholder=""
                type="decimal"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Total Expenses"
                name="totalExpenses"
                placeholder=""
                type="decimal"
                disabled
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Profit before 20% charge"
                name="profitBeforeAdminCharge"
                placeholder=""
                type="decimal"
                disabled
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="20% charge"
                name="adminCharge"
                placeholder=""
                type="decimal"
                disabled
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Profit after 20% charge"
                name="profitAfterAdminCharge"
                placeholder=""
                type="decimal"
                disabled
                register={register}
              />
              <textarea
                // name="notes"
                placeholder="insert '//' at the end of each line"
                rows={4}
                className="border rounded px-3 py-2 w-full"
                {...register("notes")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // Prevent form submission
                    const target = e.target as HTMLTextAreaElement;
                    const start = target.selectionStart;
                    const end = target.selectionEnd;
                    const value = target.value;

                    // Insert a newline at the cursor position
                    target.value =
                      value.slice(0, start) + "\n" + value.slice(end);
                    target.setSelectionRange(start + 1, start + 1);
                  }
                }}
              ></textarea>
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
        </div>
      </form>
    </div>
  );
}