'use client';
import { quizQuestions } from '../../constants/index.js'
import { useRef, useState } from 'react'
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
    const quoteRef = useRef(null)
    const cardRef = useRef(null)
        const [questions, setQuestions] = useState(() => shuffleArray(quizQuestions).slice(0, 5))
        const [index, setIndex] = useState(0)
        const [score, setScore] = useState(0)
        const [answered, setAnswered] = useState(false)
        const [selected, setSelected] = useState(null)
        const [finished, setFinished] = useState(false)
    const current = questions[index]

    useGSAP(() => {
        gsap.from(cardRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#minigame',
                start: 'top 80%'
            }
        })
    }, [])

    useGSAP(() => {
        gsap.fromTo(
            quoteRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
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
            setQuestions(shuffleArray(quizQuestions).slice(0, 5))
            setIndex(0)
            setScore(0)
            setAnswered(false)
            setSelected(null)
            setFinished(false)
    }

    return (
        <section id="minigame" className="section-spacing">
            <div className="relative">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.18),transparent_60%)]" />
                <div className="section-shell gap-10 text-center">
                    <div className="mx-auto max-w-3xl space-y-4">
                        <span className="section-heading">Interactive learning</span>
                        <h2 className="section-title">Who said it—historic theory or modern AI?</h2>
                        <p className="section-subtitle">
                            Sharpen your interpretive skills by matching quotes to their origins. Trace how language carries ideology across
                            eras, and how machines remix it today.
                        </p>
                    </div>

                    {!finished ? (
                        <div
                            ref={cardRef}
                            className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-left shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_60%)]" />
                            <div className="relative space-y-8">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Quote {index + 1} of {questions.length}</p>
                                    <blockquote ref={quoteRef} className="mt-4 text-xl font-medium leading-relaxed text-white md:text-2xl">
                                        “{current.quote}”
                                    </blockquote>
                                </div>

                                <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                                    {['Marx', 'AI'].map((label) => {
                                        const isCorrect = label === current.answer
                                        const isSelected = selected === label
                                        return (
                                            <button
                                                key={label}
                                                onClick={() => pick(label)}
                                                aria-pressed={isSelected}
                                                className={`relative flex-1 rounded-2xl border px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] transition-all duration-200 ${
                                                    answered
                                                        ? isCorrect
                                                            ? 'border-emerald-300/60 bg-emerald-400/10 text-emerald-200 shadow-inner shadow-emerald-400/20'
                                                            : isSelected
                                                                ? 'border-white/10 bg-black/40 text-slate-500'
                                                                : 'border-white/10 bg-black/30 text-slate-400'
                                                        : 'border-white/10 bg-black/30 text-slate-200 hover:border-white/30 hover:bg-white/10'
                                                }`}
                                            >
                                                {label}
                                                <span className="absolute inset-0 rounded-2xl border border-white/5 opacity-0 transition-opacity duration-200 hover:opacity-100" />
                                            </button>
                                        )
                                    })}
                                </div>

                                <div className="min-h-[88px] rounded-2xl border border-white/5 bg-black/40 p-5 backdrop-blur-md">
                                    {answered ? (
                                        <div className="space-y-3">
                                            <p className="text-lg font-semibold text-white">
                                                {selected === current.answer ? 'Correct insight' : 'A thoughtful misstep'}
                                            </p>
                                            <p className="text-sm text-slate-300">
                                                Source: {current.source} — {current.explanation}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-400">Choose an answer to reveal the context behind the statement.</p>
                                    )}
                                </div>

                                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                                    <p className="text-sm text-slate-400">Score: {score}/{questions.length}</p>
                                    <button
                                        onClick={next}
                                        disabled={!answered}
                                        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                                            answered
                                                ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-white hover:opacity-95'
                                                : 'bg-white/5 text-slate-500'
                                        }`}
                                    >
                                        {index + 1 < questions.length ? 'Next prompt' : 'See results'}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mx-auto max-w-xl space-y-6">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                                <h3 className="text-2xl font-semibold text-white">Great reflections!</h3>
                                <p className="mt-3 text-slate-200">You scored {score}/{questions.length}. Share your insights with the cohort or run it again.</p>
                                <button
                                    onClick={restart}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/30"
                                >
                                    Play again
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9A7.5 7.5 0 0 1 12 1.5v0A7.5 7.5 0 0 1 19.5 9M12 22.5V12m0 0 3.75 3.75M12 12 8.25 15.75" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default MiniGame
