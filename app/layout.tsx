"use client";
import Header from "@/components/Header";
import "../app/globals.css";
import Footer from "@/components/Footer";
import { UserProvider } from "./provider/auth.context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Header />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
