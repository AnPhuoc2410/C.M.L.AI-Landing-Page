import React, { useRef } from "react";
import { featureLists, goodLists } from "../../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
    const goodRef = useRef([]);
    const featureRef = useRef([]);

    useGSAP(() => {
        gsap.from("#timeline header", {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#timeline",
                start: "top 80%",
            },
        });

        gsap.from(goodRef.current, {
            x: -30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#timeline",
                start: "top 70%",
            },
        });

        gsap.from(featureRef.current, {
            x: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#timeline",
                start: "top 70%",
            },
        });
    }, []);

    return (
        <section id="timeline" className="section-spacing">
            <div className="relative">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.16),transparent_65%)]" />
                <div className="section-shell gap-14">
                    <header className="flex flex-col gap-6 text-center md:text-left">
                        <span className="section-heading">Shared trajectory</span>
                        <h2 className="section-title">
                            Charting the dialogue between critical theory and intelligent tooling
                        </h2>
                        <p className="section-subtitle">
                            Follow the interplay from foundational principles to live deployments. Each layer reveals how philosophical rigor
                            shapes AI decisions—and how AI reflects back on social structures.
                        </p>
                    </header>

                    <div className="grid gap-12 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
                        <ul className="space-y-5">
                            {goodLists.map((item, index) => (
                                <li
                                    key={item}
                                    ref={(el) => {
                                        goodRef.current[index] = el;
                                    }}
                                    className="glow-border rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-lg shadow-blue-500/10"
                                >
                                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Philosophy</p>
                                    <p className="mt-3 text-base text-slate-200">{item}</p>
                                </li>
                            ))}
                        </ul>

                    <div className="relative hidden h-full w-px justify-self-center bg-gradient-to-b from-transparent via-white/30 to-transparent lg:block" aria-hidden="true" />

                        <div className="flex flex-col gap-6">
                            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-[0_40px_100px_rgba(15,23,42,0.45)]">
                                <img src="/images/under-img.jpg" alt="Conceptual art representing the convergence of philosophy and AI" className="h-full w-full object-cover" />
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
                                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Reflection</p>
                                <p className="mt-3 text-sm text-slate-200">
                                    Ethical guardrails emerge when dialectical thinking meets computational foresight. This loop is never linear—it is
                                    cyclical, participatory, and relentlessly curious.
                                </p>
                            </div>
                        </div>

                        <ul className="space-y-5">
                            {featureLists.map((item, index) => (
                                <li
                                    key={item}
                                    ref={(el) => {
                                        featureRef.current[index] = el;
                                    }}
                                    className="glow-border rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/3 to-white/6 p-5 text-left shadow-lg shadow-purple-500/10"
                                >
                                    <p className="text-sm uppercase tracking-[0.3em] text-purple-200/70">Systems design</p>
                                    <p className="mt-3 text-base text-slate-200">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center md:text-left">
                        <h3 className="text-2xl font-semibold text-white">From thesis → praxis → futures</h3>
                        <p className="mt-4 text-sm text-slate-200">
                            Each sprint closes with community dialogues translating insight into actionable governance patterns and product
                            heuristics.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
