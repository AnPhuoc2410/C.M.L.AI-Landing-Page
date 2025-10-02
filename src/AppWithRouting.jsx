import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from "./sections/HeroSection";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import MessageSection from "./sections/MessageSection";
import FlavorSection from "./sections/FlavorSection";
import { useGSAP } from "@gsap/react";
import NutritionSection from "./sections/NutritionSection";
import BenefitSection from "./sections/BenefitSection";
import TestimonialSection from "./sections/TestimonialSection";
import FooterSection from "./sections/FooterSection";
import NavBar from "./components/Navbar";
import GameSection from "./sections/GameSection";
import Contradiction40Game from './game/Contradiction40Game';
import GameHub from './game/GameHub';
import SurplusValueHunter from './game/SurplusValueHunter';
import ClassStruggle from './game/ClassStruggle';
import HumanOrAI from './game/HumanOrAI';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const LandingPage = () => {
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
          <HeroSection />
          <MessageSection />
          <FlavorSection />
          <NutritionSection />

          <div>
            <BenefitSection />
            <TestimonialSection />
          </div>

          <GameSection />

          <FooterSection />
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<GameHub />} />
        <Route path="/game/contradiction" element={<Contradiction40Game />} />
        <Route path="/game/surplus-value" element={<SurplusValueHunter />} />
        <Route path="/game/class-struggle" element={<ClassStruggle />} />
        <Route path="/game/human-or-ai" element={<HumanOrAI />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
