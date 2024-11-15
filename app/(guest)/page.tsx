import React from "react";

import FoodHero from "@/components/home/FoodHero";
import MarqueeSlide from "@/components/MarqueeSlide";
import RestaurantArea from "@/components/home/RestaurantArea";
import MobileApp from "@/components/home/MobileApp";

export default function HomePage() {
	return (
		<div className="bg-white ">

			<FoodHero />
			<RestaurantArea />

			<MobileApp />
			<MarqueeSlide />


		</div>
	);
}
export const runtime = "edge";
