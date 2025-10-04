import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavBar from "../components/Navbar";

const WhyThisProjectPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-main-bg text-cream-white">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-white pt-16">
        {/* Background Image */}
        <img
          src="/images2/Triet2.png"
          alt="Philosophy 4.0 Vision"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-white/60 via-transparent to-cream-white/60"></div>
        
        {/* Content */}
        <div className="container mx-auto max-w-4xl text-center relative z-10 px-4 pt-24 pb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-communist-red uppercase tracking-tight">
            {t("whyProject.title")}
          </h1>

          <div className="max-w-md mx-auto mb-8">
            {/* Audio available on main page tour */}
            <div className="text-center p-4 bg-revolutionary-gold/20 rounded-lg border-4 border-communist-red">
              <p className="text-communist-red text-base font-bold">
                {t("whyProject.audioTourNote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative min-h-screen py-20 px-4 overflow-hidden bg-communist-red">
        {/* Background Image */}
        <img
          src="/images2/TrietAI.png"
          alt="AI Philosophy Integration"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-cream-white p-8 rounded-xl border-4 border-revolutionary-gold">
              <h2 className="text-4xl font-bold mb-6 text-communist-red uppercase">
                {t("whyProject.challenge.title")}
              </h2>
              <p className="text-lg leading-relaxed mb-4 text-steel-gray">
                {t("whyProject.challenge.paragraph1")}
              </p>
              <p className="text-lg leading-relaxed text-steel-gray">
                {t("whyProject.challenge.paragraph2")}
              </p>
            </div>
            <div className="hidden md:block">
              <img
                src="/images2/TrietAI.png"
                alt="AI Philosophy Integration"
                className="rounded-xl border-4 border-cream-white hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="relative grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1 hidden md:block">
              <img
                src="/images2/TrietAI1.png"
                alt="Future Thinking"
                className="rounded-xl border-4 border-cream-white hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Background Image for mobile */}
            <div className="absolute inset-0 md:hidden">
              <img
                src="/images2/TrietAI1.png"
                alt="Future Thinking"
                className="w-full h-full object-cover opacity-10 rounded-xl"
              />
            </div>
            
            <div className="order-1 md:order-2 bg-revolutionary-gold p-8 rounded-xl border-4 border-cream-white relative z-10">
              <h2 className="text-4xl font-bold mb-6 text-communist-red uppercase">
                {t("whyProject.vision.title")}
              </h2>
              <p className="text-lg leading-relaxed mb-4 text-steel-gray">
                {t("whyProject.vision.paragraph1")}
              </p>
              <p className="text-lg leading-relaxed text-steel-gray">
                {t("whyProject.vision.paragraph2")}
              </p>
            </div>
          </div>

          <div className="text-center bg-cream-white p-12 rounded-2xl border-4 border-communist-red">
            <h2 className="text-5xl font-bold mb-12 text-communist-red uppercase">
              {t("whyProject.differences.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 - Đổi Mới */}
              <div className="relative overflow-hidden bg-revolutionary-gold p-8 rounded-xl border-4 border-communist-red hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
                <div className="relative z-10">
                  <img
                    src="/images2/TrietAI3.png"
                    alt="Innovation"
                    className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-communist-red object-cover"
                  />
                  <h3 className="text-2xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                    {t("whyProject.differences.innovation.title")}
                  </h3>
                  <p className="text-steel-gray group-hover:text-cream-white leading-relaxed">{t("whyProject.differences.innovation.description")}</p>
                </div>
              </div>
              
              {/* Card 2 - Ứng Dụng */}
              <div className="relative overflow-hidden bg-cyber-blue p-8 rounded-xl border-4 border-communist-red hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
                <div className="relative z-10">
                  <img
                    src="/images2/TrietAI4.png"
                    alt="Practical"
                    className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-communist-red object-cover"
                  />
                  <h3 className="text-2xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                    {t("whyProject.differences.practical.title")}
                  </h3>
                  <p className="text-steel-gray group-hover:text-cream-white leading-relaxed">{t("whyProject.differences.practical.description")}</p>
                </div>
              </div>
              
              {/* Card 3 - Cộng Đồng */}
              <div className="relative overflow-hidden bg-neural-green p-8 rounded-xl border-4 border-communist-red hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
                <div className="relative z-10">
                  <img
                    src="/images2/TrietAI5.png"
                    alt="Community"
                    className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-communist-red object-cover"
                  />
                  <h3 className="text-2xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                    {t("whyProject.differences.community.title")}
                  </h3>
                  <p className="text-steel-gray group-hover:text-cream-white leading-relaxed">{t("whyProject.differences.community.description")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 px-4 overflow-hidden bg-cream-white">
        {/* Background Image */}
        <img
          src="/images2/Triet4.0.png"
          alt="Philosophy 4.0 CTA"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        {/* Content */}
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-communist-red uppercase">
            {t("whyProject.cta.title")}
          </h2>
          <p className="text-xl md:text-2xl text-steel-gray mb-12 max-w-2xl mx-auto font-paragraph">
            {t("whyProject.cta.description")}
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              to="/goals"
              className="bg-revolutionary-gold text-communist-red border-4 border-communist-red px-10 py-4 rounded-xl font-bold text-lg uppercase hover:bg-communist-red hover:text-cream-white hover:scale-105 transition-all duration-300"
            >
              {t("whyProject.cta.learnGoals")}
            </Link>
            <Link
              to="/activities"
              className="bg-cyber-blue text-communist-red border-4 border-communist-red px-10 py-4 rounded-xl font-bold text-lg uppercase hover:bg-communist-red hover:text-cream-white hover:scale-105 transition-all duration-300"
            >
              {t("whyProject.cta.exploreActivities")}
            </Link>
            <Link
              to="/"
              className="bg-cream-white text-communist-red border-4 border-communist-red px-10 py-4 rounded-xl font-bold text-lg uppercase hover:bg-communist-red hover:text-cream-white hover:scale-105 transition-all duration-300"
            >
              {t("whyProject.cta.backToHome")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyThisProjectPage;
