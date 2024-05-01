import AboutMission from "@/components/about/AboutMission";
import AboutTeam from "@/components/about/AboutTeam";
import HeroSection from "@/components/about/HeroSection";
import BecomeRider from "@/components/home/BecomeRider";
import React from "react";

export default function AboutIndex() {
  return (
    <div>
      <HeroSection />
      <AboutMission />
      <AboutTeam />
      <BecomeRider />
    </div>
  );
}

export const runtime = "edge";
