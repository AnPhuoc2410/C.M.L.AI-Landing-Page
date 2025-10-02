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
    let sliderTl = null;
    
    // Đợi một chút để DOM và images sẵn sàng
    const initTimer = setTimeout(() => {
      let scrollAmount = 0;
      
      // Slider horizontal scroll animation (chỉ cho desktop)
      if (!isTablet && sliderRef.current) {
        // Force browser reflow để đảm bảo tính toán chính xác
        sliderRef.current.offsetHeight;
        
        const totalWidth = sliderRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        scrollAmount = totalWidth - viewportWidth;
        
        // Tính toán extraScrollSpace dựa trên số lượng items
        const itemCount = flavorlists.length;
        const extraScrollSpace = Math.max(scrollAmount * 0.8, itemCount * 500);
        
        sliderTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".flavor-section",
            start: "top top",
            end: `+=${scrollAmount + extraScrollSpace}`,
            scrub: 1.5,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: false, // Set true để debug
            onRefresh: (self) => {
              // Recalculate khi refresh
              const newTotalWidth = sliderRef.current?.scrollWidth || totalWidth;
              const newScrollAmount = newTotalWidth - window.innerWidth;
              self.vars.end = `+=${newScrollAmount + extraScrollSpace}`;
            },
          },
        });

        sliderTl.to(".flavors", {
          x: () => -scrollAmount,
          ease: "power1.inOut",
        });
      }

      // Title animation - tất cả title texts fade out cùng nhau
      titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "top top",
          end: !isTablet ? `+=${scrollAmount * 0.3}` : "bottom 80%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      titleTl.to([".first-text-split", ".flavor-text-scroll", ".second-text-split"], {
        opacity: 0,
        x: -200,
        ease: "power1.inOut",
      });
      
      requestAnimationFrame(() => {
        gsap.ScrollTrigger.refresh();
      });
    }, 100);
    
    return () => {
      clearTimeout(initTimer);
      
      if (sliderTl) {
        if (sliderTl.scrollTrigger) {
          sliderTl.scrollTrigger.kill(true);
        }
        sliderTl.kill();
      }
    };
  }, [isTablet]);

  return (
    <div ref={sliderRef} className="slider-wrapper" style={{ backgroundColor: '#2f4f4f' }}>
      <div className="flavors" style={{ backgroundColor: '#993140' }}>
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
