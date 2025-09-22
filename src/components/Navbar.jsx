import React from "react";
import { navLinks } from "../../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
  useGSAP(() => {
    // Revolutionary navbar entrance animation
    gsap.from("nav", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
      delay: 0.5
    });

    // Enhanced navbar background animation
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });

    navTween.fromTo(
      "nav",
      { 
        backgroundColor: "transparent",
        boxShadow: "none"
      },
      {
        backgroundColor: "rgba(211, 47, 47, 0.95)",
        backdropFilter: "blur(15px)",
        boxShadow: "0 4px 20px rgba(211, 47, 47, 0.3)",
        duration: 1,
        ease: "power1.inOut",
      }
    );

    // Revolutionary logo pulse animation
    gsap.to(".revolutionary-logo", {
      scale: 1.1,
      textShadow: "0 0 15px var(--color-star-yellow)",
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Navigation links hover animations
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.05,
          color: "var(--color-star-yellow)",
          textShadow: "0 0 10px var(--color-star-yellow)",
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          color: "white",
          textShadow: "none",
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Revolutionary symbols floating animation
    gsap.to(".nav-symbol", {
      y: -5,
      rotation: 5,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });
  });

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 border-b border-transparent hover:border-[var(--color-star-yellow)]">
      {/* Revolutionary Logo */}
      <a href="#hero" className="revolutionary-logo flex items-center gap-3 text-[var(--color-star-yellow)] group">
        <div className="relative">
          <img src="/images/logo.png" alt="CMLAI logo" className="h-10 w-10 transition-transform duration-300 group-hover:rotate-12" />
          <div className="nav-symbol absolute -top-1 -right-1 text-xs text-[var(--color-revolutionary-red)]">☭</div>
        </div>
        <div>
          <p className="font-modern-negra text-2xl tracking-wide text-gradient">CMLAI</p>
          <p className="text-xs text-[var(--color-revolutionary-red)] font-semibold opacity-80">Cách mạng Tri thức</p>
        </div>
      </a>

      {/* Revolutionary Navigation */}
      <ul className="flex gap-8 text-sm md:text-base items-center">
        {navLinks.map((link, index) => (
          <li key={link.id} className="relative">
            <a
              href={`#${link.id}`}
              className="nav-link hover:text-[var(--color-star-yellow)] transition-all duration-300 uppercase tracking-wide font-semibold relative group"
            >
              {link.title}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--color-revolutionary-red)] to-[var(--color-star-yellow)] transition-all duration-300 group-hover:w-full"></span>
            </a>
            {/* Revolutionary symbol decorations */}
            {index === 0 && <span className="nav-symbol absolute -top-2 -right-2 text-xs text-[var(--color-star-yellow)]">☭</span>}
            {index === 2 && <span className="nav-symbol absolute -top-2 -right-2 text-xs text-[var(--color-revolutionary-red)]">⚒</span>}
          </li>
        ))}
        
        {/* Revolutionary Call to Action */}
        <li>
          <a
            href="#contact"
            className="px-4 py-2 bg-gradient-to-r from-[var(--color-revolutionary-red)] to-[var(--color-communist-red)] text-white font-bold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-[var(--color-star-yellow)]"
          >
            🚩 Gia nhập
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
