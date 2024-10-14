"use client"; // Mark this component as a client component

import type React from "react";
import "./../globals.css";
import { Inter as FontSans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { usePathname, useRouter } from "next/navigation"; // Use usePathname from next/navigation

import "react-toastify/dist/ReactToastify.css";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Import the Google Font
const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname(); // Use usePathname to get the current route

	// Determine if the current route includes "login" to set the image position
	const imageOnRight = pathname.includes("login");

	console.log(pathname, "layout pathname");
	return (
		<html lang="en">
			<Head>
				<title>Authentication - Defacto</title>
				<meta name="description" content="Sign in or sign up to continue" />
			</Head>
			<body
				className={cn(
					"bg-[#FFFBFE] font-sans antialiased min-h-screen  flex",
					fontSans.variable,
					{ "flex-row-reverse": !imageOnRight },
				)}
			>
				<ToastContainer position="top-center" />

				{/* Form Section */}
				<div className="flex flex-col justify-center w-full max-w-xl p-8 bg-white shadow-lg">
					{children} {/* This is where your form content goes */}
				</div>

				{/* Image Section */}
				<div className="hidden lg:block flex-1">
					<Image
						src={`/food-bg.jpg`}
						alt="Background"
						className="h-full w-full object-cover"
						width={500}
						height={500}
						priority={true}
					/>
				</div>
			</body>
		</html>
	);
}
