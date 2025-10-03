import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CardSwiper = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides] = useState(10);

  // Philosophy 4.0 - AI Thinkers and Innovators
  const cards = [
    {
      id: 1,
      title: "Socrates Philosophiæ",
      image: "/Philosophy/Socrates.jpg",
      description:
        "Socrates (470 TCN – 399 TCN) được xem là một trong những nhà triết học vĩ đại và có ảnh hưởng nhất trong lịch sử triết học phương Tây. Ông không để lại bất kỳ tác phẩm viết nào, nhưng qua những ghi chép từ các học trò như Plato và Xenophon, tư tưởng và phương pháp của Socrates đã trở thành nền tảng cho triết học hiện đại.",
    },
    {
      id: 2,
      title: "Plato Philosophiæ",
      image: "/Philosophy/Plato.jpg",
      description:
        "Plato (427 TCN – 347 TCN) là một trong những nhà triết học vĩ đại nhất của lịch sử phương Tây, nổi bật với những đóng góp sâu sắc vào nền triết học lý tưởng và chính trị học. Ông là học trò của Socrates và thầy của Aristotle, góp phần định hình hệ tư tưởng triết học qua các tác phẩm mang tầm ảnh hưởng suốt hàng ngàn năm.",
    },
    {
      id: 3,
      title: "Aristotles Philosophiæ",
      image: "/Philosophy/Aristotles.jpg",
      description:
        "Aristotles (384 TCN – 322 TCN) là một trong những nhà triết học vĩ đại nhất trong lịch sử nhân loại, nổi bật với tư duy toàn diện và hệ thống tri thức sâu rộng. Là học trò xuất sắc của Plato, ông không chỉ kế thừa mà còn phát triển triết học theo hướng thực tế và khoa học, tạo nên nền móng cho nhiều lĩnh vực từ logic, đạo đức, chính trị đến khoa học tự nhiên.",
    },
    {
      id: 4,
      title: "Khổng Tử",
      image: "/Philosophy/Khong_Tu.jpg",
      description:
        "Khổng Tử (551 TCN – 479 TCN) là một trong những nhà triết học vĩ đại nhất của Trung Quốc, nổi bật với những tư tưởng về đạo đức, chính trị và giáo dục. Ông đã sáng lập ra Nho giáo, một hệ thống tư tưởng có ảnh hưởng sâu rộng đến văn hóa và xã hội Trung Quốc cũng như nhiều nước châu Á khác.",
    },
    {
      id: 5,
      title: "Immanuel Kant",
      image: "/Philosophy/Immanuel_Kant.jpg",
      description:
        "Immanuel Kant (1724 – 1804) là một trong những nhà triết học vĩ đại nhất của thế kỷ 18, nổi bật với những đóng góp sâu sắc vào triết học đạo đức và nhận thức luận. Ông đã phát triển thuyết duy nghiệm và lý thuyết về đạo đức dựa trên nguyên tắc phổ quát, ảnh hưởng lớn đến triết học hiện đại và các lĩnh vực khác như chính trị và nghệ thuật.",
    },
    {
      id: 6,
      title: "Pythagoras Philosophiæ",
      image: "/Philosophy/Pythagoras.jpg",
      description:
        "Pythagoras (c. 570 – c. 495 TCN) là một trong những nhà triết học và nhà toán học vĩ đại nhất của thế giới cổ đại, nổi tiếng với những đóng góp quan trọng cho hình học và triết học. Ông đã sáng lập ra một trường phái triết học dựa trên các nguyên tắc toán học và âm nhạc, ảnh hưởng lớn đến tư tưởng phương Tây.",
    },
    {
      id: 7,
      title: "René Descartes",
      image: "/Philosophy/Rene_Descartes.jpg",
      description:
        "René Descartes (1596 – 1650) là một trong những nhà triết học và toán học vĩ đại nhất của thời kỳ Khai sáng, nổi tiếng với câu nói 'Tôi tư duy, vậy tôi tồn tại'. Ông đã đặt nền móng cho triết học hiện đại thông qua phương pháp hoài nghi và phân tích.",
    },
    {
      id: 8,
      title: "Simone de Beauvoir",
      image: "/Philosophy/Simone_de_Beauvoir.png",
      description:
        "Simone de Beauvoir (1908 – 1986) là một trong những nhà triết học và nhà văn nổi bật của thế kỷ 20, được biết đến với những đóng góp quan trọng cho triết học hiện sinh và nữ quyền. Tác phẩm nổi tiếng nhất của bà, 'The Second Sex', đã đặt ra những câu hỏi sâu sắc về bản chất của giới tính và vai trò của phụ nữ trong xã hội.",
    },
    {
      id: 9,
      title: "Friedrich Nietzsche",
      image: "/Philosophy/Friedrich_Nietzsche.jpg",
      description:
        "Friedrich Nietzsche (1844 – 1900) là một trong những nhà triết học vĩ đại nhất của thế kỷ 19, nổi bật với những tư tưởng về siêu nhân, ý chí mạnh mẽ và sự phản kháng đối với các giá trị truyền thống. Ông đã đặt ra những câu hỏi sâu sắc về bản chất của con người, đạo đức và sự tồn tại.",
    },
    {
      id: 10,
      title: "Karl Marx",
      image: "/Philosophy/Karl_Marx.jpg",
      description:
        "Karl Marx (1818 – 1883) là một trong những nhà triết học và nhà kinh tế học vĩ đại nhất của thế kỷ 19, nổi tiếng với những phân tích sâu sắc về xã hội, kinh tế và chính trị. Ông đã phát triển lý thuyết về chủ nghĩa duy vật biện chứng và phê phán chủ nghĩa tư bản, ảnh hưởng lớn đến nhiều phong trào chính trị và xã hội trên toàn thế giới.",
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
