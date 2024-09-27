"use client";

import React, { useEffect, useState } from "react";
import RestaurantGrid from "@/components/RestaurantGrid";
import type { RestaurantType } from "@/lib/types";
import { $api } from "@/http/endpoints";
import { Input } from "@/components/ui/input";
import SideBarRestaurant from "@/components/SideBarRestaurant";

export default function page() {
	const [data, setData] = useState<RestaurantType[]>([]);
	const getData = async () => {
		try {
			const res = await $api.guest.restaurant.all();

			setData(res.data.data);
		} catch (e) {
			console.log("error", e);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<div className={`bg-blue-200`}>
				<Input className={`w-40`} />
				<p>
					These eateries are located in Asaba; look for eateries that deliver to
					you by searching for restaurants.
				</p>
			</div>
			<div className="container mx-auto pt-4 pb-20">
				<div className="grid grid-cols-1 md:grid-cols-4">
					{/* SideBarRestaurant - Hidden on mobile, shown on medium screens and up */}
					<div className="hidden md:block">
						<SideBarRestaurant />
					</div>

					{/* RestaurantGrid takes full width on mobile, 3/4 width on medium screens and up */}
					<div className="col-span-1 md:col-span-3">
						<RestaurantGrid data={data} />
					</div>
				</div>
			</div>
		</div>
	)
}