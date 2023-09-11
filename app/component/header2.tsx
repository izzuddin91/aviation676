"use client";

import { Sidebar } from "flowbite-react";
import {
  HiLightningBolt,
  HiTruck,
  HiViewBoards,
  HiDatabase,
  HiUser,
  HiHome,
  HiIdentification,
  HiPuzzle,
  HiFingerPrint,
  HiKey,
  HiLightBulb,
  HiCog,
  HiMenuAlt1,
  HiChartBar,
} from "react-icons/hi";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RxSketchLogo, RxDashboard, RxPerson } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";

const Header2 = () => {
  return (
    // <div className="flex">
      <div className="col-start-2 col-end-13">
        <div className="fixed flex justify-between px-4 pt-4">
          <h2>Dashboard</h2>
          <h2>Welcome back, client</h2>
        </div>
      </div>
    // </div>
  );
};

export default Header2;
