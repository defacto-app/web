import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./../globals.css";
import { cn } from "@/lib/utils";
import { ToastContainer } from "react-toastify";
import type React from "react";
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

export const generateViewport = () => ({
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
});

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className={cn(fontSans.variable)}>
			<body
				className={cn(
					"bg-white font-sans antialiased min-h-screen flex flex-col",
				)}
				suppressHydrationWarning
			>
					<UserHeader />
					<main className="flex-grow">{children}</main>
					<ToastContainer position="top-center" />
					<Footer />
			</body>
		</html>
	);
}
export const runtime = "edge";
