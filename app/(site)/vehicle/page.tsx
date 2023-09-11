"use client";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../clientApp";
import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useParams, useRouter } from "next/navigation";
import { getVehicles } from "../service/firebase.service";

export default function Vehicle() {
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  var [vehicles, updateVehicles]: any = useState([{}]);
  async function getData() {
    getVehicles().then((val: any) => {
      vehicles = val;
      updateVehicles(val);
    });
  }

//   <Button
//   style={{ margin: "10px", color: 'blue' }}
//   variant="outlined"
//   className="mt-3"
//   onClick={() => router.back()}
// >
//   Back
// </Button>
// <Button
//   style={{ margin: "10px", color: 'blue' }}
//   variant="outlined"
//   className="mt-3"
//   onClick={() => router.push('/newVehicle')}
// >
//   New Car
// </Button>
  return (
    <div className="p-8 space-y-5">
      <h1 className="text-xl mb-2">Your Vehicle</h1>
      <div className="grid grid-cols-3 gap-3">
        {vehicles.map((row: any) => {
          return (
            <div key={row["id"]} className="col-span">
              <article className="overflow-hidden rounded-lg shadow-lg">
                <a href={"/vehicle/" + row["id"]}>
                  <img
                    src={row['photoLink']}
                    className="block h-auto w-full"
                    alt="Placeholder"
                  />
                </a>
                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                  <h1 className="text-lg">
                    <a
                      className="no-underline hover:underline text-black"
                      href="#"
                    >
                     {row['carName']}
                    </a>
                  </h1>
                  <p className="text-grey-darker text-sm"> {row['plateNo']} </p>
                </header>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}
