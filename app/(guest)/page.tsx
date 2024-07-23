import React from "react";
import HeroSection from "@/components/home/HeroSection";
import SendReceive from "@/components/home/SendReceive";
import CtaSection from "@/components/home/CtaSection";
import BecomeRider from "@/components/home/BecomeRider";
import FaqSection from "@/components/FaqSection";
import FoodHero from "@/components/home/FoodHero";
import FoodHero2 from "@/components/home/FoodHero2";
import MarqueeSlide from "@/components/MarqueeSlide";
import RestaurantArea from "@/components/home/RestaurantArea";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div className="bg-[#FFFBFE] ">

      {/* <HeroSection/> */}
      {/* <FoodHero/> */}
      <FoodHero2/>
      <RestaurantArea/>
      <div className="text-center bg-primary-900 pt-10 pb-10">
        <h1 className="text-xl pb-5 font-bold text-primary-200">Our Reviews</h1>
        <h2 className="text-4xl font-bold text-primary-200">Our Happy Customers</h2>
      </div>
      <MarqueeSlide/>
      <NewsletterSection/>
      {/* <SendReceive/>
      <CtaSection/>
      <BecomeRider/> */}

      {/* <FaqSection/> */}


    </div>
  );
}
export const runtime = 'edge';