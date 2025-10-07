import React from "react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import orlandoWeeklyLogo from "figma:asset/23d7f94d2a94d466921a75d5933c8162fe60b943.png";
import { useEffect } from "react";
import { motion } from "motion/react";

export function About() {
  useEffect(() => {
    // Load Vimeo player script
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script if component unmounts
      const existingScript = document.querySelector('script[src="https://player.vimeo.com/api/player.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section id="about" className="pt-20 pb-20 bg-gradient-to-br from-red-50 via-white to-green-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Animated Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl mb-8 text-red-800 uppercase font-bold"
              style={{ 
                fontFamily: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif',
                letterSpacing: '0.15em',
                textShadow: '2px 2px 4px rgba(220, 38, 38, 0.2), 4px 0 8px rgba(255, 215, 0, 0.6), 8px 0 12px rgba(255, 255, 0, 0.3), 12px 0 16px rgba(255, 215, 0, 0.1)'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              About
            </motion.h2>
            <motion.p 
              className="text-2xl text-gray-700 max-w-3xl mx-auto font-medium mb-10"
              style={{ fontFamily: '"Mogra", "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.span
                className="inline-block"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
              >
                ⭐
              </motion.span> Christmas Comedy Meets Musical Magic <motion.span
                className="inline-block"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
              >
                ⭐
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Content Grid with Animations */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative">
                <p className="text-2xl text-gray-700 leading-relaxed relative z-10" style={{ fontFamily: '"Zain", "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif' }}>
                  Chase Padgett brings his prodigious talents as a singer, guitarist, comedian, and 
                  storyteller to this unforgettable evening of Christmas spirit. This show is stuffed like a stocking 
                  with timeless Christmas music as well as tons of jokes and stories about how Christmas changed 
                  Chase's life forever.
                </p>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-2xl text-gray-700 leading-relaxed" style={{ fontFamily: '"Zain", "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif' }}>
                  His blazing guitar work, lighting fast wit, and surprisingly soulful singing 
                  voice will remind any audience why Christmas is such a special time of year. <span className="text-red-800 font-bold">✨ Perfect for all ages! ✨</span>
                </p>
              </motion.div>
            </motion.div>
            
            {/* Video with Animation */}
            <motion.div 
              className="relative rounded-lg overflow-hidden shadow-2xl group"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
              <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                <iframe 
                  src="https://player.vimeo.com/video/905410003?badge=0&autopause=0&player_id=0&app_id=58479" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
                  title="Chase Padgett: 6 String Christmas - Sizzle Reel"
                />
              </div>
            </motion.div>
          </div>

          {/* Enhanced Testimonial Card */}
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-white via-red-50 to-green-50 border-2 border-red-200 shadow-2xl max-w-4xl mx-auto overflow-hidden">
                <CardContent className="p-8 md:p-12 relative">
                  {/* Decorative Quote Marks */}
                  <div className="absolute top-4 left-4 text-8xl text-red-200 opacity-20 font-serif leading-none">"</div>
                  <div className="absolute bottom-4 right-4 text-8xl text-green-200 opacity-20 font-serif leading-none">"</div>
                  
                  {/* Quote Content */}
                  <motion.blockquote 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-900 mb-8 leading-tight relative z-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    "Padgett's holiday spirit shines bright"
                  </motion.blockquote>
                  
                  {/* Logo */}
                  <motion.div 
                    className="flex justify-center relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <img 
                      src={orlandoWeeklyLogo}
                      alt="Orlando Weekly"
                      className="h-16 md:h-20 lg:h-24 w-auto"
                      style={{ transform: 'none' }}
                    />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}