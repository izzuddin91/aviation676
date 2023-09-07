"use client";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../clientApp";
import "firebase/compat/firestore";
import { useState } from "react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation"

export default function Vehicle() {
  const router = useRouter()
  // var [addFlexItem, setAddFlexItem] = useState([
  //   {
  //     id: "",
  //     partsName: "",
  //     description: "",
  //     price: "",
  //     lifeSpan: "",
  //     photoLink: "",
  //   },
  // ]);
  // const [car, carLoading, carError] = useCollection(
  //   firebase.firestore().collection("carParts"),
  //   {}
  // );

  // console.log(car);

  // if (!carLoading && car) {
  //   car.docs.map((docs, i) => {
  //     console.log(docs.data());
  //     addFlexItem[i] = {
  //       id: i.toString(),
  //       partsName: docs.data()["partsName"],
  //       description: docs.data()["description"],
  //       price: docs.data()["price"],
  //       lifeSpan: docs.data()["lifeSpan"],
  //       photoLink: docs.data()["photoLink"],
  //     };
  //   });
  // }
  return (
    <div className="p-5 h-screen bg-gray-100">
      <Button variant="outlined" onClick={() => router.back()}></Button>
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span">
          <article className="overflow-hidden rounded-lg shadow-lg">
            <a href="/vehicle/123">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2FvwPolo.jpeg?alt=media&token=adffdeb8-11b0-4211-adc5-4ccf182ae504"
                className="block h-auto w-full"
                alt="Placeholder"
              />
            </a>
            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 className="text-lg">
                <a className="no-underline hover:underline text-black" href="#">
                  VW Polo
                </a>
              </h1>
              <p className="text-grey-darker text-sm"></p>
            </header>
          </article>
        </div>
        <div className="col-span">
          <article className="overflow-hidden rounded-lg shadow-lg">
            <a href="">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2Fhonda-city-used-car-featured-image-4x3-1.jpeg?alt=media&token=a5544018-ced4-46fe-89db-8a4b08eb44db"
                className="block h-auto w-full"
                alt="Placeholder"
              />
            </a>
            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 className="text-lg">
                <a className="no-underline hover:underline text-black" href="#">
                  Honda City
                </a>
              </h1>
              <p className="text-grey-darker text-sm"></p>
            </header>
          </article>
        </div>
      </div>
    </div>
  );
}
