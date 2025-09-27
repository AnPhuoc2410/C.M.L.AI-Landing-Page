import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const About = () => {
    const mediaCardsRef = useRef([]);

    useGSAP(() => {
        gsap.from("#about header", {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
            },
        });

        gsap.from("#about-stats li", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#about",
                start: "top 75%",
            },
        });

        gsap.from(mediaCardsRef.current, {
            scale: 0.95,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#about",
                start: "top 70%",
            },
        });
    }, []);

    const stats = [
        { label: "Scholars contributing", value: "54" },
        { label: "Published frameworks", value: "18" },
        { label: "Open-source tools", value: "7" },
    ];

    return (
        <section id="about" className="section-spacing">
            <div className="section-shell gap-12">
                <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl space-y-4">
                        <span className="section-heading">Why we exist</span>
                        <h2 className="section-title">
                            Designing collaborative infrastructures where philosophy and AI co-evolve
                        </h2>
                        <p className="section-subtitle">
                            Our studio curates learning experiences, research residencies, and speculative prototypes that empower teams
                            to align intelligent systems with human-centered values.
                        </p>
                    </div>
                    <ul id="about-stats" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {stats.map((item) => (
                            <li key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                                <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                            </li>
                        ))}
                    </ul>
                </header>

                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-6">
                        <div className="glass-surface relative overflow-hidden p-8">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_55%)]" />
                            <div className="relative space-y-5">
                                <h3 className="text-2xl font-semibold text-white">Learning pathways</h3>
                                <p>
                                    Iterate through curated modules that weave socio-economic theory with technical craft. Each cohort explores
                                    policy, ethics, and emergent tooling through collaborative inquiry.
                                </p>
                                <div className="flex flex-wrap gap-3 text-xs font-medium uppercase tracking-[0.3em] text-cyan-200/80">
                                    <span className="rounded-full border border-cyan-200/30 px-3 py-1">Workshops</span>
                                    <span className="rounded-full border border-cyan-200/30 px-3 py-1">Studios</span>
                                    <span className="rounded-full border border-cyan-200/30 px-3 py-1">Policy labs</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {["/images/abt1.png", "/images/abt5.png", "/images/abt3.png", "/images/abt4.png"].map((src, index) => (
                                <figure
                                    key={src}
                                    ref={(el) => {
                                        mediaCardsRef.current[index] = el;
                                    }}
                                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                                >
                                    <img src={src} alt="studio documentation" className="h-full w-full object-cover" />
                                    <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-xs uppercase tracking-[0.25em] text-slate-200/90 backdrop-blur-md">
                                        Cohort insight {index + 1}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>

                    <div className="glass-surface flex min-h-[420px] flex-col overflow-hidden">
                        <div className="relative flex-1">
                            <Canvas camera={{ position: [0, 0, 4] }}>
                                <ambientLight intensity={0.8} />
                                <directionalLight position={[4, 6, 8]} intensity={1} />
                                <group scale={1.1}>
                                    <mesh>
                                        <icosahedronGeometry args={[1.6, 1]} />
                                        <meshStandardMaterial color="#38bdf8" metalness={0.4} roughness={0.2} wireframe />
                                    </mesh>
                                    <mesh>
                                        <sphereGeometry args={[0.7, 64, 64]} />
                                        <meshStandardMaterial color="#6366f1" opacity={0.4} transparent />
                                    </mesh>
                                </group>
                                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
                            </Canvas>
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_65%)]" />
                        </div>
                        <div className="border-t border-white/10 p-6">
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Systems observatory</p>
                            <p className="mt-2 text-sm text-slate-200">
                                Simulate power dynamics, resource flows, and algorithmic impact before real-world deployment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
