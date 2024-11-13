import React from "react";

import FoodHero from "@/components/home/FoodHero";
import MarqueeSlide from "@/components/MarqueeSlide";
import RestaurantArea from "@/components/home/RestaurantArea";
import NewsletterSection from "@/components/home/NewsletterSection";
import MobileApp from "@/components/home/MobileApp";

export default function HomePage() {
	return (
		<div className="bg-[#FFFBFE] ">

			<FoodHero />
			<RestaurantArea />

			<MobileApp />
			<MarqueeSlide />

			{/*<NewsletterSection/>*/}
			{/* <SendReceive/>
      <CtaSection/>
      <BecomeRider/> */}

			{/* <FaqSection/> */}
		</div>
	);
}
export const runtime = "edge";
