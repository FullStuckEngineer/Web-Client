import Navbar from "@/components/layouts/Navbar";
import "./globals.css";
import Head from "next/head";
import SessionProviderWrapper from "@/components/layouts/SessionProviderWrapper";

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <Head>
        <title>My App</title>
      </Head>
      <body>
        <SessionProviderWrapper session={session}>
          <Navbar />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
