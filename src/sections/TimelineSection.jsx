import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TimelineSection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const progressLineRef = useRef(null);

  const timelineData = [
    {
      year: "2025",
      title: "Marx AI Launch",
      description: "Revolutionary AI-powered beverage hits the market, bringing collective intelligence to every sip.",
      image: "/images/hero-img.png",
      side: "left"
    },
    {
      year: "2024",
      title: "Product Development",
      description: "Perfecting the formula for collective intelligence. Neural networks meet revolutionary spirit.",
      image: "/images/static-img.png",
      side: "right"
    },
    {
      year: "2023",
      title: "Company Founded",
      description: "Building the future of AI-enhanced beverages. The revolution begins with a single drink.",
      image: "/images/big-img.png",
      side: "left"
    },
    {
      year: "2022",
      title: "Research & Innovation",
      description: "Combining artificial intelligence with beverage technology. Breaking new ground in digital solidarity.",
      image: "/images/Final.png",
      side: "right"
    }
  ];

  useEffect(() => {
    // Wait a bit to ensure FlavorSection is fully initialized
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const items = timelineRef.current.querySelectorAll('.timeline-item');
        
        // Animate timeline items
        items.forEach((item, index) => {
          gsap.fromTo(item,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              }
            }
          );
        });

        // Animate the progress line (glowing effect that follows scroll)
        if (progressLineRef.current && lineRef.current) {
          gsap.fromTo(progressLineRef.current,
            {
              height: "0%",
            },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1,
                invalidateOnRefresh: true,
              }
            }
          );
        }
      }, sectionRef);
      
      return () => {
        ctx.revert(); // Clean up properly
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="min-h-screen w-full py-32 px-4 md:px-8 lg:px-16 relative mt-20"
      style={{
        background: 'linear-gradient(to bottom right, #f5f5f4, #fef3c7, #e7e5e4)',
        zIndex: 3,
        isolation: 'isolate',
        marginTop: '0',
        clear: 'both'
      }}
      data-speed="1"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10" data-speed="0.8">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[128px]" style={{ backgroundColor: '#993140' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[128px]" style={{ backgroundColor: '#d4a574' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-4" style={{ color: '#993140' }}>
            Our Journey
          </h2>
          <p className="text-xl md:text-2xl text-stone-700">
            The evolution of revolutionary AI beverage
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center Line - Gray background */}
          <div 
            ref={lineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-stone-300 hidden md:block"
          ></div>
          
          {/* Progress Line - Glowing animated line that follows scroll */}
          <div 
            ref={progressLineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-0 hidden md:block shadow-[0_0_20px_rgba(153,49,64,0.6)]"
            style={{ 
              top: 0,
              background: 'linear-gradient(to bottom, #993140, #c43d50, #d4a574)'
            }}
          ></div>

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-24">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`timeline-item flex flex-col md:flex-row items-center gap-8 ${
                  item.side === 'right' ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${item.side === 'right' ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="bg-gradient-to-br from-amber-50 to-stone-50 p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(153,49,64,0.25)] shadow-lg" 
                    style={{ borderColor: '#d4a574' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#993140'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#d4a574'}
                  >
                    <div className="inline-block px-4 py-2 text-amber-50 font-bold rounded-full mb-4 text-sm md:text-base shadow-md" 
                      style={{ background: 'linear-gradient(to right, #993140, #c43d50)' }}
                    >
                      {item.year}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#993140' }}>
                      {item.title}
                    </h3>
                    <p className="text-stone-700 text-base md:text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="hidden md:flex w-2/12 justify-center items-center relative">
                  <div className="w-6 h-6 rounded-full border-4 border-amber-50 z-10 relative" 
                    style={{ 
                      background: 'linear-gradient(to bottom right, #993140, #c43d50)',
                      boxShadow: '0 0 20px rgba(153, 49, 64, 0.8)'
                    }}
                  >
                    {/* Pulsing ring effect */}
                    <div className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ backgroundColor: '#993140' }}></div>
                  </div>
                </div>

                {/* Image */}
                <div className="w-full md:w-5/12">
                  <div className="relative group">
                    <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" 
                      style={{ background: 'linear-gradient(to bottom right, #993140, #d4a574)' }}
                    ></div>
                    <div className="relative overflow-hidden rounded-2xl border-2 transition-all duration-300 shadow-lg" 
                      style={{ borderColor: '#d4a574' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#993140'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#d4a574'}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-xl md:text-2xl text-stone-700 mb-6 font-medium">
            Join the revolution. Experience the future.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
