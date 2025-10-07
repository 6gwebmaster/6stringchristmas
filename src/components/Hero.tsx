import { Button } from "./ui/button";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import backgroundImage from "figma:asset/03135be46c4cb7673dcd56b59eb7aed66d11586c.png";
import logoImage from "figma:asset/7093121508f4e8472b47ab0536d669c9003e4afe.png";
import chaseImage from "figma:asset/0112d34f09af9f1f8e16a7be363ea4e6d6deec56.png";
import { Snow } from "./Snow";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToShows = () => {
    const element = document.getElementById('shows');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-[88vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - Snowy Scene */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Snowy winter scene with trees and musical notes"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated Snow Effect */}
      <Snow />

      {/* Main Content Container - Desktop: Side by Side, Mobile: Stacked */}
      <div className="relative z-10 w-full h-full px-4 lg:px-8">
        
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between h-full">
          {/* Left Side - Logo */}
          <motion.div 
            className="flex justify-start"
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.4, 
              ease: [0.76, 0, 0.24, 1],
              opacity: { duration: 1.2, ease: "easeOut" }
            }}
          >
            <img
              src={logoImage}
              alt="a 6 String Christmas by Chase Padgett"
              className="w-full max-w-2xl xl:max-w-4xl h-auto"
              style={{
                transform: `translateY(${scrollY * -0.3}px)`
              }}
            />
          </motion.div>

          {/* Right Side - Chase Jumping Out of Present */}
          <motion.div 
            className="flex justify-end"
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.4, 
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2,
              opacity: { duration: 1.2, ease: "easeOut", delay: 0.2 }
            }}
          >
            <img
              src={chaseImage}
              alt="Chase Padgett jumping out of a Christmas present with guitar"
              className="w-full max-w-2xl xl:max-w-3xl h-auto"
            />
          </motion.div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden flex flex-col items-center justify-center h-full space-y-8">
          {/* Logo - Top */}
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.4, 
              ease: [0.76, 0, 0.24, 1],
              opacity: { duration: 1.2, ease: "easeOut" }
            }}
          >
            <img
              src={logoImage}
              alt="a 6 String Christmas by Chase Padgett"
              className="w-full max-w-2xl h-auto"
              style={{
                transform: `translateY(${scrollY * -0.3}px)`
              }}
            />
          </motion.div>

          {/* Chase Image - Bottom */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.4, 
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2,
              opacity: { duration: 1.2, ease: "easeOut", delay: 0.2 }
            }}
          >
            <img
              src={chaseImage}
              alt="Chase Padgett jumping out of a Christmas present with guitar"
              className="w-full max-w-3xl h-auto"
            />
          </motion.div>
        </div>
      </div>




    </section>
  );
}