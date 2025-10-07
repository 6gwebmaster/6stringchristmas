import { motion } from "motion/react";
import review1 from "../assets/Review1.png";
import review2 from "../assets/Review2.png";
import review3 from "../assets/Review3.png";
import review4 from "../assets/Review4.png";
import review5 from "../assets/Review5.png";
import review6 from "../assets/Review6.png";
import review7 from "../assets/Review7.png";
import review8 from "../assets/Review8.png";
import review9 from "../assets/Review9.png";
import review10 from "../assets/Review10.png";
import review11 from "../assets/Review11.png";
import review12 from "../assets/Review12.png";

export function Reviews() {
  const reviews = [
    { id: 1, src: review1, alt: "Audience review 1" },
    { id: 2, src: review2, alt: "Audience review 2" },
    { id: 3, src: review3, alt: "Audience review 3" },
    { id: 4, src: review4, alt: "Audience review 4" },
    { id: 5, src: review5, alt: "Audience review 5" },
    { id: 6, src: review6, alt: "Audience review 6" },
    { id: 7, src: review7, alt: "Audience review 7" },
    { id: 8, src: review8, alt: "Audience review 8" },
    { id: 9, src: review9, alt: "Audience review 9" },
    { id: 10, src: review10, alt: "Audience review 10" },
    { id: 11, src: review11, alt: "Audience review 11" },
    { id: 12, src: review12, alt: "Audience review 12" }
  ];

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-red-50 via-white to-green-50">
      <div className="container mx-auto px-4">
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
              Reviews
            </motion.h2>
          </motion.div>

          {/* Reviews Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <img
                  src={review.src}
                  alt={review.alt}
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
