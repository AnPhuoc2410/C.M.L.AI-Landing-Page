import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { navLinks } from "../../constants/index.js";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -32,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".nav-link-item", {
        y: 16,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.1,
      });

      gsap.from(".nav-cta", {
        y: 16,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.2,
      });
    },
    { scope: navRef }
  );

  useGSAP(
    () => {
      if (isMenuOpen) {
        gsap.fromTo(
          "#mobile-nav-panel",
          { opacity: 0, yPercent: -4 },
          { opacity: 1, yPercent: 0, duration: 0.35, ease: "power2.out" }
        );
      }
    },
    { scope: navRef, dependencies: [isMenuOpen] }
  );

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 z-50 w-full transition-all duration-300 backdrop-blur-xl ${
        isScrolled ? "bg-slate-950/90 border-b border-white/10 shadow-lg shadow-blue-500/5" : "bg-transparent"
      }`}
      aria-label="Primary navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="group inline-flex items-center gap-3" aria-label="CMLAI home">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500 shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:rotate-6">
            <img src="/images/logo.png" alt="CMLAI logo" className="h-7 w-7 object-contain" />
          </span>
          <div className="leading-tight">
            <p className="text-lg font-semibold tracking-tight text-white xl:text-xl">CMLAI Studio</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Philosophy × Intelligence</p>
          </div>
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-slate-200 md:flex">
          {navLinks.map((link) => (
            <li key={link.id} className="nav-link-item">
              <a
                href={`#${link.id}`}
                className="group relative inline-flex items-center gap-2 rounded-full px-3 py-1 transition-colors duration-200 hover:text-white"
              >
                <span>{link.title}</span>
                <span className="absolute inset-0 -z-10 rounded-full bg-white/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="nav-cta hidden items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-blue-500/40 md:inline-flex"
          >
            <span>Let&apos;s collaborate</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5M3.75 12h16.5M12 16.5h8.25" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`md:hidden ${isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 z-40 flex flex-col bg-slate-950/95 backdrop-blur-xl transition-opacity duration-300`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Navigate</p>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav id="mobile-nav-panel" className="flex flex-1 flex-col justify-between px-6 pb-10">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="nav-cta inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Let&apos;s collaborate</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
