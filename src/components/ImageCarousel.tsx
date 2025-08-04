'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface CarouselImage {
  src: string;
  alt: string;
}

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const images: CarouselImage[] = [
    { src: '/snippets/1_Cover.png', alt: 'Book Cover' },
    { src: '/snippets/2_Filo1.png', alt: 'Page 2' },
    { src: '/snippets/3_Filo2.png', alt: 'Page 3' },
    { src: '/snippets/4_Wund1.png', alt: 'Page 4' },
    { src: '/snippets/5_Wund2.png', alt: 'Page 5' },
    { src: '/snippets/7_Recy1.png', alt: 'Page 7' },
    { src: '/snippets/8_Recy2.png', alt: 'Page 8' },
    { src: '/snippets/9_Recy3.png', alt: 'Page 9' },
    { src: '/snippets/10_Recy4.png', alt: 'Page 10' },
    { src: '/snippets/11_Re1.png', alt: 'Page 11' },
    { src: '/snippets/12_Re2.png', alt: 'Page 12' },
    { src: '/snippets/13_Zoo1.png', alt: 'Page 13' },
    { src: '/snippets/14_Zoo2.png', alt: 'Page 14' },
    { src: '/snippets/15_Boab1.png', alt: 'Page 15' },
    { src: '/snippets/16_Boab2.png', alt: 'Page 16' },
    { src: '/snippets/17_Boab3.png', alt: 'Page 17' },
    { src: '/snippets/18_Boab4.png', alt: 'Page 18' },
    { src: '/snippets/19_Heir1.png', alt: 'Page 19' },
    { src: '/snippets/20_Heir2.png', alt: 'Page 20' },
    { src: '/snippets/21_Crow1.png', alt: 'Page 21' },
    { src: '/snippets/22_Crow2.png', alt: 'Page 22' },
    { src: '/snippets/23_Crow3.png', alt: 'Page 23' },
    { src: '/snippets/24_Crow4.png', alt: 'Page 24' },
    { src: '/snippets/25_Furb1.png', alt: 'Page 25' },
    { src: '/snippets/26_Furb2.png', alt: 'Page 26' },
    { src: '/snippets/27_Purs1.png', alt: 'Page 27' },
    { src: '/snippets/28_Purs2.png', alt: 'Page 28' },
    { src: '/snippets/29_Samm1.png', alt: 'Page 29' },
    { src: '/snippets/30_Samm2.png', alt: 'Page 30' },
    { src: '/snippets/31_Regi1.png', alt: 'Page 31' },
    { src: '/snippets/32_Regi2.png', alt: 'Page 32' },
    { src: '/snippets/33_Beag1.png', alt: 'Page 33' },
    { src: '/snippets/34_Beag2.png', alt: 'Page 34' },
    { src: '/snippets/35_Regi3.png', alt: 'Page 35' },
    { src: '/snippets/36_Regi4.png', alt: 'Page 36' },
    { src: '/snippets/37_Targ1.png', alt: 'Page 37' },
    { src: '/snippets/38_Targ2.png', alt: 'Page 38' },
    { src: '/snippets/39_Ikea1.png', alt: 'Page 39' },
    { src: '/snippets/40_Ikea2.png', alt: 'Page 40' },
    { src: '/snippets/41_BOM1.png', alt: 'Page 41' },
    { src: '/snippets/42_BOM2.png', alt: 'Page 42' },
    { src: '/snippets/43_BOM3.png', alt: 'Page 43' },
    { src: '/snippets/44_BOM4.png', alt: 'Page 44' },
    { src: '/snippets/45_Airp1.png', alt: 'Page 45' },
    { src: '/snippets/46_Airp2.png', alt: 'Page 46' },
    { src: '/snippets/47_Kyl1.png', alt: 'Page 47' },
    { src: '/snippets/48_Kyl2.png', alt: 'Page 48' },
    { src: '/snippets/49_Last.png', alt: 'Page 49' },
  ];

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Touch gesture handling
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) prevImage();
    if (isRightSwipe) nextImage();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextImage, prevImage]);

  return (
    <div className="h-[90vh] flex items-center justify-center bg-gradient-to-br from-cream via-blue-gray/10 to-orange/5 relative">
      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200 group"
        aria-label="Previous image"
      >
        <svg
          className="w-6 h-6 text-dark-green group-hover:text-orange transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200 group"
        aria-label="Next image"
      >
        <svg
          className="w-6 h-6 text-dark-green group-hover:text-orange transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image Container */}
      <div 
        className="relative w-full max-w-2xl h-full flex items-center justify-center"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative h-full max-h-[80vh] aspect-[2/3] bg-black shadow-2xl rounded-lg overflow-hidden">
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 90vw, 50vw"
          />
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-orange shadow-lg'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;