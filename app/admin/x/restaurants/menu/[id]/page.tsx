"use client";

import React, {useEffect, useState} from "react";
import {$admin_api} from "@/http/admin-endpoint";
function Page({ params }: { params: { id: string } }) {
	const [menu, setMenu] = React.useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const getData = async () => {
		try {
			const response = await $admin_api.restaurants.menu.one(params.id);
			setMenu(response); // Set the restaurant data
			setLoading(false); // Turn off loading
		} catch (error: any) {
			setError(error.message || "An error occurred while fetching the data");
			setLoading(false);
		}
	};


	useEffect(() => {
		getData();
	}, [params.id]);
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	return <div>Page menu {JSON.stringify(menu.length)}</div>;
}
export default Page;
//