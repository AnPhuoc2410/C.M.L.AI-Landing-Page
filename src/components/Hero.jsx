import React, { useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { useGSAP } from "@gsap/react"
import { useMediaQuery } from "react-responsive"

const Hero = () => {
    const videoRef = useRef()
    const isMobile = useMediaQuery({ maxWidth: 767 })

    useGSAP(() => {
        const heroSplit = new SplitText(".title", { type: "chars, words" })
        const paragraphSplit = new SplitText(".subtitle", { type: "lines" })

        // Gradient text effect
        heroSplit.chars.forEach((char) => char.classList.add("text-gradient"))

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
        })

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
        })

        // floating leaf effect
        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        })
        .to(".right-leaf", { y: 200 }, 0)
        .to(".left-leaf", { y: -200 }, 0)

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
            })
        }
    }, [])

    return (
        <>
        <section id="hero" className="noisy relative">
            <h1 className="title">CMLAI</h1>

            {/* Asset trang trí (giữ nguyên, cần đổi sau) */}
            <img
                src="/images/hero-left-leaf.png" 
                alt="left-symbol"  // 📌 đổi: hình tượng sách Marx hoặc biểu tượng triết học
                className="left-leaf"
            />

            <img
                src="/images/hero-right-leaf.png"
                alt="right-symbol" // 📌 đổi: hình tượng chip AI hoặc neural network
                className="right-leaf"
            />

            <div className="body">
                <div className="content">
                    <div className="space-y-5 hidden md:block">
                        <p>Tư tưởng & Công nghệ</p>
                        <p className="subtitle">
                            Kết nối Lý luận <br /> với Thời đại Trí tuệ Nhân tạo
                        </p>
                    </div>

                    <div className="view-cocktails">
                        <p className="subtitle">
                            Nền tảng triết học Mác – Lênin kết hợp cùng sức mạnh AI,
                            mở ra góc nhìn mới về xã hội và công nghệ trong thế kỷ 21.
                        </p>
                        <a href="#theory">Khám phá ngay</a>
                    </div>
                </div>
            </div>
        </section>

        {/* Video nền */}
        <div className="video absolute inset-0">
            <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                src="/videos/output.mp4" 
                // 📌 đổi: video nền AI / digital / triết học
            />
        </div>
        </>
    )
}
export default Hero
