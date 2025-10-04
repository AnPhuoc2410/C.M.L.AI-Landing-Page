import { useGSAP } from "@gsap/react";
import ClipPathTitle from "../components/ClipPathTitle";
import gsap from "gsap";
import VideoPinSection from "../components/VideoPinSection";
import { useTranslation } from "react-i18next";

const BenefitSection = () => {
  const { t } = useTranslation();
  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 60%",
        end: "top top",
        scrub: 1.5,
      },
    });

    revealTl
      .to(".benefit-section .first-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .second-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .third-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .fourth-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      });
  });

  return (
    <section className="benefit-section">
      <div className="container mx-auto pt-20">
        <div className="col-center">
          <p>
            {t("benefit.intro")} <br />
            {t("benefit.subtitle")}
          </p>

          <div className="mt-20 col-center">
            <ClipPathTitle
              title={t("benefit.title1")}
              color={"#faeade"}
              bg={"#c88e64"}
              className={"first-title"}
              borderColor={"#222123"}
            />
            <ClipPathTitle
              title={t("benefit.title2")}
              color={"#222123"}
              bg={"#faeade"}
              className={"second-title"}
              borderColor={"#222123"}
            />
            <ClipPathTitle
              title={t("benefit.title3")}
              color={"#faeade"}
              bg={"#7F3B2D"}
              className={"third-title"}
              borderColor={"#222123"}
            />
            <ClipPathTitle
              title={t("benefit.title4")}
              color={"#2E2D2F"}
              bg={"#FED775"}
              className={"fourth-title"}
              borderColor={"#222123"}
            />
          </div>

          <div className="md:mt-0 mt-10">
            <p>{t("benefit.moreText")}</p>

            {/* Philosophy 4.0 Benefits Images */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <img
                  src="/images2/Triet4.png"
                  alt="AI Innovation"
                  className="w-20 h-20 rounded-full object-cover border-2 border-revolutionary-gold"
                />
                <p className="text-sm mt-2 text-revolutionary-gold">
                  {t("benefit.benefits.innovation")}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images2/Triet5.png"
                  alt="Future Thinking"
                  className="w-20 h-20 rounded-full object-cover border-2 border-cyber-blue"
                />
                <p className="text-sm mt-2 text-cyber-blue">{t("benefit.benefits.futureThinking")}</p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images2/Triet6.png"
                  alt="Smart Philosophy"
                  className="w-20 h-20 rounded-full object-cover border-2 border-neural-green"
                />
                <p className="text-sm mt-2 text-neural-green">
                  {t("benefit.benefits.smartPhilosophy")}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images2/Triet7.png"
                  alt="Infinite Wisdom"
                  className="w-20 h-20 rounded-full object-cover border-2 border-revolutionary-gold"
                />
                <p className="text-sm mt-2 text-revolutionary-gold">
                  {t("benefit.benefits.infiniteWisdom")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overlay-box">
        <VideoPinSection />
      </div>
    </section>
  );
};

export default BenefitSection;
