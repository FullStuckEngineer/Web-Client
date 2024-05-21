"use client"

import { Poppins } from "next/font/google";
import Navbar from "@/components/layouts/Navbar";
import "./globals.css";
import Head from "next/head";
import SessionProviderWrapper from "@/components/layouts/SessionProviderWrapper";
import Footer from "@/components/layouts/Footer";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"]
});

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <Head>
        <title>BabyBoo</title>
      </Head>
      <body
        className={`${poppins.className} bg-color-primary`}
      >
          <Navbar />

          {children}
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
// suppressHydrationWarning={true}
{/* <SessionProviderWrapper session={session}>
</SessionProviderWrapper> */}