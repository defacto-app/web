"use client";

import React, { useEffect } from "react";
import { DataTable } from "@/app/admin/x/users/data-table";
import { columns } from "@/app/admin/x/restaurants/columns";
import { $admin_api } from "@/http/admin-endpoint";
function Page() {
	const [data, setData] = React.useState({
		data: [],
		pagination: {},
	});

	const getData = React.useCallback(async () => {
		try {
			const res = await $admin_api.restaurants.all();
			console.log(res.data);
			setData(res);
			return res.data;
		} catch (e) {
			console.log(e);
		}
	}, []);

	useEffect(() => {
		getData();
	}, [getData]);


	return (
		<div>
			<div className="container mx-auto py-10">
				<DataTable columns={columns} data={data.data} />
			</div>
		</div>
	);
}

export default Page;
