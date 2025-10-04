import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CardSwiper = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides] = useState(10);

  // Philosophy 4.0 - AI Thinkers and Innovators
  const cards = [
    {
      id: 1,
      key: "socrates",
      image: "/Philosophy/Socrates.jpg",
    },
    {
      id: 2,
      key: "plato",
      image: "/Philosophy/Plato.jpg",
    },
    {
      id: 3,
      key: "aristotle",
      image: "/Philosophy/Aristotles.jpg",
    },
    {
      id: 4,
      key: "confucius",
      image: "/Philosophy/Khong_Tu.jpg",
    },
    {
      id: 5,
      key: "kant",
      image: "/Philosophy/Immanuel_Kant.jpg",
    },
    {
      id: 6,
      key: "pythagoras",
      image: "/Philosophy/Pythagoras.jpg",
    },
    {
      id: 7,
      key: "descartes",
      image: "/Philosophy/Rene_Descartes.jpg",
    },
    {
      id: 8,
      key: "beauvoir",
      image: "/Philosophy/Simone_de_Beauvoir.png",
    },
    {
      id: 9,
      key: "nietzsche",
      image: "/Philosophy/Friedrich_Nietzsche.jpg",
    },
    {
      id: 10,
      key: "marx",
      image: "/Philosophy/Karl_Marx.jpg",
    },
  ];

  return (
    <div className="card-swiper-container relative">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="relative isolate">
          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
            className="card-swiper"
            touchEventsTarget="container"
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id}>
                <div className="card-item bg-[#f5f0e8] rounded-3xl shadow-2xl mx-12 my-8">
                  {/* Card Stack Effect */}
                  <div className="relative isolate">
                    <div className="absolute inset-0 bg-[#d9d0c3] rounded-3xl transform translate-x-3 translate-y-3 -z-10"></div>
                    <div className="absolute inset-0 bg-[#e5ddd0] rounded-3xl transform translate-x-6 translate-y-6 -z-20"></div>

                    {/* Main Card Content - Flex Row Layout */}
                    <div className="relative bg-[#f5f0e8] rounded-3xl p-8 min-h-[400px] flex flex-row items-center gap-8 z-10">
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
                          {t(`philosophers.${card.key}.title`)}
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {t(`philosophers.${card.key}.description`)}
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
          position: relative;
          z-index: 1;
        }

        .card-swiper-container {
          position: relative;
          z-index: 1;
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
