"use client";

import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import React from "react";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { getCleaningList } from "../service/firebase.service";

export default function Cleaning() {
  const router = useRouter();
  var [carParts, updateCarParts]: any = useState([{}]);
  var [year, updateYear] = useState(2023);
  const params = useParams();

  useEffect(() => {
    getCleaningList().then((val) => {
      console.log(val)
      updateCarParts(val);
    });
  }, []);

  return (
    <div className="p-5 h-screen bg-gray-100">
      <div className="grid grid-cols gap-4 p-4">
        <h2>Cleaning List</h2>
        <div className="hidden md:block">
          <table className="table-auto">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  No.
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  House
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {carParts.map((row: any, i: number) => {
                return (
                  <tr key={i} className="bg-white">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <a
                        href="#"
                        className="font-bold text-blue-500 hover:underline"
                      >
                        {i + 1}
                      </a>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {row["houseName"]}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {row["date"]
                        ? moment(row["date"].toDate()).format("DD-MM-YYYY")
                        : ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 gap-1 md:hidden">
          Upcoming Cleaning List
          {carParts.map((row: any, i: number) => {
            return(
              // eslint-disable-next-line react/jsx-key
              <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-2 text-sm">
                <div>Date: </div>
                <div>
                  <strong>
                    {" "}
                    {row["date"]
                      ? moment(row["date"].toDate()).format("DD-MM-YYYY")
                      : ""}
                  </strong>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div>Location: </div>
                <div>
                  {" "}
                  <strong>{row["houseName"]}</strong>{" "}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
