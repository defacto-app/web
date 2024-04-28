import React from "react";
import HeroSection from "@/components/home/HeroSection";
import SendReceive from "@/components/home/SendReceive";

export default function HomePage() {
  return (
    <div className="bg-gray-100">

      <HeroSection/>
      <SendReceive/>

    </div>
  );
}
