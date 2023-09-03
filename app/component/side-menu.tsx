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
} from "react-icons/hi";

export const SideMenu = () => {
  return (
    <Sidebar
      theme={{
        root: {
          base: "h-auto border-r shadow-sm border-gray-200",
          collapsed: {
            off: "w-auto",
          },
          inner: "h-auto overflow-y-auto overflow-x-hidden bg-white py-4 px-3",
        },
      }}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href='/backoffice/appUser' icon={HiUser}>
            <p>App User</p>
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiHome} label="Property">
            <Sidebar.Item href="/houseList">Property List</Sidebar.Item>
            <Sidebar.Item href="/houseLogs/newLogs">New House Logs</Sidebar.Item>
            <Sidebar.Item href="#">Maintenance Log</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={HiTruck} label="Vehicle">
            <Sidebar.Item href="/houseLogs/newLogs">Vehicle List</Sidebar.Item>
            <Sidebar.Item href="#">Maintenance Logs</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href="#" icon={HiCog}>
            <p>Configuration</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>

        <Sidebar.ItemGroup>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
