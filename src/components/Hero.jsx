import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
    const statsRef = useRef([]);
    const mediaRef = useRef(null);

    useGSAP(() => {
        gsap.from("#hero-heading", {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        });

        gsap.from("#hero-subtitle", {
            y: 24,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.15,
        });

        gsap.from(statsRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.12,
            delay: 0.25,
        });

        gsap.from(mediaRef.current, {
            scale: 0.92,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.3,
        });
    }, []);

    const stats = [
        { label: "Learners engaged", value: "12k+" },
        { label: "Research partners", value: "38" },
        { label: "Interactive modules", value: "24" },
    ];

    return (
        <section id="hero" className="relative overflow-hidden section-spacing">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_55%)]" />
                <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/30 to-transparent lg:block" />
            </div>

            <div className="section-shell relative z-10 md:flex md:items-center md:justify-between md:gap-16">
                <div className="flex flex-1 flex-col gap-8">
                    <span className="section-heading">Collective intelligence lab</span>
                    <h1 id="hero-heading" className="text-gradient font-display text-5xl leading-tight sm:text-6xl lg:text-7xl">
                        Building humane AI with Marxist insight
                    </h1>
                    <p id="hero-subtitle" className="section-subtitle">
                        CMLAI explores how critical theory and responsible AI design can co-create equitable futures. Dive into immersive
                        stories, interactive research, and thoughtful debates shaped for the present moment.
                    </p>

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
                        <a
                            href="#philosophy"
                            className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-transform duration-200 hover:-translate-y-0.5"
                        >
                            Start the exploration
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5 18.75 12l-7.5 7.5" />
                            </svg>
                        </a>
                        <a
                            href="#timeline"
                            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/80 transition-colors duration-200 hover:border-white/30 hover:text-white"
                        >
                            Watch the story unfold
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25v13.5L18.75 12 5.25 5.25Z" />
                            </svg>
                        </a>
                    </div>

                    <dl className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
                        {stats.map((item, index) => (
                            <div
                                key={item.label}
                                ref={(el) => {
                                    statsRef.current[index] = el;
                                }}
                                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-lg shadow-blue-500/10"
                            >
                                <dt className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.label}</dt>
                                <dd className="mt-2 text-2xl font-semibold text-white">{item.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="relative mt-14 flex flex-1 items-center justify-center md:mt-0">
                    <div className="absolute inset-4 rounded-[2.5rem] bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-purple-500/20 blur-3xl" />
                    <div ref={mediaRef} className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_40px_120px_rgba(15,23,42,0.45)]">
                        <video
                            src="/videos/output.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="h-full w-full object-cover"
                            style={{ filter: "saturate(1.2) contrast(1.05)" }}
                        />
                        <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-lg">
                            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">Live research capsule</p>
                            <p className="mt-2 text-sm text-slate-200">
                                Mapping collective agency across knowledge systems, from dialectics to diffusion models.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
