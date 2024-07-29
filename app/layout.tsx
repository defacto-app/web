import type React from "react";
import { cookies } from "next/headers";
export const metadata = {};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>{children}</body>
		</html>
	);
}

export const runtime = "edge";
