import React from 'react'
import { theoryLists, aiLists } from "../../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Philosophy = () => {

    useGSAP(() => {
        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#philosophy',
                start: 'top 30%',
                end: 'bottom 80%',
                scrub: true,
            }
        })
        parallaxTimeline
            .from('#p-left-leaf', { x: -100, y: 100 })
            .from('#p-right-leaf', { x: 100, y: 100 })
    })

    return (
        <section id="philosophy" className="noisy relative py-20">
            {/* TODO: Replace these decorative leaves with more thematic assets (e.g., 
                abstract AI neural net shapes or Marx–Engels silhouette) */}
            <img src="/images/cocktail-left-leaf.png" alt="left-decor" id="p-left-leaf" className="absolute left-0 top-20 w-40 opacity-70" />
            <img src="/images/cocktail-right-leaf.png" alt="right-decor" id="p-right-leaf" className="absolute right-0 top-32 w-40 opacity-70" />

            <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 relative z-10">
                {/* Marxist Theory Section */}
                <div className="popular">
                    <h2 className="text-3xl font-bold text-gradient mb-6 uppercase tracking-wide">
                        Nền tảng Triết học Mác – Lênin
                    </h2>
                    <ul className="space-y-6">
                        {theoryLists.map(({ id, name, origin, detail, importance }) => (
                            <li key={id} className="flex justify-between items-start border-b border-gray-700 pb-4">
                                <div>
                                    <h3 className="text-xl font-semibold">{name}</h3>
                                    <p className="text-sm opacity-80">{origin} | {detail}</p>
                                </div>
                                <span className="text-sm italic opacity-70">{importance}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* AI Section */}
                <div className="loved">
                    <h2 className="text-3xl font-bold text-gradient mb-6 uppercase tracking-wide">
                        Trí tuệ nhân tạo trong Thời đại mới
                    </h2>
                    <ul className="space-y-6">
                        {aiLists.map(({ id, name, origin, detail, importance }) => (
                            <li key={id} className="flex justify-between items-start border-b border-gray-700 pb-4">
                                <div>
                                    <h3 className="text-xl font-semibold">{name}</h3>
                                    <p className="text-sm opacity-80">{origin} | {detail}</p>
                                </div>
                                <span className="text-sm italic opacity-70">{importance}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Philosophy
