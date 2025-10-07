import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import backgroundImage from "figma:asset/03135be46c4cb7673dcd56b59eb7aed66d11586c.png";
import logoImage from "figma:asset/7093121508f4e8472b47ab0536d669c9003e4afe.png";
import chaseImage from "figma:asset/0112d34f09af9f1f8e16a7be363ea4e6d6deec56.png";

export function Gallery() {
  const images = [
    {
      src: backgroundImage,
      alt: "Snowy winter scene with trees and musical notes",
      caption: "The magical winter atmosphere that sets the tone for our Christmas performances"
    },
    {
      src: logoImage,
      alt: "a 6 String Christmas by Chase Padgett logo",
      caption: "The official logo representing our unique acoustic Christmas experience"
    },
    {
      src: chaseImage,
      alt: "Chase Padgett jumping out of a Christmas present with guitar",
      caption: "Chase bringing surprise and delight to audiences with his one-man Christmas show"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, images.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl mb-6 text-red-800 uppercase font-bold"
              style={{ 
                fontFamily: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif',
                letterSpacing: '0.15em',
                textShadow: '2px 2px 4px rgba(220, 38, 38, 0.2)'
              }}
            >
              Performance Gallery
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Experience the magic of 6 String Christmas through these moments from past performances
            </p>
          </div>

          <div className="relative">
            <Card className="overflow-hidden shadow-2xl border-red-200">
              <div className="relative h-[500px] md:h-[600px]">
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  className="w-full h-full object-contain bg-gradient-to-br from-red-50 to-green-50"
                />
                
                {/* Overlay with caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <p className="text-white text-lg md:text-xl text-center">
                    {images[currentIndex].caption}
                  </p>
                </div>

                {/* Navigation buttons */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-red-200 text-red-800 hover:text-red-900"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-red-200 text-red-800 hover:text-red-900"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Auto-play indicator */}
                {isAutoPlaying && (
                  <div className="absolute top-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                    Auto-playing
                  </div>
                )}
              </div>
            </Card>

            {/* Dot indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-red-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-red-600 h-1 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((currentIndex + 1) / images.length) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}