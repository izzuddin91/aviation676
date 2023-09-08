"use client";

import firebase from "../../clientApp";
import "firebase/compat/firestore";
import { useState } from "react";
import { useParams } from "next/navigation";
import * as yup from "yup";
import { PrimaryTextInputWithLabel } from "../../component/input/PrimaryTextInputWithLabel";
import { PrimaryButton } from "../../component/button/PrimaryButton";
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
import { getUserAuth } from "@/app/util/auth.util";
import { createNewVehicle } from "../service/firebase.service";
import { successAlert } from "../service/alert.service";

type FormData = {
  carName: string;
  plateNo: string;
};

const formSchema = yup
  .object({
    // logsTitle: yup.string().required("please key in title"),
    carName: yup.string().required("please key in parts name"),
    plateNo: yup.string().required("please key in plateNo"),
  })
  .required();

export default function VehicleLogs() {
  const [file, setFile] = useState<File>();
  const todayDate = new Date();
  const day = todayDate.toLocaleString("en-US", { day: "2-digit" });
  const month = todayDate.toLocaleString("en-US", { month: "long" });
  const year = todayDate.getFullYear();
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(`${year}-${month}-${day}`)
  );
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
    const uid = getUserAuth()
    console.log(value!.format("DD/MM/YYYY"));
    const date = value!.format("YYYY-MM-DD");
    var submitData = {
      carName: data.carName,
      plateNo: data.plateNo,
      date: new Date(date),
      photoLink: "",
      uid: uid
    };
    createNewVehicle(submitData, file).then((val) => {
        console.log(val)
        successAlert('Created!', 'car created')
    })
    // if (file) {
    //   file?.arrayBuffer().then((val) => {
    //     const storage = getStorage(firebase.app());
    //     const filenameForDelete =
    //       "/uploads/" +
    //       data.carName.replace(" ", "_") +
    //       //   params["houseId"] +
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
    //           submitData["photoLink"] = url;
    //           //   submitData["filenameForDelete"] = filenameForDelete;
    //           firebase
    //             .firestore()
    //             .collection("/carParts")
    //             .doc()
    //             .set(submitData)
    //             .then(() => {
    //               alert("success!");
    //             });
    //         });
    //       }
    //     );
    //   });
    // } else {
    //   submitData["photoLink"] = "";
    //   firebase
    //     .firestore()
    //     .collection("/carParts")
    //     .doc()
    //     .set(submitData)
    //     .then(() => {
    //       alert("success!");
    //     });
    // }
  };

  return (
    <div className="p-2 space-y-10">
      <Button variant="outlined" onClick={() => router.back()}>
        Back
      </Button>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
        <h1>New Logs</h1>
        <Stack spacing={2} sx={{ width: 300 }}>
          <input
            accept="image/jpeg"
            type="file"
            name="file"
            onChange={(e) => {
              setFile(e.target.files?.[0]);
            }}
          />
          <PrimaryTextInputWithLabel
            label="Car Name"
            name="carName"
            placeholder=""
            type="text"
            required
            errors={errors}
            register={register}
          />
          <PrimaryTextInputWithLabel
            label="Plate No"
            name="plateNo"
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
