import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import backgroundImage from "figma:asset/03135be46c4cb7673dcd56b59eb7aed66d11586c.png";
import logoImage from "figma:asset/7093121508f4e8472b47ab0536d669c9003e4afe.png";
import chaseImage from "figma:asset/0112d34f09af9f1f8e16a7be363ea4e6d6deec56.png";
import photo1 from "../assets/MC3_3158.JPG";
import photo2 from "../assets/MC3_6071.JPG";
import photo3 from "../assets/MC3_6189-Enhanced-NR.JPG";
import photo4 from "../assets/MC3_6355-Enhanced-NR.JPG";
import photo5 from "../assets/MC3_6576-Enhanced-NR.JPG";
import photo6 from "../assets/MJC_5933-Enhanced-NR.JPG";
import photo7 from "../assets/MJC_6884.JPG";
import photo8 from "../assets/MJC_6918-Enhanced-NR.JPG";
import photo9 from "../assets/MJC_7135-Enhanced-NR.JPG";
import photo10 from "../assets/MJC_7665-Enhanced-NR.JPG";

export function Gallery() {
  const images = [
    {
      src: photo1,
      alt: "Chase Padgett performing with guitar and Christmas lights",
      caption: ""
    },
    {
      src: photo2,
      alt: "Live performance on stage with stage lights",
      caption: ""
    },
    {
      src: photo3,
      alt: "Performing with red electric guitar",
      caption: ""
    },
    {
      src: photo4,
      alt: "Christmas stage performance with microphone",
      caption: ""
    },
    {
      src: photo5,
      alt: "Festive holiday performance with Christmas decorations",
      caption: ""
    },
    {
      src: photo6,
      alt: "Acoustic guitar performance with Christmas trees",
      caption: ""
    },
    {
      src: photo7,
      alt: "Christmas concert with stage decorations",
      caption: ""
    },
    {
      src: photo8,
      alt: "Holiday music performance with festive lighting",
      caption: ""
    },
    {
      src: photo9,
      alt: "Live Christmas show with audience",
      caption: ""
    },
    {
      src: photo10,
      alt: "Christmas performance with festive atmosphere",
      caption: ""
    },
    {
      src: logoImage,
      alt: "6 String Christmas by Chase Padgett logo",
      caption: ""
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
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl mb-6 text-red-800 uppercase font-bold"
              style={{ 
                fontFamily: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif',
                letterSpacing: '0.15em',
                textShadow: '2px 2px 0px rgba(255, 235, 59, 0.9), 3px 3px 0px rgba(255, 223, 0, 0.6)'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Performance Gallery
            </motion.h2>
            <motion.p 
              className="text-2xl text-gray-700 max-w-5xl mx-auto" 
              style={{ fontFamily: '"Zain", "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Experience the magic of 6 String Christmas through these moments from past performances.
            </motion.p>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="overflow-hidden shadow-2xl border-red-200">
              <div className="gallery-stage relative">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}