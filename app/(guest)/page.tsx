import React from "react";
import HeroSection from "@/components/home/HeroSection";
import SendReceive from "@/components/home/SendReceive";
import CtaSection from "@/components/home/CtaSection";
import BecomeRider from "@/components/home/BecomeRider";
import FaqSection from "@/components/FaqSection";
import FoodHero from "@/components/home/FoodHero";
import FoodHero2 from "@/components/home/FoodHero2";
import MarqueeSlide from "@/components/MarqueeSlide";

export default function HomePage() {
  return (
    <div className="bg-[#FFFBFE] ">

      {/* <HeroSection/> */}
      {/* <FoodHero/> */}
      <FoodHero2/>
      <MarqueeSlide/>
      {/* <SendReceive/>
      <CtaSection/>
      <BecomeRider/> */}

      {/* <FaqSection/> */}


    </div>
  );
}
export const runtime = 'edge';