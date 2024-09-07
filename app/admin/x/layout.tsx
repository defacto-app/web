"use client";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { AdminFooter, AdminHeader } from "@/app/admin/components/admin.header";
import { ToastContainer } from "react-toastify";
import { ReactNode, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function AdminRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div lang="en">
			<div
				className={cn("bg-background font-sans antialiased", fontSans.variable)}
			>
				<AdminHeader />
				<ToastContainer position="top-center" />

				<div>{children}</div>

				<AdminFooter />
			</div>
		</div>
	);
}

export const runtime = "edge";
