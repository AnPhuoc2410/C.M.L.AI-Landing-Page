import { useMediaQuery } from "react-responsive";

const FooterSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <section id="footer-section" className="footer-section">
      <img
        src="/images/footer-dip.png"
        alt=""
        className="w-full object-cover -translate-y-1"
      />

      <div className="2xl:h-[80dvh] md:h-[90dvh] h-auto relative md:pt-[10vh] pt-[5vh]">
        <div className="overflow-hidden z-10">
          <h1 className="2xl:text-7xl md:text-6xl text-4xl font-bold uppercase text-center text-milk py-3">
            #PHILOSOPHY4.0
          </h1>
        </div>

        {isMobile ? (
          <img
            src="/images2/Triet7.png"
            className="absolute top-0 object-contain"
          />
        ) : (
          <video
            src="/videos/splash.mp4"
            autoPlay
            playsInline
            muted
            className="absolute top-0 object-contain mix-blend-lighten"
          />
        )}

        <div className="flex-center gap-5 relative z-10 md:mt-20 mt-5">
          <div className="social-btn">
            <img src="./images/yt.svg" alt="" />
          </div>
          <div className="social-btn">
            <img src="./images/insta.svg" alt="" />
          </div>
          <div className="social-btn">
            <img src="./images/tiktok.svg" alt="" />
          </div>
        </div>

        <div className="2xl:mt-20 md:mt-16 mt-10 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-base text-sm font-medium">
          <div className="flex items-center md:gap-16 gap-5">
            <div>
              <p>Philosophy 4.0</p>
            </div>
            <div>
              <p>AI Club</p>
              <p>Triết học AI</p>
              <p>Tư duy 4.0</p>
            </div>
            <div>
              <p>Cộng đồng</p>
              <p>Liên hệ</p>
              <p>Philosophy Talk</p>
            </div>
          </div>

          <div className="md:max-w-lg">
            <p>
              Tham gia cộng đồng Philosophy 4.0 để được cập nhật những
              breakthrough mới nhất về AI edge và triết học, cùng các sự kiện
              học tập thú vị!
            </p>
            <div className="flex justify-between items-center border-b border-[#D9D9D9] py-5 md:mt-10">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="w-full placeholder:font-sans placeholder:text-[#999999]"
              />
              <img src="/images/arrow.svg" alt="arrow" />
            </div>
          </div>
        </div>

        <div className="copyright-box">
          <p>Copyright © 2025 Philosophy 4.0 - All Rights Reserved</p>
          <div className="flex items-center gap-7">
            <p>Chính sách bảo mật</p>
            <p>Điều khoản sử dụng</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
