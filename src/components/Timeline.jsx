import React from 'react'
import { featureLists, goodLists } from "../../constants/index.js";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Timeline = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const start = isMobile ? 'top 20%' : 'top top';

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
    });

    return (
        <div id="art">
            <div className="container mx-auto h-full pt-20">
                <h2 className="will-fade">The Connection</h2>

                <div className="content">
                    {/* Triết học nền tảng */}
                    <ul className="space-y-4 will-fade">
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
                    <ul className="space-y-4 will-fade">
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
                    <div id="masked-content">
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
