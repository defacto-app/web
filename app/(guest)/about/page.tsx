import AboutMission from "@/components/about/AboutMission";
import AboutRider from "@/components/about/AboutRider";
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
<AboutRider/>
    </div>
  );
}

export const runtime = "edge";
