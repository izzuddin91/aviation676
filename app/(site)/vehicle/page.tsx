"use client";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../../clientApp";
import "firebase/compat/firestore";
import { useState } from "react";

export default function Vehicle() {
    var [addFlexItem, setAddFlexItem] = useState([
        {id: "",  partsName: "", description: "", price: "", lifeSpan: "", photoLink: "" },
      ]);
  const [car, carLoading, carError] = useCollection(
    firebase.firestore().collection("carParts"),
    {}
  );

  console.log(car);

  if (!carLoading && car) {
    car.docs.map((docs, i) => {
        console.log(docs.data())
      addFlexItem[i] = {
        id: i.toString(),
        partsName: docs.data()["partsName"],
        description: docs.data()["description"],
        price: docs.data()["price"],
        lifeSpan: docs.data()["lifeSpan"],
        photoLink: docs.data()["photoLink"]
      };
    });
  }
  return (
    <div className="p-5 h-screen bg-gray-100">
      <div className="grid grid-cols gap-4 p-4">
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <div>
            <h1 style={{ float: "left" }}>Vehicle Logs </h1>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  No.
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Parts Name 
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Description 
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Price
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Age Span
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
            {
            /* {addFlexItem.map((row, i) => {
                return (
                    <tr className="bg-white">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <a
                        href="#"
                        className="font-bold text-blue-500 hover:underline"
                      >
                        {i + 1}
                      </a>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {row["partsName"]}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                      <a href={row["photoLink"]}>{row["description"]}</a>
                      
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {row["price"]}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {row["lifeSpan"]}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">

                    </td>
                  </tr>
                )}
                )} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
