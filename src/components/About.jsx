import gsap from 'gsap';
import { SplitText } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

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
                <div className="md:col-span-3 relative">
                    <div className="noisy" />
                    <img src="/images/abt1.png" alt="about-img-1" />
                </div>

                <div className="md:col-span-6 relative">
                    <div className="noisy" />
                    {/* Embedded 3D wireframe sphere moved from Hero */}
                    <div className="absolute inset-0">
                        <Canvas camera={{ position: [0, 0, 4] }}>
                            <ambientLight intensity={0.8} />
                            <directionalLight position={[4, 6, 8]} intensity={1} />
                            {/* ☭ Hammer and Sickle constructed from primitives */}
                            <group rotation={[0.2, -0.3, 0.1]} position={[0, 0.1, 0]}>
                                {/* Sickle (crescent) */}
                                <mesh rotation={[Math.PI / 2, 0, 0]}>
                                    <torusGeometry args={[1.2, 0.12, 24, 120, Math.PI * 1.35]} />
                                    <meshStandardMaterial color="#ffd54f" metalness={0.4} roughness={0.35} />
                                </mesh>

                                {/* Hammer handle */}
                                <mesh position={[-0.15, 0.2, 0.05]} rotation={[0, 0, -Math.PI / 4]}>
                                    <boxGeometry args={[0.15, 1.5, 0.15]} />
                                    <meshStandardMaterial color="#ffd54f" metalness={0.3} roughness={0.5} />
                                </mesh>

                                {/* Hammer head */}
                                <mesh position={[0.35, 0.7, 0.05]} rotation={[0, 0, -Math.PI / 4]}>
                                    <boxGeometry args={[0.5, 0.25, 0.25]} />
                                    <meshStandardMaterial color="#ffd54f" metalness={0.3} roughness={0.5} />
                                </mesh>
                            </group>

                            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
                        </Canvas>
                    </div>
                </div>

                <div className="md:col-span-3 relative">
                    <div className="noisy" />
                    <img src="/images/abt5.png" alt="about-img-5" />
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
