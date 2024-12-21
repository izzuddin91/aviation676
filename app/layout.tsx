import "./globals.css";
import { Lato, Poppins } from "next/font/google";
import Navbar from "./component/Navbar";
import { getUserAuth } from "./util/auth.util";

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
  return (
    <html lang="en" className={`${lato.className} ${poppins.className}`}>
      <head>
        <title>House&Car Maintenances</title>
        <meta name="theme-color" content="#000" />
      </head>
      
      <body >
      <Navbar />
        <div style={{marginTop: '60px', borderBottomWidth: '60px'}}>{children}</div>
        
      </body>
    </html>
  );
}
