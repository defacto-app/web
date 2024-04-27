import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import Link from "next/link";
import { UserRoundCog, ArrowBigDown } from "lucide-react";
import env from "@/config/env";
import IsDev from "@/utils/IsDev";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {env.isDev && (
          <Link href="/admin">
            Admin <UserRoundCog size={20} />
          </Link>
        )}
        <h1>Header global </h1>

        {children}

        <div>
          <h1>global footer item</h1>
        </div>
      </body>
    </html>
  );
}

RootLayout.propType = {
  children: PropTypes.node,
  layout: PropTypes.string,
};


export const runtime = 'edge';


