import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const FlavorTitle = () => {
  useGSAP(() => {
    // Tách chữ cho 2 title
    const firstTextSplit = new SplitText(".first-text-split h1", {
      type: "chars",
    });
    const secondTextSplit = new SplitText(".second-text-split h1", {
      type: "chars",
    });

    // --- Philosophy 4.0 có ---
    gsap.from(firstTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top 30%",
        end: "top 10%", // sau đó biến mất
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // --- 6 nguyên tắc ---
    gsap.fromTo(
      ".flavor-text-scroll",
      {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", // ban đầu ẩn
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // hiện ra
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "top 20%",
          end: "top -20%", // kéo tiếp thì biến mất
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    // --- cốt lõi AI ---
    gsap.from(secondTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top 5%",
        end: "top -30%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Cleanup
    return () => {
      firstTextSplit.revert();
      secondTextSplit.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="general-title col-center h-full 2xl:gap-32 xl:gap-24 gap-16" style={{ backgroundColor: '#993140' }}>
      {/* Title 1 */}
      <div className="overflow-hidden 2xl:py-0 py-3 first-text-split">
        <h1>Philosophy 4.0 có</h1>
      </div>

      {/* Title 2 */}
      <div
        style={{
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", // mặc định ẩn
        }}
        className="flavor-text-scroll"
      >
        <div className="bg-revolutionary-gold pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3">
          <h2 className="text-white">6 nguyên tắc</h2>
        </div>
      </div>

      {/* Title 3 */}
      <div className="overflow-hidden 2xl:py-0 py-3 second-text-split">
        <h1 className="pt-15">cốt lõi AI</h1>
      </div>
    </div>
  );
};

export default FlavorTitle;
