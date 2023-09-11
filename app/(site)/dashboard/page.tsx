"use client";

import { useRouter } from "next/navigation";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import PersonIcon from '@mui/icons-material/Person';
import TopCards from "@/app/component/top-cards";

export default function Home() {
  const router = useRouter();

  function redirectToHouse() {
    router.push("/houseList");
  }

  function redirectToVehicle() {
    router.push("/vehicle");
  }

  return (
    <div className="p-5 h-screen bg-gray-100">
      <div className="grid grid-cols-1 gap-4 p-4 pb-10;">
        <div className="col-span text-center">
        <h3 className='text-2xl font-bold'>Welcome, User. Manage your property and vehicle here:</h3>
        </div>
      </div>
      <div className="grid gap-4 p-4;">
     <TopCards/>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 pb-10;">
        <div>
          <hr style={{ color: "black", height: "4px" }} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 pb-10;">
        <div>
          <h2> Recent Updates </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 pb-10;">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                No.
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Details
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Category
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Date
              </th>
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                Total
              </th>
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <a
                  href="#"
                  className="font-bold text-blue-500 hover:underline"
                ></a>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap"></td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                  <a>Vehicle</a>
                </span>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {/* {row["date"]} */}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {/* {row["total"]} */}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {/* <button onClick={() => deleteItem(row['id'])}>
                        {row['id']}
                      </button> */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
