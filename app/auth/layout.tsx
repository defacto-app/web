"use client";

import type React from "react";
import "./../globals.css";
import { Inter as FontSans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { usePathname } from "next/navigation"; // Use usePathname from next/navigation

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
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

			<title>Authentication - Defacto</title>
			<meta name="description" content="Sign in or sign up to continue"/>
		</Head>
		<body
			className={cn(
				"bg-white font-sans antialiased min-h-screen flex w-full", // Ensure full width
					fontSans.variable,
					{ "flex-row-reverse": !imageOnRight },
				)}
			>
				<ToastContainer position="top-center" />

				{/* Form Section */}
				<div className="flex flex-col justify-center w-full lg:max-w-xl p-8 bg-white shadow-lg lg:w-[50%]">
					<div className={` md:w-4/6 mx-auto lg:bg-white`}>{children}</div>
				</div>

				{/* Image Section */}
				{imageOnRight && ( // Conditionally render the image section only when needed
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
				)}
			</body>
		</html>
	);
}
