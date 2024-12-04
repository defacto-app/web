"use client";

import {useState} from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";

export default function CartLayout({
											 children,
										 }: {
	children: React.ReactNode;
}) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
		<div className="">
			<ReactQueryDevtools initialIsOpen={false} />
			{/* Main Content Section */}
			<main className="pb-10">{children}</main>
		</div>
		</QueryClientProvider>
	);
}
