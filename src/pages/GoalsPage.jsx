import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GoalsPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-main-bg text-cream-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-revolutionary-gold/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-revolutionary-gold font-bold text-xl hover:text-cyber-blue transition-colors">
            ← {t("goals.backHome")}
          </Link>

          <div className="flex gap-4">
            <Link
              to="/why-project"
              className="text-cyber-blue hover:text-revolutionary-gold transition-colors font-semibold"
            >
              {t("nav.whyProject")}
            </Link>
            <Link
              to="/activities"
              className="text-cyber-blue hover:text-revolutionary-gold transition-colors font-semibold"
            >
              {t("nav.activities")}
            </Link>
            <Link
              to="/experience"
              className="text-cyber-blue hover:text-revolutionary-gold transition-colors font-semibold"
            >
              {t("nav.experience")}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-white">
        <img
          src="/images2/Triet4.0.png"
          alt="Philosophy 4.0 Goals"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-cream-white/60 via-transparent to-cream-white/60"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10 px-4 pt-24 pb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-communist-red uppercase tracking-tight">
            {t("goals.pageTitle")}
          </h1>

          <div className="max-w-md mx-auto mb-8">
            <div className="text-center p-4 bg-revolutionary-gold/20 rounded-lg border-4 border-communist-red">
              <p className="text-communist-red text-base font-bold">
                {t("goals.audioTourNote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative min-h-screen py-20 px-4 bg-communist-red">
        <img
          src="/images2/TrietAI2.png"
          alt="Timeline Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 text-cream-white uppercase">
              {t("goals.timeline.title")}
            </h2>
            <p className="text-xl text-cream-white/90">
              {t("goals.timeline.subtitle")}
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-12">
            {/* Goal 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-cream-white p-6 rounded-xl border-4 border-revolutionary-gold">
                <h3 className="text-2xl font-bold mb-3 text-communist-red uppercase">
                  {t("goals.phase1.title")}
                </h3>
                <h4 className="text-xl font-semibold mb-4 text-cyber-blue">
                  {t("goals.phase1.name")}
                </h4>
                <p className="text-steel-gray leading-relaxed">
                  {t("goals.phase1.description")}
                </p>
              </div>
              <div>
                <img
                  src="/images2/Triet3.png"
                  alt="Foundation"
                  className="rounded-xl border-4 border-cream-white hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Goal 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <img
                  src="/images2/Triet4.png"
                  alt="Development"
                  className="rounded-xl border-4 border-cream-white hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="order-1 md:order-2 bg-revolutionary-gold p-6 rounded-xl border-4 border-cream-white">
                <h3 className="text-2xl font-bold mb-3 text-communist-red uppercase">
                  {t("goals.phase2.title")}
                </h3>
                <h4 className="text-xl font-semibold mb-4 text-cyber-blue">
                  {t("goals.phase2.name")}
                </h4>
                <p className="text-steel-gray leading-relaxed">
                  {t("goals.phase2.description")}
                </p>
              </div>
            </div>

            {/* Goal 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-cyber-blue p-6 rounded-xl border-4 border-cream-white">
                <h3 className="text-2xl font-bold mb-3 text-communist-red uppercase">
                  {t("goals.phase3.title")}
                </h3>
                <h4 className="text-xl font-semibold mb-4 text-black">
                  {t("goals.phase3.name")}
                </h4>
                <p className="text-steel-gray leading-relaxed">
                  {t("goals.phase3.description")}
                </p>
              </div>
              <div>
                <img
                  src="/images2/Triet5.png"
                  alt="Community"
                  className="rounded-xl border-4 border-cream-white hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Goal 4 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <img
                  src="/images2/Triet6.png"
                  alt="Future"
                  className="rounded-xl border-4 border-cream-white hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="order-1 md:order-2 bg-neural-green p-6 rounded-xl border-4 border-cream-white">
                <h3 className="text-2xl font-bold mb-3 text-communist-red uppercase">
                  {t("goals.phase4.title")}
                </h3>
                <h4 className="text-xl font-semibold mb-4 text-black">
                  {t("goals.phase4.name")}
                </h4>
                <p className="text-steel-gray leading-relaxed">
                  {t("goals.phase4.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Objectives */}
      <section className="relative py-20 px-4 bg-cream-white">
        <img
          src="/images2/Triet7.png"
          alt="Objectives Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-communist-red uppercase">
            {t("goals.coreObjectives.title")}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-cyber-blue p-6 rounded-xl border-4 border-communist-red text-center hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-4 bg-communist-red group-hover:bg-cream-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-cream-white group-hover:text-communist-red">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                {t("goals.coreObjectives.aiIntegration.title")}
              </h3>
              <p className="text-steel-gray group-hover:text-cream-white">
                {t("goals.coreObjectives.aiIntegration.description")}
              </p>
            </div>

            <div className="bg-revolutionary-gold p-6 rounded-xl border-4 border-communist-red text-center hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-4 bg-communist-red group-hover:bg-cream-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-cream-white group-hover:text-communist-red">
                  2
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                {t("goals.coreObjectives.education.title")}
              </h3>
              <p className="text-steel-gray group-hover:text-cream-white">
                {t("goals.coreObjectives.education.description")}
              </p>
            </div>

            <div className="bg-neural-green p-6 rounded-xl border-4 border-communist-red text-center hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-4 bg-communist-red group-hover:bg-cream-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-cream-white group-hover:text-communist-red">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                {t("goals.coreObjectives.research.title")}
              </h3>
              <p className="text-steel-gray group-hover:text-cream-white">
                {t("goals.coreObjectives.research.description")}
              </p>
            </div>

            <div className="bg-cyber-blue p-6 rounded-xl border-4 border-communist-red text-center hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-4 bg-communist-red group-hover:bg-cream-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-cream-white group-hover:text-communist-red">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                {t("goals.coreObjectives.community.title")}
              </h3>
              <p className="text-steel-gray group-hover:text-cream-white">
                {t("goals.coreObjectives.community.description")}
              </p>
            </div>

            <div className="bg-revolutionary-gold p-6 rounded-xl border-4 border-communist-red text-center hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-4 bg-communist-red group-hover:bg-cream-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-cream-white group-hover:text-communist-red">5</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                {t("goals.coreObjectives.application.title")}
              </h3>
              <p className="text-steel-gray group-hover:text-cream-white">
                {t("goals.coreObjectives.application.description")}
              </p>
            </div>

            <div className="bg-neural-green p-6 rounded-xl border-4 border-communist-red text-center hover:bg-communist-red hover:text-cream-white transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-4 bg-communist-red group-hover:bg-cream-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-cream-white group-hover:text-communist-red">
                  6
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-communist-red group-hover:text-cream-white uppercase">
                {t("goals.coreObjectives.future.title")}
              </h3>
              <p className="text-steel-gray group-hover:text-cream-white">
                {t("goals.coreObjectives.future.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 px-4 bg-communist-red">
        <img
          src="/images2/TrietAI.png"
          alt="CTA Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-cream-white uppercase">
            {t("goals.cta.title")}
          </h2>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              to="/activities"
              className="bg-revolutionary-gold text-communist-red border-4 border-cream-white px-10 py-4 rounded-xl font-bold text-lg uppercase hover:bg-cream-white hover:scale-105 transition-all duration-300"
            >
              {t("goals.cta.exploreActivities")}
            </Link>
            <Link
              to="/"
              className="bg-cream-white text-communist-red border-4 border-revolutionary-gold px-10 py-4 rounded-xl font-bold text-lg uppercase hover:bg-revolutionary-gold hover:scale-105 transition-all duration-300"
            >
              {t("goals.cta.backHome")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GoalsPage;
