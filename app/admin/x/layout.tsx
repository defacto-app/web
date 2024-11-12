"use client";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { AdminFooter, AdminHeader } from "@/app/admin/components/admin.header";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import OrderMenu from "@/app/admin/components/OrderMenu";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function AdminRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<div lang="en">
				<div className={cn("font-sans antialiased", fontSans.variable)}>
					<AdminHeader />

					<OrderMenu />
					<div>{children}</div>

					<AdminFooter />
				</div>
			</div>
		</QueryClientProvider>
	);
}

export const runtime = "edge";
