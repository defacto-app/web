import React from "react";
import HeroSection from "@/components/home/HeroSection";
import SendReceive from "@/components/home/SendReceive";
import CtaSection from "@/components/home/CtaSection";
import BecomeRider from "@/components/home/BecomeRider";
import FaqSection from "@/components/home/FaqSection";

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
