import { useEffect, useRef, useState } from "react";

type ImageSliderProps = {
  images: string[];
  autoSlide?: boolean;
  slideInterval?: number;
};

const ImageSlider = ({
  images,
  autoSlide = true,
  slideInterval = 3000,
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Clone first & last image for infinite effect
  const extendedImages = [
    images[images.length - 1],
    ...images,
    images[0],
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  // Auto slide
  useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(() => {
      nextSlide();
    }, slideInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoSlide, slideInterval]);

  // Infinite loop logic
  useEffect(() => {
    const slider = sliderRef.current;

    const handleTransitionEnd = () => {
      if (currentIndex === extendedImages.length - 1) {
        // Jump to first real image
        setTransitionEnabled(false);
        setCurrentIndex(1);
      }

      if (currentIndex === 0) {
        // Jump to last real image
        setTransitionEnabled(false);
        setCurrentIndex(images.length);
      }
    };

    slider?.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      slider?.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [currentIndex, extendedImages.length, images.length]);

  // Re-enable transition after instant jump
  useEffect(() => {
    if (!transitionEnabled) {
      const timeout = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [transitionEnabled]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      {/* Slider */}
      <div
        ref={sliderRef}
        className={`flex ${
          transitionEnabled
            ? "transition-transform duration-700 ease-in-out"
            : ""
        }`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {extendedImages.map((image, index) => (
          <div
            key={index}
            className="min-w-full h-[400px] flex-shrink-0"
          >
            <img
              src={image}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-full hover:bg-black/70 transition"
      >
        ❮
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-full hover:bg-black/70 transition"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index + 1)}
            className={`w-3 h-3 rounded-full transition ${
              currentIndex === index + 1
                ? "bg-white scale-110"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;