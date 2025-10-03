import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { image } from "framer-motion/client";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const TimelineSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const progressLineRef = useRef(null);

  const timelineData = [
    {
      period: t("timeline.prehistoric.period"),
      title: t("timeline.prehistoric.title"),
      subtitle: t("timeline.prehistoric.subtitle"),
      description: t("timeline.prehistoric.description"),
      icon: "🪓",
      image: "/images2/AncientMan.png",
      productivity: t("timeline.prehistoric.productivity"),
      impact: t("timeline.prehistoric.impact"),
      side: "left",
    },
    {
      period: t("timeline.industrial1.period"),
      title: t("timeline.industrial1.title"),
      subtitle: t("timeline.industrial1.subtitle"),
      description: t("timeline.industrial1.description"),
      icon: "⚙️",
      image: "/images2/IndustrialRevolution1.png",
      productivity: t("timeline.industrial1.productivity"),
      impact: t("timeline.industrial1.impact"),
      side: "right",
    },
    {
      period: t("timeline.industrial2.period"),
      title: t("timeline.industrial2.title"),
      subtitle: t("timeline.industrial2.subtitle"),
      description: t("timeline.industrial2.description"),
      icon: "⚡",
      image: "/images2/IndustrialRevolution2.png",
      productivity: t("timeline.industrial2.productivity"),
      impact: t("timeline.industrial2.impact"),
      side: "left",
    },
    {
      period: t("timeline.industrial3.period"),
      title: t("timeline.industrial3.title"),
      subtitle: t("timeline.industrial3.subtitle"),
      description: t("timeline.industrial3.description"),
      icon: "💻",
      image: "/images2/IndustrialRevolution3.png",
      productivity: t("timeline.industrial3.productivity"),
      impact: t("timeline.industrial3.impact"),
      side: "right",
    },
    {
      period: t("timeline.industrial4.period"),
      title: t("timeline.industrial4.title"),
      subtitle: t("timeline.industrial4.subtitle"),
      description: t("timeline.industrial4.description"),
      icon: "🤖",
      image: "/images2/IndustrialRevolution4.png",
      productivity: t("timeline.industrial4.productivity"),
      impact: t("timeline.industrial4.impact"),
      side: "left",
    },
  ];

  useEffect(() => {
    // Wait a bit to ensure FlavorSection is fully initialized
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const items = timelineRef.current.querySelectorAll(".timeline-item");

        // Animate timeline items
        items.forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            }
          );
        });

        // Animate the progress line (glowing effect that follows scroll)
        if (progressLineRef.current && lineRef.current) {
          gsap.fromTo(
            progressLineRef.current,
            {
              height: "0%",
            },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      }, sectionRef);

      return () => {
        ctx.revert(); // Clean up properly
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline-section"
      className="min-h-screen w-full py-32 px-4 md:px-8 lg:px-16 relative mt-20"
      style={{
        background:
          "linear-gradient(to bottom right, #f5f5f4, #fef3c7, #e7e5e4)",
        zIndex: 3,
        isolation: "isolate",
        marginTop: "0",
        clear: "both",
      }}
      data-speed="1"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10" data-speed="0.8">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[128px]"
          style={{ backgroundColor: "#993140" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[128px]"
          style={{ backgroundColor: "#d4a574" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ color: "#993140" }}
          >
            {t("timeline.title")}
          </h2>
          <p className="text-xl md:text-2xl text-stone-700">
            {t("timeline.subtitle")}
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center Line - Gray background */}
          <div
            ref={lineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-stone-300 hidden md:block"
          ></div>

          {/* Progress Line - Glowing animated line that follows scroll */}
          <div
            ref={progressLineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-0 hidden md:block shadow-[0_0_20px_rgba(153,49,64,0.6)]"
            style={{
              top: 0,
              background:
                "linear-gradient(to bottom, #993140, #c43d50, #d4a574)",
            }}
          ></div>

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-24">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`timeline-item flex flex-col md:flex-row items-center gap-8 ${item.side === "right" ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ${item.side === "right" ? "md:text-left" : "md:text-right"
                    }`}
                >
                  <div
                    className="bg-gradient-to-br from-amber-50 to-stone-50 p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(153,49,64,0.25)] shadow-lg"
                    style={{ borderColor: "#d4a574" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "#993140")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "#d4a574")
                    }
                  >
                    <div
                      className="inline-block px-4 py-2 text-amber-50 font-bold rounded-full mb-4 text-sm md:text-base shadow-md"
                      style={{
                        background:
                          "linear-gradient(to right, #993140, #c43d50)",
                      }}
                    >
                      {item.period}
                    </div>
                    <h3
                      className="text-2xl md:text-3xl font-bold mb-2"
                      style={{ color: "#993140" }}
                    >
                      {item.title}
                    </h3>
                    <h4 className="text-lg md:text-xl font-semibold mb-3 text-stone-600">
                      {item.subtitle}
                    </h4>
                    <p className="text-stone-700 text-base md:text-lg leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Productivity & Impact badges */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      <div
                        className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{
                          backgroundColor: "#fef3c7",
                          color: "#78350f",
                        }}
                      >
                        📈 {item.productivity}
                      </div>
                      <div
                        className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{
                          backgroundColor: "#e7e5e4",
                          color: "#44403c",
                        }}
                      >
                        🌍 {item.impact}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Dot with Icon */}
                <div className="hidden md:flex w-2/12 justify-center items-center relative">
                  <div
                    className="w-16 h-16 rounded-full border-4 border-amber-50 z-10 relative flex items-center justify-center text-3xl"
                    style={{
                      background:
                        "linear-gradient(to bottom right, #993140, #c43d50)",
                      boxShadow: "0 0 20px rgba(153, 49, 64, 0.8)",
                    }}
                  >
                    {item.icon}
                    {/* Pulsing ring effect */}
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: "#993140" }}
                    ></div>
                  </div>
                </div>

                {/* Visual Representation */}
                <div className="w-full md:w-5/12">
                  <div className="relative group">
                    <div
                      className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(to bottom right, #993140, #d4a574)",
                      }}
                    ></div>
                    <div
                      className="relative overflow-hidden rounded-2xl border-2 transition-all duration-300 shadow-lg bg-gradient-to-br from-stone-50 to-amber-50 p-8"
                      style={{ borderColor: "#d4a574" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = "#993140")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = "#d4a574")
                      }
                    >
                      {/* Large Icon Display */}
                      <div className="flex items-center justify-center h-48 transform group-hover:scale-105 transition-transform duration-500">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>

                      {/* Period Label */}
                      <div className="mt-4 text-center">
                        <div
                          className="inline-block px-4 py-2 rounded-lg font-bold text-lg"
                          style={{
                            backgroundColor: "#993140",
                            color: "#fef3c7",
                          }}
                        >
                          {item.period}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div
            className="inline-block bg-gradient-to-r from-red-50 to-amber-50 border-2 rounded-2xl p-8 shadow-xl max-w-3xl"
            style={{ borderColor: "#993140" }}
          >
            <p className="text-xl md:text-2xl text-stone-800 mb-4 font-bold">
              ⚠️ {t("timeline.cta.challengeTitle")}
            </p>
            <p className="text-lg md:text-xl text-stone-700 mb-2">
              {t("timeline.cta.challengeDesc")}
            </p>
            <p className="text-base md:text-lg text-stone-600">
              {t("timeline.cta.challengeHumanRole")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
