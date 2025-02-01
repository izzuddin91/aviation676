"use client";
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
    const houseList = await getHouseList("");
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
    <div className="p-4 sm:p-6 space-y-5 max-w-full overflow-hidden">
      <h1 className="text-lg sm:text-xl font-semibold mb-2">Your Properties</h1>
      {houses ? (
        houses.map((row: any) => {
          const link = "/houseLogs/" + row["id"];
          return (
            <div
              key={row["id"]}
              className="flex flex-col md:flex-row items-center rounded-lg shadow-lg p-4 bg-white w-full max-w-full overflow-hidden"
            >
              {/* Image */}
              <img
                alt={row.houseName}
                className="rounded-lg object-cover w-full sm:w-48 h-40 md:h-32"
                src={row["house_image"]}
              />

              {/* Details */}
              <div className="flex-1 mt-4 md:mt-0 text-center md:text-left md:pl-4 w-full">
                <h1 className="text-md sm:text-lg font-semibold text-black">
                  {row.houseName}
                </h1>
                <p className="text-gray-500 text-sm">{row.location}</p>

                {/* Buttons */}
                <div className="mt-3 flex justify-center md:justify-start gap-2 w-full">
                  <Button
                    onClick={() => houseDetails(row["id"], row["houseName"])}
                    variant="outlined"
                    size="small"
                    className="w-1/3 md:w-32"
                  >
                    Details
                  </Button>
                  <Button
                    onClick={() => houseLogs(link, row["houseName"])}
                    variant="outlined"
                    size="small"
                    className="w-1/3 md:w-32"
                  >
                    Logs
                  </Button>
                  <Button
                    onClick={() => monthlyPL("/monthlyPL/" + row["id"])}
                    variant="outlined"
                    size="small"
                    className="w-1/3 md:w-32"
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
