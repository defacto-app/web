import React from "react";
import "./../globals.css";
import { Inter as FontSans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";

// Import the Google Font
const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});



export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<Head>
				<title>Authentication - Defacto</title>
				<meta name="description" content="Sign in or sign up to continue" />
			</Head>
			<body className={`${fontSans.variable} min-h-screen bg-gray-100 flex`}>
				<ToastContainer position="top-center" />

				{/* Left Side: Form Section */}
				<div className="flex flex-col justify-center w-full max-w-lg p-8 bg-white shadow-lg">
					{children} {/* This is where your form content goes */}
				</div>

				{/* Right Side: Image Section */}
				<div className="hidden lg:block flex-1">
					<img
						src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
						alt="Login background"
						className="h-full w-full object-cover"
					/>
				</div>
			</body>
		</html>
	);
}
