"use client"
import React from "react";

import { columns, type Payment } from "./columns";
import { DataTable } from "./data-table";


export default async function AllUsers() {

	return (
		<div className="container mx-auto py-10">\

			all users
			{/*{JSON.stringify(data.length)}*/}
			{/*<DataTable columns={columns} data={data} />*/}
		</div>
	);
}

export const runtime = "edge";
