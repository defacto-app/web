import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./../globals.css";
import { cn } from "@/lib/utils";
import { AdminFooter, AdminHeader } from "@/app/admin/components/admin.header";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";
import UserHeader from "@/components/user/UserHeader";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Defacto Delivery",
  description: "Send your package",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>Defacto User Dashboard</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <body
        className={cn("bg-[#FFFBFE] font-sans antialiased", fontSans.variable)}
      >
        <UserHeader />

        <ToastContainer position="top-center" />
        {children}

        <div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

export const runtime = "edge";
