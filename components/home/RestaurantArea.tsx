// components/Restaurants.tsx
"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { $api } from "@/http/endpoints";
import { useEffect, useState } from "react";
import RestaurantGrid from "@/components/restaurant/RestaurantGrid";
import type { RestaurantType } from "@/lib/types";

const RestaurantArea = () => {
	const [data, setData] = useState<RestaurantType[]>([]);
	const getData = async () => {
		try {
			const res = await $api.guest.restaurant.all({ page: 1, perPage: 3 });

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
			<div className="">
				<div className="flex justify-between gap-x10">
					<div className="flex justify-center">
						<Link href={`/restaurants`}>
							<Image
								src="/food.svg"
								alt="food"
								width={550}
								height={150}
								className="object-contain"
							/>
						</Link>
					</div>
					<div className="flex justify-center">
						<Link href={`/user/send-package`}>
							<Image
								src="/delivery-package.svg"
								alt="delivery package"
								width={550}
								height={150}
								className="object-contain"
							/>
						</Link>
					</div>
				</div>

				<h2 className="text-3xl font-bold text-center mb-6 py-10">
					Restaurants you might like
				</h2>
			</div>

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
