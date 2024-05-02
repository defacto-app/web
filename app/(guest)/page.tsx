import React from "react";
import HeroSection from "@/components/home/HeroSection";
import SendReceive from "@/components/home/SendReceive";
import CtaSection from "@/components/home/CtaSection";
import BecomeRider from "@/components/home/BecomeRider";
import FaqSection from "@/components/FaqSection";
import Accordian from "@/components/FaqAccordian";

export default function HomePage() {
  return (
    <div className="bg-gray-100">

      <HeroSection/>
      <SendReceive/>
      <CtaSection/>
      <BecomeRider/>

      <FaqSection/>


    </div>
  );
}
export const runtime = 'edge';