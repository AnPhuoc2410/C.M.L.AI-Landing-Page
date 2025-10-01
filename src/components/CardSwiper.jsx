import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CardSwiper = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides] = useState(10);

  // Hall of Fame - Communist AI Pioneers
  const cards = [
    {
      id: 1,
      title: "Karl Marx",
      image: "/images/p1.png",
      description: "The father of scientific socialism, whose revolutionary ideas laid the foundation for understanding class struggle and collective ownership. His vision inspires our AI-driven approach to equality.",
    },
    {
      id: 2,
      title: "Vladimir Lenin",
      image: "/images/p2.png",
      description: "Revolutionary leader who transformed theory into practice, demonstrating the power of organized collective action. His strategic thinking guides our platform's architecture.",
    },
    {
      id: 3,
      title: "Rosa Luxemburg",
      image: "/images/p3.png",
      description: "Champion of democratic socialism and workers' rights, her emphasis on mass participation reflects our community-driven AI development approach.",
    },
    {
      id: 4,
      title: "Che Guevara",
      image: "/images/p4.png",
      description: "Symbol of revolutionary change and solidarity, representing the courage to challenge established systems. His spirit drives our innovative AI solutions.",
    },
    {
      id: 5,
      title: "Antonio Gramsci",
      image: "/images/p5.png",
      description: "Philosopher of cultural hegemony and collective consciousness, his ideas inform how our AI understands and serves the people's needs.",
    },
    {
      id: 6,
      title: "Angela Davis",
      image: "/images/p6.png",
      description: "Modern revolutionary fighting for social justice and equality, her activism inspires our commitment to bias-free AI technology.",
    },
    {
      id: 7,
      title: "Thomas Sankara",
      image: "/images/p7.png",
      description: "Visionary leader who prioritized self-reliance and empowerment, embodying the principles of community-first innovation we champion.",
    },
    {
      id: 8,
      title: "Fidel Castro",
      image: "/images/p1.png",
      description: "Architect of sustainable revolution and social transformation, demonstrating how collective will can reshape society's future.",
    },
    {
      id: 9,
      title: "Ho Chi Minh",
      image: "/images/p2.png",
      description: "Leader who united people for independence and self-determination, inspiring our mission to democratize AI for all.",
    },
    {
      id: 10,
      title: "Salvador Allende",
      image: "/images/p3.png",
      description: "Democratic socialist who proved peaceful revolution is possible, reflecting our ethical approach to technological advancement.",
    },
  ];

  return (
    <div className="card-swiper-container">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="relative">
          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
            className="card-swiper"
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id}>
                <div className="card-item bg-[#f5f0e8] rounded-3xl shadow-2xl overflow-hidden mx-12">
                  {/* Card Stack Effect */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#d9d0c3] rounded-3xl transform translate-x-3 translate-y-3 -z-10"></div>
                    <div className="absolute inset-0 bg-[#e5ddd0] rounded-3xl transform translate-x-6 translate-y-6 -z-20"></div>
                    
                    {/* Main Card Content - Flex Row Layout */}
                    <div className="relative bg-[#f5f0e8] rounded-3xl p-8 min-h-[400px] flex flex-row items-center gap-8">
                      {/* Left Side - Image (Bigger) */}
                      <div className="flex-shrink-0 w-80 h-80 flex items-center justify-center">
                        <img 
                          src={card.image} 
                          alt={card.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      {/* Right Side - Title and Description */}
                      <div className="flex-1 flex flex-col justify-center pr-4">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">
                          {card.title}
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                      
                      {/* Counter at bottom */}
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                        <p className="text-2xl font-bold text-gray-800">
                          {currentSlide} / {totalSlides}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx>{`
        .card-swiper {
          padding: 40px 0;
        }
        
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          color: #fff;
        }
        
        .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default CardSwiper;
