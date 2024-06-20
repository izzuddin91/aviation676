"use client";

import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
  getProfitLossBreakdown,
  updateProfitLossBreakdown,
} from "../../../service/firebase.service";
import { successAlert } from "@/app/(site)/service/alert.service";

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

export default function HouseLogs() {
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

  async function getData() {
    // this houseId is not actually the houseId, it's their own id. 
    getProfitLossBreakdown(params["houseId"].toString()).then((val) => {
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

      const returnDate = new Date(val["date"].seconds*1000);
      const day = returnDate.toLocaleString("en-US", { day: "2-digit" });
      const month = returnDate.toLocaleString("en-US", { month: "long" });
      const year = returnDate.getFullYear();

      setDateValue(
        dayjs(`${year}-${month}-${day}`)
      )

    });
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const date = value!.format("YYYY-MM-DD");
    var submitData = {
      date: new Date(date),
      revenue: data.revenue,
      cleaning: data.cleaning,
      electricBill: data.electricBill,
      waterBill: data.waterBill,
      wifi: data.wifi,
      otherExpenses: data.otherExpenses,
      totalExpenses: data.totalExpenses,
      profitBeforeAdminCharge: data.profitBeforeAdminCharge,
      adminCharge: data.adminCharge,
      profitAfterAdminCharge: data.profitAfterAdminCharge,
      notes: data.notes,
      id: data.id,
      houseId: data.houseId
    };
    
    await updateProfitLossBreakdown(data.id, submitData).then((val) => {
      if (val == 'success'){
        successAlert('Success', 'Data updated')
      }
    });
  };

  return (
    <div className="p-2 space-y-10">
      <Button variant="outlined" onClick={() => router.back()}>
        Back
      </Button>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
        <h1>Edit Monthly Revenue</h1>
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
