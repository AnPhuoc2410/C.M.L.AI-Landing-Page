import HeroSection from "../sections/HeroSection";
import MessageSection from "../sections/MessageSection";
import FlavorSection from "../sections/FlavorSection";
import TimelineSection from "../sections/TimelineSection";
import NutritionSection from "../sections/NutritionSection";
import HallSection from "../sections/HallSection";
import BenefitSection from "../sections/BenefitSection";
import TestimonialSection from "../sections/TestimonialSection";
import FooterSection from "../sections/FooterSection";
import NavBar from "./Navbar";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useAudio } from "../contexts/AudioContext";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const HomePage = () => {
  const { startGlobalTour } = useAudio();

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  });

  return (
    <>
      <NavBar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection onStartAudioTour={startGlobalTour} />
          <MessageSection />
          <FlavorSection />
          <TimelineSection />
          <NutritionSection />
          <HallSection />

          <div>
            <BenefitSection />
            <TestimonialSection />
          </div>

          <FooterSection />
        </div>
      </div>
    </>
  );
};

export default HomePage;
