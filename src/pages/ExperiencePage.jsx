import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavBar from "../components/Navbar";

const ExperiencePage = () => {
  const { t } = useTranslation();

  const expectations = [
    {
      title: t("experience.expectations.criticalThinking.title"),
      description: t("experience.expectations.criticalThinking.description"),
      icon: "🧠",
      progress: 95,
    },
    {
      title: t("experience.expectations.problemSolving.title"),
      description: t("experience.expectations.problemSolving.description"),
      icon: "🔧",
      progress: 88,
    },
    {
      title: t("experience.expectations.aiEthics.title"),
      description: t("experience.expectations.aiEthics.description"),
      icon: "⚖️",
      progress: 92,
    },
    {
      title: t("experience.expectations.communication.title"),
      description: t("experience.expectations.communication.description"),
      icon: "💬",
      progress: 85,
    },
  ];

  const learningPath = [
    {
      phase: t("experience.learningPath.explore.phase"),
      duration: t("experience.learningPath.explore.duration"),
      description: t("experience.learningPath.explore.description"),
      activities: [
        t("experience.learningPath.explore.activities.activity1"),
        t("experience.learningPath.explore.activities.activity2"),
        t("experience.learningPath.explore.activities.activity3")
      ],
    },
    {
      phase: t("experience.learningPath.develop.phase"),
      duration: t("experience.learningPath.develop.duration"),
      description: t("experience.learningPath.develop.description"),
      activities: [
        t("experience.learningPath.develop.activities.activity1"),
        t("experience.learningPath.develop.activities.activity2"),
        t("experience.learningPath.develop.activities.activity3")
      ],
    },
    {
      phase: t("experience.learningPath.apply.phase"),
      duration: t("experience.learningPath.apply.duration"),
      description: t("experience.learningPath.apply.description"),
      activities: [
        t("experience.learningPath.apply.activities.activity1"),
        t("experience.learningPath.apply.activities.activity2"),
        t("experience.learningPath.apply.activities.activity3")
      ],
    },
    {
      phase: t("experience.learningPath.master.phase"),
      duration: t("experience.learningPath.master.duration"),
      description: t("experience.learningPath.master.description"),
      activities: [
        t("experience.learningPath.master.activities.activity1"),
        t("experience.learningPath.master.activities.activity2"),
        t("experience.learningPath.master.activities.activity3")
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-main-bg text-cream-white">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-white pt-16">
        <img
          src="/images2/Triet6.png"
          alt="Experience and Expectations"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-cream-white/60 via-transparent to-cream-white/60"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10 px-4 pt-24 pb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-communist-red uppercase tracking-tight">
            {t("experience.pageTitle")}
          </h1>

          <div className="max-w-md mx-auto mb-8">
            <div className="text-center p-4 bg-revolutionary-gold/20 rounded-lg border-4 border-communist-red">
              <p className="text-communist-red text-base font-bold">
                {t("experience.audioTourNote")}
              </p>
            </div>
          </div>

          <p className="text-xl mb-8 text-steel-gray max-w-3xl mx-auto">
            {t("experience.introText")}
          </p>
        </div>
      </section>

      {/* Learning Expectations */}
      <section className="relative py-20 px-4 bg-communist-red">
        <img
          src="/images2/TrietAI.png"
          alt="Expectations Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-5xl font-bold text-center mb-4 text-cream-white uppercase">
            {t("experience.expectations.title")}
          </h2>
          <p className="text-center text-xl mb-12 text-cream-white/90">
            {t("experience.expectations.subtitle")}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {expectations.map((expectation, index) => (
              <div
                key={index}
                className="bg-cream-white p-6 rounded-xl border-4 border-revolutionary-gold"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{expectation.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-communist-red uppercase">
                      {expectation.title}
                    </h3>
                    <p className="text-steel-gray text-sm">
                      {expectation.description}
                    </p>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-steel-gray">{t("experience.expectations.proficiency")}</span>
                    <span className="text-communist-red font-bold">
                      {expectation.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-steel-gray rounded-full h-2">
                    <div
                      className="bg-communist-red h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${expectation.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="relative py-20 px-4 bg-cream-white">
        <img
          src="/images2/Triet7.png"
          alt="Learning Path Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-5xl font-bold text-center mb-4 text-communist-red uppercase">
            {t("experience.learningPath.title")}
          </h2>
          <p className="text-center text-xl mb-12 text-steel-gray">
            {t("experience.learningPath.subtitle")}
          </p>

          <div className="space-y-12">
            {learningPath.map((phase, index) => (
              <div
                key={index}
                className="bg-revolutionary-gold p-6 rounded-xl border-4 border-communist-red"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-communist-red rounded-full flex items-center justify-center mr-4">
                    <span className="text-cream-white font-bold text-xl">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-communist-red uppercase">
                      {phase.phase}
                    </h3>
                    <p className="text-cyber-blue font-semibold">
                      {phase.duration}
                    </p>
                  </div>
                </div>
                <p className="text-steel-gray mb-4">
                  {phase.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-communist-red uppercase">
                    {t("experience.learningPath.mainActivities")}
                  </p>
                  {phase.activities.map((activity, actIndex) => (
                    <div
                      key={actIndex}
                      className="flex items-center text-sm"
                    >
                      <span className="w-2 h-2 bg-communist-red rounded-full mr-2"></span>
                      <span className="text-steel-gray">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 px-4 bg-cream-white">
        <img
          src="/images2/Triet1.png"
          alt="CTA Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-communist-red uppercase">
            {t("experience.cta.title")}
          </h2>
          <p className="text-xl md:text-2xl text-steel-gray mb-12 max-w-2xl mx-auto">
            {t("experience.cta.subtitle")}
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              to="/activities"
              className="bg-revolutionary-gold text-communist-red border-4 border-communist-red px-10 py-4 rounded-xl font-bold text-lg uppercase hover:bg-communist-red hover:text-cream-white hover:scale-105 transition-all duration-300"
            >
              {t("experience.cta.exploreActivities")}
            </Link>
            <Link
              to="/goals"
              className="bg-cyber-blue text-communist-red border-4 border-communist-red px-10 py-4 rounded-xl font-bold text-lg uppercase hover:bg-communist-red hover:text-cream-white hover:scale-105 transition-all duration-300"
            >
              {t("experience.cta.viewGoals")}
            </Link>
            <Link
              to="/"
              className="bg-cream-white text-communist-red border-4 border-revolutionary-gold px-10 py-4 rounded-xl font-bold text-lg uppercase hover:bg-revolutionary-gold hover:scale-105 transition-all duration-300"
            >
              {t("experience.cta.backHome")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperiencePage;
