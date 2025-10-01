import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const FlavorSlider = () => {
  const sliderRef = useRef();

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

    if (!isTablet) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "top top",
          end: `+=${scrollAmount + 1000}px`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(".flavor-section", {
        x: `-${scrollAmount + 1000}px`,
        ease: "power1.inOut",
      });
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -30,
        ease: "power1.inOut",
      })
      .to(
        ".flavor-text-scroll",
        {
          xPercent: -22,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".second-text-split",
        {
          xPercent: -10,
          ease: "power1.inOut",
        },
        "<"
      );
  });

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {flavorlists.map((flavor, index) => (
          <div
            key={flavor.name}
            className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}
          >
            {/* Background từ images2 */}
            <div className="absolute inset-0 bg-gradient-to-br from-revolutionary-gold/20 to-cyber-blue/20 rounded-xl">
              <img
                src={`/images2/TrietAI${index === 0 ? "" : index}.png`}
                alt={flavor.name}
                className="w-full h-full object-cover rounded-xl opacity-80"
                onError={(e) => {
                  e.target.src = "/images2/TrietAI.png"; // Fallback image
                }}
              />
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl"></div>

            {/* Content */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
              <h1 className="text-white text-2xl font-bold mb-4">
                {flavor.name}
              </h1>
              <p className="text-gray-200 text-sm">
                {index === 0 && "Khởi nguồn của triết học trong kỷ nguyên số"}
                {index === 1 && "Ý thức nhân tạo và tự nhận thức"}
                {index === 2 && "Trí tuệ số hoá cho tương lai"}
                {index === 3 && "Triết học thông qua mạng neural"}
                {index === 4 && "Tính toán biên cho tư duy nhanh"}
                {index === 5 && "Tư duy tiên phong cho thế hệ mới"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlavorSlider;
