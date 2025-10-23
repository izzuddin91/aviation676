"use client";

import "./globals.css";
import { Lato, Poppins } from "next/font/google";
import Navbar from "./component/Navbar";
import { AuthProvider } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation"; // Import useRouter
import BottomBar from "./component/bottomBar";

const lato = Lato({
  weight: ["400", "100", "300", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter(); // Initialize useRouter here

  return (
    <html lang="en" className={`${lato.className} ${poppins.className}`}>
      <head>
        <title>Aviation 676</title>
        <meta name="theme-color" content="#000" />
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          <div style={{ marginTop: "60px", paddingBottom: "80px" }}>
            {children}
          </div>
          <BottomBar onClick={() => router.push("/contact")} />{" "}
          {/* Use router */}
        </AuthProvider>
      </body>
    </html>
  );
}
