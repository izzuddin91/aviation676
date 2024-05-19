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
import router from "next/router";

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
  const router = useRouter();
  async function getData() {
    console.log('asd')
    router.push("/properties/" + "1");
  }
  return (
    <div className="bg-white">
  <div className="mx-1 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Weekend Houses List</h2>

    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      <div onClick={getData} className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-120">
          <img src="https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2FIMG_6928.jpg?alt=media&token=298d664f-87bd-476f-974b-67c89c232672" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" className="absolute inset-0"></span>
                Tiara Imperio
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">Studio</p>
          </div>
          <p className="text-sm font-medium text-gray-900">Bangi</p>
        </div>
      </div>

      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-120">
          <img src="https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2FIMG_4673.jpg?alt=media&token=890920f2-f23f-4f7e-87df-75e6cb1df0e4" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" className="absolute inset-0"></span>
                Pangsapuri Suakasih
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">3BR</p>
          </div>
          <p className="text-sm font-medium text-gray-900">Cheras</p>
        </div>
      </div>

      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-120">
          <img src="https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2F3.jpeg?alt=media&token=cb013a7d-5539-4882-a595-fdb0ab65697a" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" className="absolute inset-0"></span>
                Trion
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">2BR</p>
          </div>
          <p className="text-sm font-medium text-gray-900">Chan Sow Lin</p>
        </div>
      </div>

      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-120">
          <img src="https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2F3.jpeg?alt=media&token=cb013a7d-5539-4882-a595-fdb0ab65697a" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" className="absolute inset-0"></span>
                Trion
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">2BR</p>
          </div>
          <p className="text-sm font-medium text-gray-900">Chan Sow Lin</p>
        </div>
      </div>
      
    </div>
  </div>
</div>
  )}