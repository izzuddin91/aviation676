"use client";

import { useRouter } from "next/navigation";

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
import ArticleSection from "@/app/component/articleSection";
import UpcomingPayment from "@/app/component/upcomingPayment";

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
        <h3 className='text-2xl font-bold'>I.Z. Properties. All about airbnb / properties</h3>
        </div>
      </div>
      <div className="grid gap-4 p-4;">
     <ArticleSection/>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 pb-10;">
        <div>
          <hr style={{ color: "black", height: "4px" }} />
        </div>
      </div>
    </div>
  );
}
