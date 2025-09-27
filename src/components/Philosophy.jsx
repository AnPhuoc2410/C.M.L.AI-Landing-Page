import React, { useRef } from "react";
import { theoryLists, aiLists } from "../../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Philosophy = () => {
    const theoryCardsRef = useRef([]);
    const aiCardsRef = useRef([]);

    useGSAP(() => {
        gsap.from("#philosophy header", {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#philosophy",
                start: "top 75%",
            },
        });

        gsap.from(theoryCardsRef.current, {
            x: -40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#philosophy",
                start: "top 70%",
            },
        });

        gsap.from(aiCardsRef.current, {
            x: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#philosophy",
                start: "top 70%",
            },
            delay: 0.1,
        });
    }, []);

    return (
        <section id="philosophy" className="section-spacing">
            <div className="section-shell gap-12">
                <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-3xl space-y-4">
                        <span className="section-heading">Frameworks for equitable intelligence</span>
                        <h2 className="section-title">
                            Ground timeless dialectics with the pragmatism of intelligent systems
                        </h2>
                    </div>
                    <p className="section-subtitle">
                        We bridge foundational Marxist principles with emerging AI practices so teams can design technology that is more
                        transparent, collective, and fair.
                    </p>
                </header>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-slate-200">Dialectical pillars</h3>
                        <ul className="space-y-4">
                            {theoryLists.map(({ id, name, origin, detail, importance }, index) => (
                                <li
                                    key={id}
                                    ref={(el) => {
                                        theoryCardsRef.current[index] = el;
                                    }}
                                    className="glow-border rounded-2xl border border-white/10 bg-white/5 p-5 transition-transform duration-200 hover:-translate-y-1 hover:bg-white/8"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{origin}</p>
                                            <h4 className="mt-2 text-xl font-semibold text-white">{name}</h4>
                                            <p className="mt-3 text-sm text-slate-300">{detail}</p>
                                        </div>
                                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase text-cyan-200/80">
                                            {importance}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-slate-200">Intelligent applications</h3>
                        <ul className="space-y-4">
                            {aiLists.map(({ id, name, origin, detail, importance }, index) => (
                                <li
                                    key={id}
                                    ref={(el) => {
                                        aiCardsRef.current[index] = el;
                                    }}
                                    className="glow-border rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/3 to-white/5 p-5 transition-transform duration-200 hover:-translate-y-1"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{origin}</p>
                                            <h4 className="mt-2 text-xl font-semibold text-white">{name}</h4>
                                            <p className="mt-3 text-sm text-slate-300">{detail}</p>
                                        </div>
                                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase text-purple-200/80">
                                            {importance}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
