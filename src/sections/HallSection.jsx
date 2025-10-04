import CardSwiper from "../components/CardSwiper";
import { useTranslation } from "react-i18next";

const HallSection = () => {
  const { t } = useTranslation();
  
  return (
    <section
      id="hall-section"
      className="hall-section bg-[#2e2e2e] min-h-screen py-20"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {t("hall.title")}
          </h1>

          <div className="max-w-3xl mx-auto space-y-4 text-gray-300">
            <p className="text-lg">
              {t("hall.intro1")} <span className="text-gold">{t("hall.intro2")}</span> {t("hall.intro3")}
            </p>

            <p className="text-base">
              {t("hall.description1")} <span className="text-gold">{t("hall.plato")}</span>,{" "}
              <span className="text-gold">{t("hall.aristotle")}</span>,{" "}
              <span className="text-gold">{t("hall.descartes")}</span> {t("hall.description2")}{" "}
              <span className="text-gold">{t("hall.nietzsche")}</span> {t("hall.description3")}{" "}
              <span className="text-gold">{t("hall.marx")}</span> {t("hall.description4")}{" "}
              <br />
              {t("hall.swipeInstruction")}
            </p>
          </div>
        </div>

        {/* Card Swiper */}
        <CardSwiper />
      </div>
    </section>
  );
};

export default HallSection;
