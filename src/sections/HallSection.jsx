import CardSwiper from "../components/CardSwiper";

const HallSection = () => {
  return (
    <section className="weirdos-section bg-[#2e2e2e] min-h-screen py-20">
      <div className="container mx-auto flex">
        {/* Header */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <br/> Hall of Fame
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-4 text-gray-300">
            <p className="text-lg">
              Honoring the revolutionary thinkers and leaders whose ideas shaped the vision of collective power and social justice.
            </p>
            
            <p className="text-base">
              These pioneers of equality and solidarity inspire Communist AI's mission to create bias-free, 
              collectively-owned artificial intelligence that serves the people, not profit. 
              Their legacy lives on in our commitment to democratize technology for all.
            </p>
          </div>
        </div>

        {/* Card Swiper */}
        <CardSwiper />
      </div>
    </section>
  );
};

export default HallSection;
