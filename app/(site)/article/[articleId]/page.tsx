"use client";

import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import dayjs, { Dayjs } from "dayjs";

import moment from "moment";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

type FormData = {
  houseName: string;
  installment: number;
  address: string;
  maintenance: number;
  sinkingFund: number;
  currentMonthExpenses: number;
  currentMonthRevenue: number;
  wifi: number;
  notes: string;
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
  console.log(params["articleId"].toString());
  async function getData() {}
  return (
    <div className="grid lg:grid-cols-1 gap-4 p-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">
            Airbnb: Play around dengan harga
          </p>
          <br />
          <p className="text-gray-600">
            Hi guys, kali ini aku nk share sedikit cara untuk utilize price
            adjustment utk unit airbnb. salah satu advantage airbnb adalah kalau
            compare to sewa biasa, korang boleh adjust harga sewaan unit tu utk
            weekly, or even monthly. Let say korang ada plan untuk sewakan
            dengan harga 120 per malam. and kadang2 ada juga guest yang tanya
            `berapa kalau nak sewa sebulan`. kalau ikut kiraan, 120 kali 30
            malam ialah 3600 per month, which in this case mmg x masuk akal
            (since rate sewa hanyalah 1400).
          </p>
          <br />
          <div
            style={{ height: "450px" }}
            className="h-56 grid grid-cols-3 gap-4 content-evenly h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"
          >
            <div></div>
            <div >
              <img className="object-contain rounded-lg"
                src="https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/article%2FScreenshot%202024-05-11%20at%205.39.08%20PM.png?alt=media&token=a80e0cc7-60f4-4cd3-b923-83b67ed97b04"
                alt=""
                style={{ height: "400px" }}
              />
            </div>
            <div></div>
          </div>

          <br />
          <p className="text-gray-600">
            Bukak airbnb host dashboard, masukkan jumlah diskaun yg bersesuaian.
            kalau tak sure x apa, dekat situ ada slider yg korang boleh gunakan
            untuk adjust ikut harga yg korang nak. make sure untuk masukkan
            sekali harga anggaran untuk tnb, air, dan other utilities.
          </p>
          <br />
          <div
            style={{ height: "450px" }}
            className="h-56 grid grid-cols-3 gap-4 content-evenly h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg"
          >
            <div></div>
            <div>
              <img className="object-contain rounded-lg"
                src="https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/article%2FScreenshot%202024-05-11%20at%205.36.20%20PM.png?alt=media&token=87a7c76c-6cba-4c83-aae1-6ce41f608f3c"
                alt=""
                style={{ height: "400px" }}
              />
            </div>
            <div></div>
          </div>
          <br />
          <p className="text-gray-600">
            Let say korang dah kurangkan harga, tapi bila tengok balik mcm x
            berbaloi la kalau nak letakkan harga 120 untuk satu malam ? dekat
            sini juga korang boleh utilise avialability section, dekat sini make
            sure utk increase minimum night stay per booking. so now you already
            filter out the 1 day stay tenant , and at minimum per booking korang
            boleh dapat 200-300 per stay.
          </p>
        </div>
      </div>
    </div>
  );
}
