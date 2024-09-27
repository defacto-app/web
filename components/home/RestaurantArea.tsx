// components/Restaurants.tsx
"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { $api } from "@/http/endpoints";
import { useEffect, useState } from "react";
import RestaurantGrid from "@/components/RestaurantGrid";
import type {RestaurantType} from "@/lib/types";


const RestaurantArea = () => {
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
		<div className="container mx-auto px-4 py-8">
			<h2 className="text-2xl font-bold text-center mb-8">
				Restaurants you might like
			</h2>

			<RestaurantGrid data={data} />
			<div className="text-center mt-8">
				<Link href="/restaurants">
					<Button className="bg-blue-500 text-white px-4 py-2 rounded-full">
						Show more
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default RestaurantArea;
