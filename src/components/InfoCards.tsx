import React from "react";
import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";

export function InfoCards() {
  const cards = [
    {
      title: "Classic Carols",
      description: "Traditional Christmas carols beautifully arranged for guitar",
      icon: "🎵",
      bgColor: "bg-green-500",
      textColor: "text-green-800"
    },
    {
      title: "Clean Comedy",
      description: "Lot's of laughs through improv for all Christmas lovers",
      icon: "😄",
      bgColor: "bg-red-500",
      textColor: "text-red-800"
    },
    {
      title: "Holiday Magic",
      description: "Memorable moments that celebrate Christmas traditions",
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
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 h-60">
                <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                  <div className={`w-16 h-16 ${card.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <span className="text-3xl">{card.icon}</span>
                  </div>
                  <h4 className={`text-3xl md:text-xl mb-4 ${card.textColor}`}>{card.title}</h4>
                  <p className="hidden md:block text-gray-600 leading-relaxed flex-1 flex items-center">
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