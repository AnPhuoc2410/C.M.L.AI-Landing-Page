import React from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Philosophy from "./components/Philosophy.jsx";
import About from "./components/About.jsx";
import Timeline from "./components/Timeline.jsx";
import MiniGame from "./components/Minigame.jsx";
import Contact from "./components/Contact.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main className="bg-black text-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section: GSAP intro + 3D scene */}
      <Hero />

      {/* Section 1: Lý luận & Công nghệ */
      }
      <section id="philosophy" className="relative py-20 px-4">
        <Philosophy />
      </section>

      {/* Section 2: About (Giới thiệu nhóm/dự án) */}
      <section id="about" className="relative py-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
        <About />
      </section>

      {/* Section 3: Timeline (Từ Mác–Lênin đến thời đại AI) */}
      <section id="timeline" className="relative py-20 px-4">
        <Timeline />
      </section>

      {/* Section 4: Mini Game (Marx hay AI nói?) */}
      {/* TODO: Add images/icons for quiz UI: /images/marx.png, /images/ai-chip.png */}
      <section id="minigame" className="relative py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <MiniGame />
      </section>

      {/* Section 5: Liên hệ */}
      <section id="contact" className="relative py-20 px-4">
        <Contact />
      </section>
    </main>
  );
};

export default App;
