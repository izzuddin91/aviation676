"use client";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../../../clientApp";
import "firebase/compat/firestore";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import * as yup from "yup";
import { PrimaryTextInputWithLabel } from "../../../component/input/PrimaryTextInputWithLabel";
import { PrimaryButton } from "../../../component/button/PrimaryButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "flowbite-react";
import { Button, Grid, RadioGroup, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import { FirebaseError } from "firebase/app";

type FormData = {
  notes: string;
  total: number;
};
const formSchema = yup
  .object({
    // logsTitle: yup.string().required("please key in title"),
    notes: yup.string().required("please key in description"),
    total: yup.number().required("need to add total"),
  })
  .required();

export default function HouseLogs() {
  const [file, setFile] = useState<File>();
  const todayDate = new Date()
  const day = todayDate.toLocaleString("en-US", { day : '2-digit'})
  const month = todayDate.toLocaleString("en-US", { month: "long" })
  const year = todayDate.getFullYear()
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(`${year}-${month}-${day}`));
  const router = useRouter();
  const params = useParams();
  // console.log(params)

  function setForm() {
    const data2 = new FormData();
  }

  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(value!.format("DD/MM/YYYY"));
    const date = value!.format("YYYY-MM-DD");
    var submitData = {
      notes: data.notes,
      total: data.total,
      date: new Date(date),
      filename: "",
      houseId: params["houseId"]
    };
    console.log(submitData);
    console.log(file);

    file?.arrayBuffer().then((val) => {
      // console.log(val)
      const filePath = `/uploads/asd`;
      const storage = getStorage(firebase.app());
      const storageref = ref(storage, "/uploads/"+ file.name + `:${year}-${month}-${day}`);
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
            firebase
              .firestore()
              .collection("/houseLogs")
              .doc(params["houseId"])
              .set(submitData).then(()=> {
                alert('success!')
              })
          });
        }
      );
    });
    // const uploadTask = storageRef.child( 'test' ).put(file.arrayBuffer);

    // add datepicker,
    // add house id in the form. example below:
    // date
    // February 23, 2023 at 8:00:00 AM UTC+8
    // (timestamp)
    // filename
    // "https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2F1677418059702_14a17847-3817-476c-98de-9f56fe197a9f.jpeg?alt=media&token=5b5a6212-35fe-44bc-9b8e-cbaa751b72da"
    // houseId
    // "5CSHAjZETnaTuiJ0R1eh"
    // notes
    // "baiki lampu tandas"
    // total
    // "40"
    // firebase
    //   .firestore()
    //   .collection("/houseLogs")
    //   .doc(params["houseId"])
    //   .set(submitData);
  };

  return (
    <div className="p-2 space-y-10">
      <Button variant="outlined" onClick={() => router.back()}>
        Back
      </Button>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
        <h1>New Logs</h1>
        <Stack spacing={2} sx={{ width: 300 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Controlled picker"
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <input
            type="file"
            name="file"
            onChange={(e) => {
              console.log(e.target.files);

              setFile(e.target.files?.[0]);
            }}
          />
          <PrimaryTextInputWithLabel
            label="Logs Description"
            name="notes"
            placeholder=""
            type="text"
            required
            errors={errors}
            register={register}
          />
          <PrimaryTextInputWithLabel
            label="Total"
            name="total"
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
      </form>
    </div>
  );
}
