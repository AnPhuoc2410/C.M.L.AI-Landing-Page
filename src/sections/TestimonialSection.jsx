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
        scrub: true,
      },
    });

    tl.to(".testimonials-section .first-title", {
      xPercent: 70,
    })
      .to(
        ".testimonials-section .sec-title",
        {
          xPercent: 25,
        },
        "<"
      )
      .to(
        ".testimonials-section .third-title",
        {
          xPercent: -50,
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
    <section id="testimonial-section" className="testimonials-section">
      <div className="absolute size-full flex flex-col items-center pt-[5vw]">
        <h1 className="text-black first-title">Kỳ Vọng &</h1>
        <h1 className="text-light-brown sec-title">Trải Nghiệm</h1>
        <h1 className="text-black third-title">Philosophy 4.0</h1>
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
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 rounded-lg p-3">
              <img
                src={`/images2/Triet${index + 1}.png`}
                alt={`Philosophy 4.0 - ${index + 1}`}
                className="w-12 h-12 rounded-full object-cover float-left mr-3"
                onError={(e) => {
                  e.target.src = "/images2/TrietAI.png"; // Fallback image
                }}
              />
              <div className="text-white text-sm">
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
