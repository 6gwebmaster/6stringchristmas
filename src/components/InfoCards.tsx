import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";
import laughingIcon from "figma:asset/4c0c36a5a9be457f3eb590370077d736fa053215.png";

export function InfoCards() {
  const cards = [
    {
      title: "Classic Carols",
      description: "Traditional Christmas carols beautifully arranged for guitar",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      ),
      bgColor: "bg-red-500",
      textColor: "text-red-800"
    },
    {
      title: "Clean Comedy",
      description: "Lot's of laughs through improv for all Christmas lovers",
      icon: (
        <img src={laughingIcon} alt="Laughing face" className="w-6 h-6" />
      ),
      bgColor: "bg-green-500",
      textColor: "text-green-800"
    },
    {
      title: "Holiday Magic",
      description: "Memorable moments that celebrate Christmas traditions",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ),
      bgColor: "bg-red-500",
      textColor: "text-red-800"
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
                    {card.icon}
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