import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Lý do dự án", path: "/why-project", icon: "❓" },
    { title: "Mục tiêu", path: "/goals", icon: "🎯" },
    { title: "Hoạt động", path: "/activities", icon: "🎮" },
    { title: "Trải nghiệm", path: "/experience", icon: "✨" },
  ];

  useGSAP(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        ".nav-item",
        {
          scale: 0,
          opacity: 0,
          rotation: -180,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [isMenuOpen]);

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-6 right-6 z-50">
      {/* Backdrop để đóng menu khi click ra ngoài */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Menu Items */}
      {isMenuOpen && (
        <div className="absolute -top-2 -right-2">
          {menuItems.map((item, index) => {
            const angle = (index * 72 - 90) * (Math.PI / 180);
            const radius = 120;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="nav-item absolute w-14 h-14 bg-revolutionary-gold rounded-full flex items-center justify-center text-white font-bold hover:bg-cyber-blue transition-all duration-300 shadow-lg hover:scale-110 cursor-pointer"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                onClick={handleMenuItemClick}
                title={item.title}
              >
                <span className="text-xl pointer-events-none">{item.icon}</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Main Nav Button */}
      <button
        onClick={toggleMenu}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 cursor-pointer relative z-10 ${
          isMenuOpen
            ? "bg-cyber-blue text-white rotate-45"
            : "bg-revolutionary-gold text-white hover:bg-revolutionary-gold/90"
        }`}
        type="button"
      >
        {isMenuOpen ? (
          <span className="text-2xl pointer-events-none">✕</span>
        ) : (
          <img
            src="/images2/logo.png"
            alt="Philosophy 4.0 Logo"
            className="w-10 h-10 object-contain pointer-events-none"
          />
        )}
      </button>
    </nav>
  );
};

export default NavBar;
