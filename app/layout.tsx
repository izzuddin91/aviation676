import "./globals.css";
import { Lato } from "next/font/google";
import {Auth} from "@auth/core"
const lato = Lato({
  weight: ["400", "100", "300", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head>
        <title>House&Car Maintenances</title>
     
        <meta name="theme-color" content="#000" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={lato.className}>{children}</body>
    </html>
  );
}

