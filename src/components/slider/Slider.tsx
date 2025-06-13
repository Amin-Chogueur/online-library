import { useState, useEffect } from "react";
import { FaArrowCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { slides } from "./sliderImages";

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const totalSlides = slides.length;

  const handleLeftArrow = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleRightArrow = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  // Auto-play slider with bidirectional effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === 0 && direction === -1) {
          setDirection(1);
          return prev + 1;
        } else if (prev === totalSlides - 1 && direction === 1) {
          setDirection(-1);
          return prev - 1;
        }
        return prev + direction;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [direction, totalSlides]);

  return (
    <div className="absolute left-0 top-0 right-0 overflow-hidden w-full h-screen">
      {/* Left Arrow Button */}
      <button
        onClick={handleLeftArrow}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-3xl z-10"
      >
        <FaArrowAltCircleLeft />
      </button>

      <div
        className="flex transition-transform duration-700"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-screen relative">
            <img
              src={slide.image}
              className="w-full h-full"
              alt={`Slide ${slide.id}`}
              style={{ objectFit: "cover" }}
            />
            <div className="bg-gray-900 p-4 rounded-[50px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <h3 className=" text-orange-600 text-lg sm:text-3xl lg:text-5xl sm:mb-5  text-center">
                {slide.imageTitle}
              </h3>
              <p className="text-lg hidden sm:block text-center">
                {slide.imageDes}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow Button */}
      <button
        onClick={handleRightArrow}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-accent text-3xl z-10"
      >
        <FaArrowCircleRight />
      </button>
    </div>
  );
}

export default Slider;
