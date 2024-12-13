"use client";

import "firebase/compat/firestore";
import { schemas, basePdf } from "@/public/base64pdf";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import moment from "moment";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ModeEdit from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { generate } from "@pdfme/generator";
import { confirmAlert, successAlert } from "../../service/alert.service";
import {
  deleteProfitLossBreakdown,
  getHouse,
  getHouseLogsOnDateRange,
  getProfitLossBreakdowns,
} from "../../service/firebase.service";

type House = { houseName: string; address: string; houseId: string; house_image: string; wifi: string};

export default function HouseLogs() {
  const [profitLoss, setProfitLoss] = useState<any[]>([]);
  const [houseDetail, setHouseDetail] = useState({});
  const [descStringArray, setDescStringArray] = useState<string[]>([]);
  const [monthArray, setMonthArray] = useState<string[]>([]);
  const [monthExpenses, setMonthExpenses] = useState<number[]>([]);
  const [monthProfit, setMonthProfit] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month2 = todayDate.toLocaleString("en-US", { month: "2-digit" });
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const houseData = await getHouse(params["houseId"].toString());
    setHouseDetail(houseData as House);

    const logs = await getHouseLogsOnDateRange(
      params["houseId"].toString(),
      Number(month2),
      year
    );
    const totals = logs.reduce(
      (acc: number, val: any) => acc + val["total"],
      0
    );

    const breakdowns = await getProfitLossBreakdowns(
      params["houseId"].toString()
    );
    const labels = breakdowns.map((b: any) =>
      moment(b["date"].toDate()).format("DD-MM-YYYY")
    );
    const expenses = breakdowns.map((b: any) => b["profitBeforeAdminCharge"]);
    const profits = breakdowns.map((b: any) => b["revenue"]);

    setMonthArray(labels);
    setMonthExpenses(expenses);
    setMonthProfit(profits);
    setProfitLoss(breakdowns);
  }

  const template = {
    basePdf,
    schemas,
    columns: [
      "Nos",
      "Date",
      "Description1",
      "Price1",
      "Description2",
      "Price2",
      "Description3",
      "Price3",
      "Description4",
      "Price4",
      "Description5",
      "Price5",
      "Total",
    ],
  };

  const handlePDFGeneration = (file: any) => {
    const inputs = [
      {
        Description1: "Revenue",
        Price1: "RM" + file["revenue"].toString(),
        Description2: "Total Expenses",
        Price2: "RM" + file["totalExpenses"].toString(),
        Description3: "Profit Before Admin Charge",
        Price3: "RM" + file["profitBeforeAdminCharge"].toString(),
        Description4: "Admin 20% Charge",
        Price4: "RM" + file["adminCharge"].toString(),
        Description5: "Profit After Charge",
        Description6: file['notes'].replace(/\/\//g, '\n'), // Replace '//' with new lines
        Price5: 'RM' + file['profitAfterAdminCharge'].toString(),
        Date: moment(file["date"].toDate()).format("DD-MM-YYYY"),
      },
    ];

    generate({ template, inputs }).then((pdf) => {
      const blob = new Blob([pdf.buffer], { type: "application/pdf" });
      window.open(URL.createObjectURL(blob));
    });
  };

  const handleDelete = (id: string) => {
    confirmAlert("Warning", "Are you sure to delete?", async () => {
      const result = await deleteProfitLossBreakdown(id);
      if (result === "success") {
        successAlert("Success", "Data deleted");
        fetchData();
      }
    });
  };

  return (
    <div className="p-4 space-y-8">
      <div>
        <Button
          variant="outlined"
          onClick={() => router.back()}
          style={{ marginRight: "10px" }}
        >
          Back
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push(`${params["houseId"]}/newMonthlyPL`)}
        >
          Create New PL
        </Button>
      </div>

      <h1 className="text-center text-lg font-bold">
        House: {(houseDetail as House).houseName}
      </h1>

      <table className="w-full border-collapse">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="w-20 p-3 text-xs sm:text-sm font-semibold tracking-wide text-left">
              No.
            </th>
            <th className="w-24 p-3 text-xs sm:text-sm font-semibold tracking-wide text-left">
              Expenses
            </th>
            <th className="w-24 p-3 text-xs sm:text-sm font-semibold tracking-wide text-left">
              Revenue
            </th>
            <th className="w-24 p-3 text-xs sm:text-sm font-semibold tracking-wide text-left">
              Date
            </th>
            <th className="w-24 p-3 text-xs sm:text-sm font-semibold tracking-wide text-left">
              Notes
            </th>
            <th className="w-24 p-3 text-xs sm:text-sm font-semibold tracking-wide text-left">
              PDF
            </th>
            <th className="w-24 p-3 text-xs sm:text-sm font-semibold tracking-wide text-left">
              Edit
            </th>
            <th className="w-24 p-3 text-xs sm:text-sm font-semibold tracking-wide text-left">
              Delete
            </th>
          </tr>
        </thead>

        <tbody>
          {profitLoss.map((row, i) => (
            <tr key={i} className="bg-white border-b">
              <td className="p-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">{i + 1}</td>
              <td className="p-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">{row["profitBeforeAdminCharge"]}</td>
              <td className="p-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">{row["revenue"]}</td>
              <td className="p-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                {row["date"]
                  ? moment(row["date"].toDate()).format("DD-MM-YYYY")
                  : ""}
              </td>
              <td className="p-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                {row["notes"] && (
                  <Button
                    onClick={() => {
                      const notesArray = row["notes"].split("//");
                      setDescStringArray(notesArray);
                      setOpen(true);
                    }}
                    style={{ color: "blue" }}
                  >
                    View Notes
                  </Button>
                )}
              </td>
              <td className="p-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                <Button
                  endIcon={<PictureAsPdfIcon color="error" />}
                  onClick={() => handlePDFGeneration(row)}
                />
              </td>
              <td className="p-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                <Button
                  endIcon={<ModeEdit />}
                  onClick={() => router.push(`${row["id"]}/editMonthlyPL`)}
                />
              </td>
              <td className="p-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                <Button
                  endIcon={<DeleteIcon />}
                  onClick={() => handleDelete(row["id"])}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Notes Popup */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {descStringArray.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Dismiss</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
