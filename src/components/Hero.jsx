import React, { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { useGSAP } from "@gsap/react"
import { useMediaQuery } from "react-responsive"

const Hero = () => {
    const videoRef = useRef()
    const starRef = useRef()
    const hammerSickleRef = useRef()
    const isMobile = useMediaQuery({ maxWidth: 767 })

    useGSAP(() => {
        const heroSplit = new SplitText(".title", { type: "chars, words" })
        const paragraphSplit = new SplitText(".subtitle", { type: "lines" })
        const sloganSplit = new SplitText(".revolutionary-slogan", { type: "chars" })

        // Revolutionary gradient text effect
        heroSplit.chars.forEach((char) => char.classList.add("text-gradient"))

        // Main title animation with revolutionary power
        gsap.from(heroSplit.chars, {
            yPercent: 100,
            rotationX: 90,
            transformOrigin: "bottom center",
            duration: 2,
            ease: "back.out(1.7)",
            stagger: 0.08,
        })

        // Subtitle animation
        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
        })

        // Revolutionary slogan animation
        gsap.from(sloganSplit.chars, {
            opacity: 0,
            scale: 0,
            rotation: 360,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.03,
            delay: 2,
        })

        // Revolutionary symbols floating animation
        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        })
        .to(".right-leaf", { y: 200, rotation: 360 }, 0)
        .to(".left-leaf", { y: -200, rotation: -360 }, 0)

        // Revolutionary symbols pulsing effect
        gsap.to([starRef.current, hammerSickleRef.current], {
            scale: 1.1,
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
        })

        // Enhanced video parallax
        const startValue = isMobile ? "top 50%" : "center 60%"
        const endValue = isMobile ? "120% top" : "bottom top"

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "video",
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            },
        })
        
        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration,
                filter: "sepia(0.3) hue-rotate(340deg) saturate(1.2)",
            })
        }

        // Call to action button animation
        gsap.to(".cta-button", {
            boxShadow: "0 0 20px var(--color-star-yellow)",
            duration: 1.5,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
        })
    }, [])

    return (
        <>
        <section id="hero" className="noisy relative">
            <h1 className="title">CMLAI</h1>
            
            {/* Revolutionary slogan */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
                <p className="revolutionary-slogan text-lg font-bold text-center tracking-wider">
                    ☭ WORKERS OF THE WORLD, UNITE WITH AI! ☭
                </p>
            </div>

            {/* Revolutionary symbols */}
            <div 
                ref={starRef}
                className="absolute top-20 left-20 text-6xl text-[var(--color-star-yellow)] animate-pulse z-10"
                style={{ textShadow: "0 0 20px var(--color-star-yellow)" }}
            >
                ☭
            </div>
            
            <div 
                ref={hammerSickleRef}
                className="absolute bottom-32 right-20 text-5xl text-[var(--color-revolutionary-red)] z-10"
                style={{ textShadow: "0 0 15px var(--color-revolutionary-red)" }}
            >
                ⚒
            </div>

            {/* Decorative assets (keeping original for now, should replace with revolutionary symbols) */}
            <img
                src="/images/hero-left-leaf.png" 
                alt="revolutionary-symbol-left"
                className="left-leaf opacity-60"
            />

            <img
                src="/images/hero-right-leaf.png"
                alt="revolutionary-symbol-right"
                className="right-leaf opacity-60"
            />
            <div className="body">
                <div className="content">
                    <div className="space-y-5 hidden md:block">
                        <p className="text-[var(--color-star-yellow)] font-bold text-lg">Tư tưởng & Công nghệ</p>
                        <p className="subtitle text-white">
                            Kết nối Lý luận <br /> với Thời đại Trí tuệ Nhân tạo
                        </p>
                    </div>

                    <div className="view-cocktails">
                        <p className="subtitle text-white mb-6">
                            Nền tảng triết học Mác – Lênin kết hợp cùng sức mạnh AI,
                            mở ra góc nhìn mới về xã hội và công nghệ trong thế kỷ 21.
                            <br /><br />
                            <span className="text-[var(--color-revolutionary-red)] font-semibold">
                                "Triết gia chỉ giải thích thế giới theo nhiều cách khác nhau, 
                                vấn đề là thay đổi nó." - Marx
                            </span>
                        </p>
                        <a 
                            href="#philosophy" 
                            className="cta-button inline-block px-8 py-3 bg-[var(--color-revolutionary-red)] text-white font-bold rounded-lg hover:bg-[var(--color-communist-red)] transition-all duration-300 transform hover:scale-105"
                        >
                            🚩 Cách mạng Tri thức ngay!
                        </a>
                    </div>
                </div>
            </div>
        </section>

        {/* Background video with revolutionary filter */}
        <div className="video absolute inset-0">
            <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                src="/videos/output.mp4"
                className="w-full h-full object-cover"
                style={{ filter: "sepia(0.2) hue-rotate(340deg) saturate(1.1)" }}
            />
        </div>
        </>
    )
}
export default Hero
