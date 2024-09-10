"use client"
import { useRouter } from "next/router";
import React, { useEffect } from "react";
function Page({ params }: { params: { menuId: string } }) {


	return (
		<div>
			<h1>Menu Page for Menu ID: {JSON.stringify(params)}</h1>
			{/* Render the rest of the menu data here */}
		</div>
	);
};

export default Page;
