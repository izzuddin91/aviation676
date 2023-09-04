"use client";

import firebase from "../../../clientApp";
import "firebase/compat/firestore";
import { useState } from "react";
import { useParams } from "next/navigation";
import * as yup from "yup";
import { PrimaryTextInputWithLabel } from "../../../component/input/PrimaryTextInputWithLabel";
import { PrimaryButton } from "../../../component/button/PrimaryButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Stack,  } from "@mui/material";
import { useRouter } from "next/navigation";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";

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
      houseId: params["houseId"],
      filenameForDelete: ""
    };
    console.log(submitData);
    console.log(file);

    if (file){
      file?.arrayBuffer().then((val) => {
        const storage = getStorage(firebase.app());
        const filenameForDelete = "/uploads/"+ data.notes.replace(' ', '_') + params["houseId"] + `_${year}-${month}-${day}.jpg`
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
              submitData["filenameForDelete"] = filenameForDelete
              firebase
                .firestore()
                .collection("/houseLogs")
                .doc()
                .set(submitData).then(()=> {
                  alert('success!')
                })
            });
          }
        );
      });
    }else{
      submitData["filename"] = '';
      firebase
        .firestore()
        .collection("/houseLogs")
        .doc()
        .set(submitData).then(()=> {
          alert('success!')
        })
    }

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
            accept="image/jpeg"
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
