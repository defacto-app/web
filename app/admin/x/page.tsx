"use client";
import React, { useEffect } from "react";

import { $admin_api } from "@/http/admin-endpoint";

export default function AdminIndex() {
	const [data, setData] = React.useState<any>(null);

	const [isLoading, setLoading] = React.useState<boolean>(true);


	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				const res = await $admin_api.dashboard();
				setLoading(false);



				setData(res);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};

		getData();
	}, []);
	return (
		<div>
			{/*<Dashboard/>*/}
			{JSON.stringify(data)}
			welcome
		</div>
	);
}

export const runtime = "edge";
