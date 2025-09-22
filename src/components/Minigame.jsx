'use client';
import { allConcepts } from '../../constants/index.js'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';

const MiniGame = () => {
    const contentRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    useGSAP(() => {
        gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
        gsap.fromTo('.concept img', { opacity: 0, xPercent: -100 }, {
            xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut'
        });
        gsap.fromTo('.details h2', { yPercent: 100, opacity: 0 }, {
            yPercent: 0, opacity: 1, ease: 'power1.inOut'
        });
        gsap.fromTo('.details p', { yPercent: 100, opacity: 0 }, {
            yPercent: 0, opacity: 1, ease: 'power1.inOut'
        });
    }, [currentIndex]);

    const totalConcepts = allConcepts.length;

    const goToSlide = (index) => {
        const newIndex = (index + totalConcepts) % totalConcepts;
        setCurrentIndex(newIndex);
    }

    const getConceptAt = (indexOffset) => {
        return allConcepts[(currentIndex + indexOffset + totalConcepts) % totalConcepts]
    }

    const currentConcept = getConceptAt(0);
    const prevConcept = getConceptAt(-1);
    const nextConcept = getConceptAt(1);

    return (
        <section id="minigame" aria-labelledby="minigame-heading" className="relative py-16">
            {/* TODO: Replace these leaf images with themed icons if needed */}
            <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
            <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

            <h2 id="minigame-heading" className="text-center text-3xl font-bold mb-10">
                Mini Game: Marx hay AI nói?
            </h2>

            {/* Navigation tabs */}
            <nav className="concept-tabs flex justify-center flex-wrap gap-3 mb-8" aria-label="Concept Navigation">
                {allConcepts.map((concept, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <button
                            key={concept.id}
                            className={`
                                px-4 py-2 border rounded-full text-sm transition-all
                                ${isActive ? 'text-white border-white bg-gray-800' : 'text-white/50 border-white/50 hover:text-white hover:border-white'}
                            `}
                            onClick={() => goToSlide(index)}
                        >
                            {concept.name}
                        </button>
                    )
                })}
            </nav>

            <div className="content grid md:grid-cols-2 gap-8 items-center">
                {/* Arrows */}
                <div className="arrows absolute top-1/2 left-0 right-0 flex justify-between px-4">
                    <button onClick={() => goToSlide(currentIndex - 1)} className="flex items-center gap-2">
                        <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
                        <span className="hidden md:inline">{prevConcept.name}</span>
                    </button>
                    <button onClick={() => goToSlide(currentIndex + 1)} className="flex items-center gap-2">
                        <span className="hidden md:inline">{nextConcept.name}</span>
                        <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
                    </button>
                </div>

                {/* Current concept image */}
                <div className="concept flex justify-center">
                    <img
                        src={currentConcept.image}
                        className="object-contain max-h-[300px]"
                        alt={currentConcept.name}
                    />
                </div>

                {/* Current concept details */}
                <div className="details text-center md:text-left">
                    <div ref={contentRef} className="info mb-4">
                        <p className="text-sm uppercase tracking-wider text-gray-400">Quote from:</p>
                        <p id="title" className="text-xl font-bold">{currentConcept.name}</p>
                    </div>
                    <h2 className="text-2xl font-semibold mb-3">{currentConcept.title}</h2>
                    <p className="text-gray-300">{currentConcept.description}</p>
                </div>
            </div>
        </section>
    )
}
export default MiniGame;
