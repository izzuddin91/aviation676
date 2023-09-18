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
import { getHouseDetails, getHouseList } from "../../service/firebase.service";

type FormData = {
  houseName: string;
  installment: number;
  address: string;
  maintenance: number;
  sinkingFund: number;
  wifi: number;
  text1Key: string;
  text1Value: string;
  text2Key: string;
  text2Value: string;
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
  var [houseImage, updateHouseImage] = useState({});
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
  // console.log(params)

  useEffect(() => {
    getData();
  }, []);

  var [houses, updateHouses]: any = useState([{}]);

  async function getData() {
    getHouseDetails(params["houseId"].toString()).then((val) => {
      console.log(val);
      updateHouseImage(val["house_image"]);
      setValue("houseName", val["houseName"]);
      setValue("installment", val["installment"]);
      setValue("address", val["address"]);
      setValue("maintenance", val["maintenance"]);
      setValue("wifi", val["wifi"]);
      setValue("address", val["address"]);
      setValue("sinkingFund", val["sinkingFund"]);
      setValue("text1Key", val["text1Key"]);
      setValue("text1Value", val["text1Value"]);
      setValue("text2Key", val["text2Key"]);
      setValue("text2Value", val["text2Value"]);
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
      houseName: data.houseName,
      address: data.address,
      installment: data.installment,
      maintenance: data.maintenance,
      sinkingFund: data.sinkingFund,
      text1Key: data.text1Key,
      text1Value: data.text1Value,
      text2Key: data.text2Key ?? "",
      text2Value: data.text2Value ?? "",
      houseId: params["houseId"],
      house_image: houseImage,
      wifi: data.wifi,
    };
    console.log(submitData);
    console.log(file);

    if (file) {
      file?.arrayBuffer().then((val) => {
        const storage = getStorage(firebase.app());
        const filenameForDelete =
          "/uploads/" +
          data.houseName.replace(" ", "_") +
          params["houseId"] +
          `_${year}-${month}-${day}.jpg`;
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
              submitData["house_image"] = url;

              firebase
                .firestore()
                .collection("/houses")
                .doc(submitData["houseId"].toString())
                .set(submitData)
                .then(() => {
                  alert("success!");
                });
            });
          }
        );
      });
    } else {
      firebase
        .firestore()
        .collection("/houses")
        .doc(submitData["houseId"].toString())
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
        <h1>New Logs</h1>
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="col-span">
            <Stack spacing={2} sx={{ width: 300 }}>
              <input
                accept="image/jpeg"
                type="file"
                name="file"
                onChange={(e) => {
                  console.log(e.target.files);

                  setFile(e.target.files?.[0]);
                }}
              />
              <PrimaryTextInputWithLabel
                label="House Name"
                name="houseName"
                placeholder=""
                type="text"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Total"
                name="installment"
                placeholder=""
                type="number"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Address"
                name="address"
                placeholder=""
                type="text"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Wifi"
                name="wifi"
                placeholder=""
                type="text"
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
            <Stack spacing={2} sx={{ width: 300 }}>
              <PrimaryTextInputWithLabel
                label="Maintenance"
                name="maintenance"
                placeholder=""
                type="text"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Sinking Fund"
                name="sinkingFund"
                placeholder=""
                type="text"
                required
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Info 1"
                name="text1Key"
                placeholder=""
                type="text"
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Value"
                name="text1Value"
                placeholder=""
                type="text"
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Info 2"
                name="text2Key"
                placeholder=""
                type="text"
                errors={errors}
                register={register}
              />
              <PrimaryTextInputWithLabel
                label="Value"
                name="text2Value"
                placeholder=""
                type="text"
                errors={errors}
                register={register}
              />
            </Stack>
          </div>
        </div>
      </form>
    </div>
  );
}
