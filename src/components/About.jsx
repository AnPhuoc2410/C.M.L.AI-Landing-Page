import gsap from 'gsap';
import { SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'

const About = () => {

    useGSAP(() => {
        const titleSplit = SplitText.create('#about h2', {
            type: 'words'
        })

        const scrollTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#about',
                start: 'top center'
            }
        })

        scrollTimeline
            .from(titleSplit.words, {
                opacity: 0, duration: 1, yPercent: 100, ease: 'expo.out', stagger: 0.02
            })
            .from('.top-grid div, .bottom-grid div', {
                opacity: 0, duration: 1, ease: 'power1.inOut', stagger: 0.04,
            }, '-=0.5')
    })

    return (
        <div id="about">
            <div className="mb-16 md:px-0 px-5">
                <div className="content">
                    <div className="md:col-span-8">
                        <p className="badge">Philosophy & AI</p>
                        <h2>
                            Nơi triết học <span className="text-white">gặp</span> công nghệ
                        </h2>
                    </div>

                    <div className="sub-content">
                        <p>
                            Triết học Mác – Lênin giúp chúng ta hiểu quy luật phát triển xã hội,
                            trong khi AI mở ra hướng ứng dụng công nghệ mới. Kết hợp cả hai tạo nên
                            tầm nhìn vừa khoa học vừa hiện đại.
                        </p>

                        <div>
                            <p className="md:text-3xl text-xl font-bold">
                                <span>4.5</span>/5
                            </p>
                            <p className="text-sm text-white-100">
                                Hơn +12000 sinh viên & nhà nghiên cứu quan tâm
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="top-grid">
                <div className="md:col-span-3">
                    <div className="noisy" />
                    <img src="/images/abt1.png" alt="about-img-1" /> {/* NOTE: thay hình sau */}
                </div>

                <div className="md:col-span-6">
                    <div className="noisy" />
                    <img src="/images/abt2.png" alt="about-img-2" /> {/* NOTE: thay hình sau */}
                </div>

                <div className="md:col-span-3">
                    <div className="noisy" />
                    <img src="/images/abt5.png" alt="about-img-5" /> {/* NOTE: thay hình sau */}
                </div>
            </div>

            <div className="bottom-grid">
                <div className="md:col-span-8">
                    <div className="noisy" />
                    <img src="/images/abt3.png" alt="about-img-3" /> {/* NOTE: thay hình sau */}
                </div>

                <div className="md:col-span-4">
                    <div className="noisy" />
                    <img src="/images/abt4.png" alt="about-img-4" /> {/* NOTE: thay hình sau */}
                </div>
            </div>
        </div>
    )
}
export default About
