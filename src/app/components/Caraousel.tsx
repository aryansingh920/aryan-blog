import React, { useState, useEffect } from "react";

interface CarouselProps {
  /** Array of iframe source URLs */
  iframes: string[];
  /** Auto shuffle interval in milliseconds */
  autoShuffleInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  iframes,
  autoShuffleInterval = 7000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0); // State for forcing a re-render when the carousel loops

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? iframes.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === iframes.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    // Auto shuffle (next slide every `autoShuffleInterval` ms)
    const interval = setInterval(() => {
      handleNext();
    }, autoShuffleInterval);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [autoShuffleInterval]);

  // Trigger re-render after the last slide to reset the carousel
  useEffect(() => {
    if (currentIndex === iframes.length - 1) {
      setTimeout(() => {
        setKey((prevKey) => prevKey + 1); // Reset carousel position after the last slide
        setCurrentIndex(0); // Reset to first slide
      }, 300); // Delay for smooth transition
    }
  }, [currentIndex, iframes.length]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides wrapper */}
      <div
        key={key} // Reset the carousel when the key changes
        className="flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {iframes.map((src, idx) => (
          <div key={idx} className="w-full flex-shrink-0">
            <iframe
              src={src}
              title={`iframe-${idx}`}
              className="w-full h-56 md:h-96"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
      >
        ›
      </button>

      {/* Indicators (Optional) */}
      <div className="absolute bottom-2 w-full flex justify-center space-x-2">
        {iframes.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full ${
              idx === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
