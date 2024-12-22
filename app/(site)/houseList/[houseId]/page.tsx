"use client";

import firebase from "../../../clientApp";
import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PrimaryTextInputWithLabel } from "../../../component/input/PrimaryTextInputWithLabel";
import { PrimaryButton } from "../../../component/button/PrimaryButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Stack, Modal, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import {
  addHouseDetail,
  deleteParticularHouseDetail,
  getHouse,
  getHouseDetails,
} from "../../service/firebase.service";

type FormData = {
  houseName: string;
  address: string;
  wifi: number;
};

type DetailFormData = {
  key: string;
  value: string;
};

export default function HouseLogs() {
  const [file, setFile] = useState<File>();
  const [detailsList, setDetailsList] = useState<any[]>([]);
  const [houseImage, updateHouseImage] = useState({});
  const [houseId, updateHouseId] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false); // Modal State
  const router = useRouter();
  const params = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const {
    register: modalRegister,
    handleSubmit: handleModalSubmit,
    reset: resetModalForm,
    formState: { errors: modalErrors },
  } = useForm<DetailFormData>();

  useEffect(() => {
    getData();
    fetchDetails();
  }, []);

  // Fetch House Data
  async function getData() {
    const houseIdFiltered = params["houseId"].toString().split("-")[0];
    updateHouseId(houseIdFiltered);
    getHouse(houseIdFiltered).then((val) => {
      updateHouseImage(val["house_image"]);
      setValue("houseName", val["houseName"]);
      setValue("address", val["address"]);
      setValue("wifi", val["wifi"]);
    });
  }

  // Fetch Details Collection
  async function fetchDetails() {
    const houseIdFiltered = params["houseId"].toString().split("-")[0]; // Get the current houseId
    const houseDetails = await getHouseDetails(houseIdFiltered);
    setDetailsList(houseDetails); // Update the state with the filtered data
  }

  // Add Detail Modal Submit Handle
  const onAddDetail: SubmitHandler<DetailFormData> = async (data) => {
    try {
      const houseIdFiltered = params["houseId"].toString().split("-")[0];

      // Call the Firebase service to add a new detail
      const newDetail = await addHouseDetail(
        data.key,
        data.value,
        houseIdFiltered
      );

      // Update the state with the new detail
      setDetailsList((prev) => [...prev, newDetail]);
      resetModalForm();
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding house detail:", error);
    }
  };

  // Form Submit Handler
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const submitData = { ...data, houseId, house_image: houseImage };

    if (file) {
      const storage = getStorage(firebase.app());
      const storageref = ref(
        storage,
        `/uploads/${data.houseName}_${houseId}.jpg`
      );
      const uploadTask = uploadBytesResumable(storageref, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => console.error(error),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          submitData["house_image"] = url;

          await firebase
            .firestore()
            .collection("/houses")
            .doc(houseId)
            .set(submitData);
          alert("Data saved successfully!");
        }
      );
    } else {
      await firebase
        .firestore()
        .collection("/houses")
        .doc(houseId)
        .set(submitData);
      alert("Data saved successfully!");
    }
  };

  function handleDelete(id: any): void {
    deleteParticularHouseDetail(id)
      .then(() => {
        // Update the state to remove the deleted detail
        setDetailsList((prevDetails) => prevDetails.filter((detail) => detail.id !== id));
        alert("Detail deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting detail:", error);
        alert("Failed to delete detail.");
      });
  }
  

  return (
    <div className="p-2 space-y-10">
      <Button variant="outlined" onClick={() => router.back()}>
        Back
      </Button>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <h1>New Logs</h1>

        <div className="grid grid-cols-2 gap-4 p-4">
          {/* Left Column */}
          <div>
            <Stack spacing={2} sx={{ width: 300 }}>
              <input
                accept="image/jpeg"
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
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

          {/* Right Column */}
          <div>
            <h3 className="text-lg font-bold mb-2">Details</h3>
            <Stack spacing={2} sx={{ width: 300 }}>
              {detailsList.length > 0 ? (
                detailsList.map((detail) => (
                  <div
                    key={detail.id}
                    className="flex flex-row items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    {/* Detail Information */}
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm font-medium uppercase">
                        {detail.key}
                      </span>
                      <span className="text-gray-900 font-semibold truncate">
                        {detail.value}
                      </span>
                    </div>

                    {/* Delete Button */}
                    <button type="button"
                      className="bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-red-600"
                      onClick={() => handleDelete(detail.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <span>No details available</span>
              )}
            </Stack>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalOpen(true)}
              className="mt-4"
            >
              Add Detail
            </Button>
          </div>
        </div>
      </form>

      {/* Add Detail Modal */}
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <Box
          className="bg-white p-6 rounded-md"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>
            Add New Detail
          </Typography>
          <form onSubmit={handleModalSubmit(onAddDetail)} className="space-y-4">
            <PrimaryTextInputWithLabel
              label="Name"
              name="key"
              placeholder="Enter Name"
              type="text"
              required
              errors={modalErrors}
              register={modalRegister}
            />
            <PrimaryTextInputWithLabel
              label="Value"
              name="value"
              placeholder="Enter Value"
              type="text"
              required
              errors={modalErrors}
              register={modalRegister}
            />
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <PrimaryButton type="submit">Save</PrimaryButton>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
