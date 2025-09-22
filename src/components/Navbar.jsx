import React from "react";
import { navLinks } from "../../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });

    navTween.fromTo(
      "nav",
      { backgroundColor: "transparent" },
      {
        backgroundColor: "#00000090",
        backdropFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
      }
    );
  });

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between">
      <a href="#hero" className="flex items-center gap-3 text-yellow">
        <img src="/images/logo.png" alt="logo" className="h-8 w-8" />
        <p className="font-modern-negra text-xl tracking-wide">CMLAI</p>
      </a>

      <ul className="flex gap-6 text-sm md:text-base">
        {navLinks.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className="hover:text-yellow transition-colors duration-300 uppercase tracking-wide"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
