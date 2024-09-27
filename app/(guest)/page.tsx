import React from "react";

import FoodHero2 from "@/components/home/FoodHero2";
import MarqueeSlide from "@/components/MarqueeSlide";
import RestaurantArea from "@/components/home/RestaurantArea";
import NewsletterSection from "@/components/home/NewsletterSection";
import MobileApp from "@/components/home/MobileApp";

export default function HomePage() {
	return (
		<div className="bg-[#FFFBFE] ">
			{/* <HeroSection/> */}
			{/* <FoodHero/> */}
			<FoodHero2 />
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
