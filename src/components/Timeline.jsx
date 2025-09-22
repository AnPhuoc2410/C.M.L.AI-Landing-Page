import React, { useRef } from 'react'
import { featureLists, goodLists } from "../../constants/index.js";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const goodListRef = useRef(null);
    const featureListRef = useRef(null);
    const maskedContentRef = useRef(null);

    useGSAP(() => {
        const start = isMobile ? 'top 20%' : 'top top';

        // Main mask timeline (existing animation)
        const maskTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#art',
                start,
                end: 'bottom center',
                scrub: 1.5,
                pin: true
            }
        });

        maskTimeline
            .to('.will-fade', { opacity: 0, stagger: 0.2, ease: 'power1.inOut' })
            .to('.masked-img', { scale: 1.3, maskPosition: 'center', maskSize: '400%', duration: 1, ease: 'power1.inOut ' })
            .to('#masked-content', { opacity: 1, duration: 1, ease: 'power1.inOut' })

        // Enhanced scroll animations for individual elements
        // Title animation
        gsap.fromTo(titleRef.current, 
            { 
                y: 100, 
                opacity: 0,
                scale: 0.8
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 85%",
                    end: "top 50%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Good lists animation (Philosophy section)
        gsap.fromTo(goodListRef.current.children,
            {
                x: -100,
                opacity: 0,
                rotationY: -45
            },
            {
                x: 0,
                opacity: 1,
                rotationY: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: goodListRef.current,
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Cocktail image animation
        gsap.fromTo('.cocktail-img img',
            {
                scale: 0.8,
                rotation: -10,
                opacity: 0
            },
            {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 1.5,
                ease: "elastic.out(1, 0.8)",
                scrollTrigger: {
                    trigger: '.cocktail-img',
                    start: "top 75%",
                    end: "bottom 50%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Feature lists animation (AI section)
        gsap.fromTo(featureListRef.current.children,
            {
                x: 100,
                opacity: 0,
                rotationY: 45
            },
            {
                x: 0,
                opacity: 1,
                rotationY: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: featureListRef.current,
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Masked content final section animation
        gsap.fromTo('#masked-content h3',
            {
                y: 50,
                opacity: 0,
                scale: 0.9
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '#masked-content',
                    start: "top 70%",
                    end: "top 40%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        gsap.fromTo('#masked-content p',
            {
                y: 30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '#masked-content',
                    start: "top 65%",
                    end: "top 35%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Parallax effect for background elements
        gsap.to('.cocktail-img', {
            y: -50,
            scrollTrigger: {
                trigger: '.cocktail-img',
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        });

    }, [isMobile]);

    return (
        <div id="art" ref={containerRef}>
            <div className="container mx-auto h-full pt-20">
                <h2 ref={titleRef} className="will-fade">The Connection</h2>

                <div className="content">
                    {/* Triết học nền tảng */}
                    <ul ref={goodListRef} className="space-y-4 will-fade">
                        {goodLists.map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <img src="/images/check.png" alt="check" />
                                <p>{item}</p>
                            </li>
                        ))}
                    </ul>

                    {/* Hình ảnh minh họa */}
                    <div className="cocktail-img">
                        <img
                            src="/images/under-img.jpg"  // NOTE: đổi sang ảnh về "triết học & AI"
                            alt="philosophy-ai"
                            className="abs-center masked-img size-full object-contain"
                        />
                    </div>

                    {/* Ứng dụng AI */}
                    <ul ref={featureListRef} className="space-y-4 will-fade">
                        {featureLists.map((item, index) => (
                            <li key={index} className="flex items-center justify-start gap-2">
                                <img src="/images/check.png" alt="check" />
                                <p className="md:w-fit w-60">{item}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Kết luận cuối */}
                <div className="masked-container">
                    <h2 className="will-fade">Triết học x AI</h2>
                    <div id="masked-content" ref={maskedContentRef}>
                        <h3>Quy luật xã hội & công nghệ mới</h3>
                        <p>
                            Khi Mác – Lênin chỉ ra quy luật phát triển, thì AI là công cụ để ứng dụng.
                            Sự kết hợp này không chỉ là lý thuyết, mà là tầm nhìn cho tương lai.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Timeline
