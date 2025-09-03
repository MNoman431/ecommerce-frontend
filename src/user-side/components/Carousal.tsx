import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const images = ["/top-cover-one.jpg", "/top-cover-two.jpg", "/top-cover-three.jpg"];

const Carousal: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = (): void => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (): void => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group w-full max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-2xl">
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-72 md:h-[28rem] object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
      />

      {/* Gradient overlay for better contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

      {/* Left arrow */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute top-1/2 left-4 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md hover:shadow-lg transition opacity-0 group-hover:opacity-100"
      >
        <FiChevronLeft size={24} />
      </button>

      {/* Right arrow */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute top-1/2 right-4 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md hover:shadow-lg transition opacity-0 group-hover:opacity-100"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {images.map((_, index) => {
          const isActive = currentIndex === index;
          return (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
              className={`h-3.5 w-3.5 rounded-full transition-all ${
                isActive
                  ? "bg-white ring-2 ring-white/70 scale-110"
                  : "bg-white/60 hover:bg-white/80"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousal;
