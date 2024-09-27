"use client";

import {useState} from "react";
import { QueryClient, QueryClientProvider } from 'react-query';

export default function RestaurantLayout({
											 children,
										 }: {
	children: React.ReactNode;
}) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
		<div className="container mx-auto  ">
			{/* Main Content Section */}
			<main className="pb-10">{children}</main>
		</div>
		</QueryClientProvider>
	);
}
