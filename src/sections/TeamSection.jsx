import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";

gsap.registerPlugin(ScrollTrigger);

const TeamSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [confettiPlayed, setConfettiPlayed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    // Section fade in
    gsap.fromTo(
      section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    // Title animation
    gsap.fromTo(
      title,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
        },
      }
    );

    // Staggered card animations
    gsap.fromTo(
      cards,
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.25,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          onEnter: () => {
            if (!confettiPlayed) {
              launchConfetti();
              setConfettiPlayed(true);
            }
          },
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [confettiPlayed]);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // 🎉 Confetti effect
  const launchConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FFD700", "#FF4500", "#00CED1"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FFD700", "#FF69B4", "#7FFF00"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const teamMembers = [
    {
      id: 1,
      name: "Hoàng Quốc Em",
      role: "Frontend Dev",
      imageUrl: "/member/hqan.jpg",
      github: "https://github.com/QuocAn108",
    },
    {
      id: 2,
      name: "Đào Công An Phước",
      role: "Backend Dev",
      imageUrl: "/member/daphuoc.jpg",
      github: "https://github.com/AnPhuoc2410",
    },
    {
      id: 3,
      name: "Vũ Hoàng Hiếu Ngân",
      role: "Designer",
      imageUrl: "/member/beiu.jpg",
      github: "https://github.com/VuHoangHieuNgan",
    },
    {
      id: 4,
      name: "Trần Đình Thịnh",
      role: "AI Engineer",
      imageUrl: "/member/tdthinh.jpg",
      github: "https://github.com/thinhdabezt",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="team-section py-20 bg-black relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="general-title mb-4 drop-shadow-lg"
          >
            Meet Our Team
          </h2>
          <p className="text-xl text-cream-white/80 max-w-2xl mx-auto">
            The people who bring this vision to life 🚀
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              ref={addToRefs}
              className="team-card bg-black border border-revolutionary-gold/40 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-cream-white mb-1">
                  {member.name}
                </h3>
                <p className="text-revolutionary-gold mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream-white/60 hover:text-cyber-blue transition-colors"
                  >
                    <i className="fab fa-github text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
