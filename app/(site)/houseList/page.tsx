"use client";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../clientApp";
import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { getHouseList } from "../service/firebase.service";

export default function Home() {

  useEffect(() => {
    getData()
  }, []);

  var [houses, updateHouses] : any = useState([{}])

  async function getData(){
    getHouseList().then((val: any) => {
      houses = val
      updateHouses(val)
    })
  }

  return (
    <div className="p-8 space-y-5">
      <h1 className="text-xl mb-2">Your properties</h1>
      <div className="grid grid-cols-3 gap-3 ">
        {houses.map((row: any) =>{
          var link = "/houseLogs/" + row["houseId"];
          return (
            <article key={row["houseId"]} className="overflow-hidden rounded-lg shadow-lg">
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
                <p className="text-grey-darker text-sm">11/1/19</p>
              </header>

              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                <a
                  className="flex items-center no-underline hover:underline text-black"
                  href="#"
                >
                  <img
                    alt="Placeholder"
                    className="block rounded-full"
                    src="https://picsum.photos/32/32/?random"
                  />
                  <p className="ml-2 text-sm">Location: {row.location}</p>
                </a>
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
        })}
      </div>
    </div>
  );
}
