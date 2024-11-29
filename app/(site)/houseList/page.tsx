"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getHouseList } from "../service/firebase.service";
import { Button } from "@mui/material";
import { LoadingIndicator } from "@/app/component/indicator/Loading";
import secureLocalStorage from "react-secure-storage";

export default function Home() {
  const router = useRouter();
  const [houses, setHouses]: any = useState();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const uid = secureLocalStorage.getItem("uid");
    const houseList = await getHouseList();
    setHouses(houseList);
  }

  function houseDetails(houseId: string, houseName: string) {
    router.push("/houseList/" + houseId + "-" + houseName);
  }

  function houseLogs(link: string, houseName: string) {
    router.push(
      link + "-" + houseName.replaceAll(" ", "_").replaceAll("@", "_")
    );
  }

  function monthlyPL(link: string) {
    router.push(link);
  }

  return (
    <div className="p-8 space-y-5">
      <h1 className="text-xl mb-2">Your Properties</h1>
      {houses ? (
        houses.map((row: any) => {
          const link = "/houseLogs/" + row["houseId"];
          return (
            <div
              key={row["houseId"]}
              className="flex flex-row items-center rounded-lg shadow-lg p-4 space-x-4 bg-white"
            >
              {/* Image */}
              <img
                alt={row.houseName}
                className="rounded-lg object-cover w-40 h-28"
                src={row["house_image"]}
              />
              {/* Details */}
              <div className="flex-1">
                <h1 className="text-lg font-semibold text-black">
                  {row.houseName}
                </h1>
                <p className="text-gray-500 text-sm">{row.location}</p>
                <div className="mt-2 flex space-x-3">
                  <Button
                    onClick={() => houseDetails(row["houseId"], row["houseName"])}
                    variant="outlined"
                    size="small"
                  >
                    Details
                  </Button>
                  <Button
                    onClick={() => houseLogs(link, row["houseName"])}
                    variant="outlined"
                    size="small"
                  >
                    Logs
                  </Button>
                  <Button
                    onClick={() => monthlyPL("/monthlyPL/" + row["houseId"])}
                    variant="outlined"
                    size="small"
                  >
                    Monthly Logs
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
}
