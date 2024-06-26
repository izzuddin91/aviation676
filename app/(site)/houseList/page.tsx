"use client";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../clientApp";
import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { getHouseList } from "../service/firebase.service";
import { PrimaryButton } from "@/app/component/button/PrimaryButton";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { LoadingIndicator } from "@/app/component/indicator/Loading";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  var [houses, updateHouses]: any = useState();

  async function getData() {
    getHouseList().then((val: any) => {
      houses = val;
      updateHouses(val);
    });
  }

  function houseDetails(houseId: string) {
    router.push("/houseList/" + houseId);
  }

  function houseLogs(link: string) {
    router.push(link);
  }

  function monthlyPL(link: string) {
    router.push(link);
  }

  return (
    <div className="p-8 space-y-5">
      <h1 className="text-xl mb-2">Your properties</h1>

      <div className="grid grid-cols-3 gap-3 ">
        {houses ? (
          houses.map((row: any) => {
            var link = "/houseLogs/" + row["houseId"];
            return (
              <article
                key={row["houseId"]}
                className="overflow-hidden rounded-lg shadow-lg"
              >
                <a href={link}>
                  <img
                    alt="Placeholder"
                    className="block h-auto w-full"
                    src={row["house_image"]}
                  />
                </a>

                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                  <h1 className="text-lg">
                    <a
                      className="no-underline hover:underline text-black"
                      href="#"
                    >
                      {row.houseName}
                    </a>
                  </h1>
                  <p className="text-grey-darker text-sm">{row.location}</p>
                </header>

                <footer className="flex items-start justify-between leading-none p-2 md:p-4">
                  <Button
                    onClick={() => {
                      houseDetails(row["houseId"]);
                    }}
                    variant="text"
                  >
                    Edit Details
                  </Button>
                  <Button
                    onClick={() => {
                      houseLogs(link);
                    }}
                    variant="text"
                  >
                    House Logs
                  </Button>
                  <Button
                    onClick={() => {
                      monthlyPL("/monthlyPL/" + row["houseId"]);
                    }}
                    variant="text"
                  >
                    Monthly Logs
                  </Button>
                  {/* <a
                  className="flex items-center no-underline hover:underline text-black"
                  href="#"
                >
                  <img
                    alt="Placeholder"
                    className="block rounded-full"
                    src="https://picsum.photos/32/32/?random"
                  />
                  <p className="ml-2 text-sm">Location: {row.location}</p>
                </a> */}
                  <a
                    className="no-underline text-grey-darker hover:text-red-dark"
                    href="#"
                  >
                    <span className="hidden">Like</span>
                    <i className="fa fa-heart"></i>
                  </a>
                </footer>
              </article>
            );
          })
        ) : (
          <LoadingIndicator />
        )}
      </div>
    </div>
  );
}
