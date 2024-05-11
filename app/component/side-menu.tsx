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
  HiChartBar
} from "react-icons/hi";

import React from 'react'
import Link from "next/link";
import Image from 'next/image';
import { RxSketchLogo, RxDashboard, RxPerson } from 'react-icons/rx'
import {FiSettings} from 'react-icons/fi'
import {HiOutlineShoppingBag, } from 'react-icons/hi';

export const SideMenu = () => {
  return (
    <div className='flex hidden lg:block xs:w-3/12 xs:h-128 w-3/12 visible xm:invisible'>
      <div className='fixed w-22 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'> 
      <div className="flex flex-col items-center">
        <Link href={'/'}>
          <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
            <RxSketchLogo size={20}></RxSketchLogo>
          </div>
        </Link>
        <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
        <Link href={'/dashboard'}>
          <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
            <HiMenuAlt1 size={20}></HiMenuAlt1>
          </div>
        </Link>
        <Link href={'/houseList'}>
          <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
            <HiHome size={20}></HiHome>
          </div>
        </Link>
        <Link href={'/vehicle'}>
          <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
            <HiTruck size={20}></HiTruck>
          </div>
        </Link>
        <Link href={'/analysis'}>
          <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
            <HiChartBar size={20}></HiChartBar>
          </div>
        </Link>
      </div>
      <main className="ml-20 w-full">

      </main>
      </div>
    </div>
    
    // <Sidebar
    //   theme={{
    //     root: {
    //       base: "h-auto border-r shadow-sm border-gray-200",
    //       collapsed: {
    //         off: "w-auto",
    //       },
    //       inner: "h-auto overflow-y-auto overflow-x-hidden bg-white py-4 px-3",
    //     },
    //   }}
    // >
    //   <Sidebar.Items>
    //     <Sidebar.ItemGroup>
    //       <Sidebar.Item href='/backoffice/appUser' icon={HiUser}>
    //         <p>App User</p>
    //       </Sidebar.Item>
    //       <Sidebar.Collapse icon={HiHome} label="Property">
    //         <Sidebar.Item href="/houseList">Property List</Sidebar.Item>
    //         <Sidebar.Item href="/houseLogs/newLogs">New House Logs</Sidebar.Item>
    //         <Sidebar.Item href="#">Maintenance Log</Sidebar.Item>
    //         <Sidebar.Item href="/analysis">Analysis</Sidebar.Item>
    //       </Sidebar.Collapse>
    //       <Sidebar.Collapse icon={HiTruck} label="Vehicle">
    //         <Sidebar.Item href="/houseLogs/newLogs">Vehicle List</Sidebar.Item>
    //         <Sidebar.Item href="#">Maintenance Logs</Sidebar.Item>
    //       </Sidebar.Collapse>
    //       <Sidebar.Item href="#" icon={HiCog}>
    //         <p>Configuration</p>
    //       </Sidebar.Item>
    //     </Sidebar.ItemGroup>

    //     <Sidebar.ItemGroup>
    //     </Sidebar.ItemGroup>
    //   </Sidebar.Items>
    // </Sidebar>
  );
};
