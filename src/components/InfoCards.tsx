import React from "react";
import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";

export function InfoCards() {
  const cards = [
    {
      title: "Classic Carols",
      description: "Heart-warming carols that bring the spirit of the season alive",
      icon: "🎵",
      bgColor: "bg-green-500",
      textColor: "text-green-800"
    },
    {
      title: "Clean Comedy",
      description: "Laughter-filled comedy perfect for audiences of every age",
      icon: "😄",
      bgColor: "bg-red-500",
      textColor: "text-red-800"
    },
    {
      title: "Holiday Magic",
      description: "Experience the joy and enchantment of the holiday season",
      icon: "🎄",
      bgColor: "bg-green-500",
      textColor: "text-green-800"
    }
  ];

  return (
    <section className="relative -mt-20 -mb-10 z-30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 h-80">
                <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                  <div className={`w-16 h-16 ${card.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <span style={{ fontSize: '36px', lineHeight: '36px' }}>{card.icon}</span>
                  </div>
                  <h4 
                    className={`text-3xl md:text-xl mb-4 ${card.textColor}`}
                    style={{
                      fontFamily: '"Chewy", "Georgia", cursive',
                      fontWeight: '700',
                      fontSize: '1.75rem',
                      fontStyle: 'normal',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {card.title}
                  </h4>
                  <p 
                    className="hidden md:block text-gray-600 leading-relaxed flex-1 flex items-center"
                    style={{
                      fontFamily: '"Zain", "Roboto", "Helvetica Neue", Arial, sans-serif',
                      fontSize: '1.25rem',
                      fontWeight: '400',
                      letterSpacing: '0.01em'
                    }}
                  >
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}