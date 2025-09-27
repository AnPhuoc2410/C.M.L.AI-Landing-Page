import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Philosophy from "./components/Philosophy.jsx";
import About from "./components/About.jsx";
import Timeline from "./components/Timeline.jsx";
import MiniGame from "./components/Minigame.jsx";
import Contact from "./components/Contact.jsx";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <main className="bg-black text-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section: GSAP intro + 3D scene */}
      <Hero />

      <Philosophy />

      <About />

      <Timeline />

      <MiniGame />

      <Contact />
    </main>
  );
};

export default App;
