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
  profitBeforeAdminCharge: number
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
  var [houseDetail, updatehouseDetail] = useState({});
  const [file, setFile] = useState<File>();
  const todayDate = new Date();
  const day = todayDate.toLocaleString("en-US", { day: "2-digit" });
  const month = todayDate.toLocaleString("en-US", { month: "long" });

  const year = todayDate.getFullYear();
  const [value, setDateValue] = React.useState<Dayjs | null>(
    dayjs(`${year}-${month}-${day}`)
  );
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  const month2 = todayDate.toLocaleString("en-US", { month: "2-digit" });


  async function getData() {
    getHouse(params["houseId"].toString()).then((val) => {
      setValue("revenue", val["revenue"]);
      setValue("cleaning", val["cleaning"]);
      setValue("electricBill", val["electricBill"]);
      setValue("waterBill", val["waterBill"]);
      setValue("wifi", val["wifi"]);
      setValue("otherExpenses", val["otherExpenses"]);
      setValue("totalExpenses", val["totalExpenses"]);
      setValue("profitBeforeAdminCharge", val["profitBeforeAdminCharge"]);
      setValue("adminCharge", val["adminCharge"]);
      setValue("profitAfterAdminCharge", val["profitAfterAdminCharge"]);
      setValue("notes", val["notes"]);
      setValue("id", params["houseId"].toString());
      setValue("houseId", val["houseId"].toString());
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
      id: data.id,
      houseId: data.houseId,
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
        console.log(storageref);
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
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
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
                onChange={(e) => {
                  console.log(e.target.files);

                  setFile(e.target.files?.[0]);
                }}
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
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Profit before 20% charge"
                name="profitBeforeAdminCharge"
                placeholder=""
                type="decimal"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="20% charge"
                name="adminCharge"
                placeholder=""
                type="decimal"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Profit after 20% charge"
                name="profitAfterAdminCharge"
                placeholder=""
                type="decimal"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Notes"
                name="notes"
                placeholder=""
                type="string"
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
