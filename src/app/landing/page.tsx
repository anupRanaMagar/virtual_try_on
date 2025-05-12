import React from "react";
import HeroSection from "./HeroSection";
import DiscoverSection from "./DiscoverSection";
import CallToActionSection from "./CallToActionSection";
import Navbar from "@/components/Navbar";

const Page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <DiscoverSection />
      <CallToActionSection />
    </div>
  );
};

export default Page;
