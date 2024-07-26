import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Defacto Delivery - Fast and Reliable Delivery Services",
  description: "Defacto Delivery provides fast and reliable delivery services for businesses and individuals. With our efficient delivery network and dedicated team, we ensure that your packages are delivered safely and on time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/defacto.png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="630" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-[#FFFBFE] font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Header />

        {children}

        <div>
          <Footer />
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


