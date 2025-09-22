'use client';
import { quizQuestions } from '../../constants/index.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const shuffleArray = (array) => {
    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
}

const MiniGame = () => {
    const containerRef = useRef()
    const [index, setIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [answered, setAnswered] = useState(false)
    const [selected, setSelected] = useState(null)
    const [finished, setFinished] = useState(false)

    const questions = useMemo(() => shuffleArray(quizQuestions).slice(0, 5), [])
    const current = questions[index]

    useGSAP(() => {
        // Revolutionary entrance animation
        gsap.fromTo('#quiz-quote',
            {
                opacity: 0,
                y: 30,
                scale: 0.9,
                rotationX: 45
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                duration: 0.8,
                ease: 'back.out(1.7)'
            }
        )

        // Revolutionary symbols animation
        gsap.to('.revolutionary-symbol', {
            rotation: 360,
            duration: 10,
            ease: 'none',
            repeat: -1,
            stagger: 2
        })

        // Quiz container pulse effect
        gsap.to('.quiz-container', {
            boxShadow: '0 0 40px rgba(211, 47, 47, 0.3), inset 0 0 20px rgba(255, 235, 59, 0.1)',
            duration: 3,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1
        })
    }, [index])

    const pick = (choice) => {
        if (answered) return
        setSelected(choice)
        const isCorrect = choice === current.answer
        setScore((s) => s + (isCorrect ? 1 : 0))
        setAnswered(true)
    }

    const next = () => {
        if (!answered) return
        const hasNext = index + 1 < questions.length
        if (hasNext) {
            setIndex((i) => i + 1)
            setAnswered(false)
            setSelected(null)
        } else {
            setFinished(true)
        }
    }

    const restart = () => {
        window.location.reload()
    }

    return (
        <section id="minigame" className="relative py-16 bg-gradient-to-br from-black via-[var(--color-deep-red)] to-black">
            {/* Revolutionary background symbols */}
            <div className="revolutionary-symbol absolute top-10 left-10 text-6xl text-[var(--color-star-yellow)] opacity-20">☭</div>
            <div className="revolutionary-symbol absolute top-20 right-20 text-5xl text-[var(--color-revolutionary-red)] opacity-20">⚒</div>
            <div className="revolutionary-symbol absolute bottom-20 left-1/4 text-4xl text-[var(--color-star-yellow)] opacity-15">🚩</div>
            <div className="revolutionary-symbol absolute bottom-10 right-1/3 text-3xl text-[var(--color-revolutionary-red)] opacity-15">⭐</div>

            <div className="relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gradient mb-4">
                        ☭ Marx hay AI nói? ☭
                    </h2>
                    <p className="text-[var(--color-star-yellow)] text-lg font-semibold mb-2">
                        🧠 Trò chơi Cách mạng Tri thức 🧠
                    </p>
                    <p className="text-white opacity-80">
                        Kiểm tra khả năng phân biệt giữa tư tưởng Marx-Lenin và AI hiện đại
                    </p>
                </div>
            </div>

            {!finished ? (
                <div ref={containerRef} className="mx-auto max-w-3xl border border-white/10 rounded-2xl p-6 md:p-8 bg-black/30 backdrop-blur">
                    <div id="quiz-quote" className="text-center md:text-2xl text-xl leading-relaxed mb-6">
                        “{current.quote}”
                    </div>
                    <div className="flex justify-center gap-4 md:gap-6">
                        {['Marx', 'AI'].map((label) => {
                            const base = 'px-6 py-3 rounded-full border transition-all text-sm md:text-base'
                            const state = answered
                                ? label === current.answer
                                    ? 'bg-yellow text-black border-yellow'
                                    : label === selected
                                        ? 'opacity-50 border-white/20'
                                        : 'border-white/20'
                                : 'hover:border-yellow'
                            return (
                                <button
                                    key={label}
                                    className={`${base} ${state}`}
                                    onClick={() => pick(label)}
                                    aria-pressed={selected === label}
                                >
                                    {label}
                                </button>
                            )
                        })}
                    </div>

                    <div className="mt-8 text-center min-h-[72px]">
                        {answered && (
                            <div>
                                <p className="font-semibold mb-1">
                                    {selected === current.answer ? 'Chính xác!' : 'Chưa đúng.'}
                                </p>
                                <p className="opacity-80 text-sm">
                                    Nguồn: {current.source} — {current.explanation}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <p className="opacity-70 text-sm">Điểm: {score}/{questions.length}</p>
                        <button
                            className={`px-5 py-2 rounded-md border ${answered ? 'border-yellow hover:bg-yellow hover:text-black' : 'border-white/20 opacity-50 cursor-not-allowed'}`}
                            onClick={next}
                            disabled={!answered}
                        >
                            {index + 1 < questions.length ? 'Câu tiếp theo' : 'Hoàn thành'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mx-auto max-w-xl text-center space-y-4">
                    <h3 className="text-2xl font-bold">Hoàn thành!</h3>
                    <p className="opacity-80">Bạn đạt {score}/{questions.length} điểm.</p>
                    <button className="px-6 py-3 rounded-md border border-yellow hover:bg-yellow hover:text-black" onClick={restart}>Chơi lại</button>
                </div>
            )}
        </section>
    )
}

export default MiniGame
