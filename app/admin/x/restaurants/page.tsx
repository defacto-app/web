"use client";

import React, { useEffect } from "react";
import { DataTable } from "@/app/admin/x/users/data-table";
import { columns } from "@/app/admin/x/restaurants/columns";
import { $admin_api } from "@/http/admin-endpoint";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
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
				<div className="relative pb-6">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
					<Input
						type="search"
						placeholder="Search products..."
						className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
					/>
				</div>
				<DataTable columns={columns} data={data.data}/>
			</div>
		</div>
	);
}

export default Page;
