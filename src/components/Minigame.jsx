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
        gsap.fromTo('#quiz-quote', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
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
        <section id="minigame" className="relative py-16">
            <h2 className="text-center text-3xl font-bold mb-2">Marx hay AI nói?</h2>
            <p className="text-center opacity-70 mb-10">Chọn nguồn gốc của trích dẫn dưới đây</p>

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
