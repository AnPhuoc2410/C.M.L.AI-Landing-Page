import { useRef } from "react";
import { cards } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const TestimonialSection = () => {
  const vdRef = useRef([]);

  useGSAP(() => {
    gsap.set(".testimonials-section", {
      marginTop: "-140vh",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top bottom",
        end: "150% top",
        scrub: 2,
      },
    });

    tl.to(".testimonials-section .first-title", {
      x: "20vw",
      ease: "none",
      force3D: true,
    })
      .to(
        ".testimonials-section .sec-title",
        {
          x: "10vw",
          ease: "none",
          force3D: true,
        },
        "<"
      )
      .to(
        ".testimonials-section .third-title",
        {
          x: "-15vw",
          ease: "none",
          force3D: true,
        },
        "<"
      );

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "10% top",
        end: "150% top",
        scrub: 1.5,
        pin: true,
      },
    });

    pinTl.from(".vd-card", {
      yPercent: 150,
      stagger: 0.2,
      ease: "power1.inOut",
    });
  });

  const handlePlay = (index) => {
    const video = vdRef.current[index];
    video.play();
  };

  const handlePause = (index) => {
    const video = vdRef.current[index];
    video.pause();
  };

  return (
    <section id="testimonial-section" className="testimonials-section relative overflow-hidden">
      <div className="absolute size-full flex flex-col items-center justify-start pt-[8vw] px-4 z-10">
        <div className="text-center w-full max-w-none space-y-1">
          <h1 className="text-black first-title text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold will-change-transform">Kỳ Vọng &</h1>
          <h1 className="text-light-brown sec-title text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold will-change-transform">Trải Nghiệm</h1>
          <h1 className="text-black third-title text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold will-change-transform">Philosophy 4.0</h1>
        </div>
      </div>

      <div className="pin-box">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`vd-card ${card.translation} ${card.rotation}`}
            onMouseEnter={() => handlePlay(index)}
            onMouseLeave={() => handlePause(index)}
          >
            <video
              ref={(el) => (vdRef.current[index] = el)}
              src={card.src}
              playsInline
              muted
              loop
              className="size-full object-cover"
            />
            {/* Philosophy 4.0 overlay */}
            {/* <div className="absolute bottom-4 left-4 right-4 bg-black/70 rounded-lg p-3"> */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <img
                src={`/images2/Triet${index + 1}.png`}
                alt={`Philosophy 4.0 - ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/images2/TrietAI.png"; // Fallback image
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-2 px-3 text-white text-sm">
                <p className="font-semibold">Philosophy 4.0 Experience</p>
                <p className="text-gray-300">Khám phá tương lai tư duy</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
