import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Ticket } from "lucide-react";
import { motion } from "motion/react";

export function Shows() {
  const shows = [
    {
      date: "Dec 15",
      day: "Mon",
      city: "ORLANDO, FL",
      performances: [
        { time: "7:30 PM" }
      ]
    },
    {
      date: "Dec 18", 
      day: "Thu",
      city: "TAMPA, FL",
      performances: [
        { time: "3:00 PM" },
        { time: "8:00 PM" }
      ]
    },
    {
      date: "Dec 21",
      day: "Sun",
      city: "JACKSONVILLE, FL", 
      performances: [
        { time: "7:00 PM" }
      ]
    },
    {
      date: "Dec 23",
      day: "Tue",
      city: "MIAMI, FL",
      performances: [
        { time: "6:30 PM" }
      ]
    }
  ];

  return (
    <section id="shows" className="py-20 bg-white">
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
              Shows
            </motion.h2>
            <motion.p 
              className="text-2xl text-gray-700 max-w-5xl mx-auto" 
              style={{ fontFamily: '"Zain", "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Book your tickets today!
            </motion.p>
          </motion.div>

          <motion.div 
            className="space-y-4 mb-16 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {shows.map((show, index) => (
              <div key={index}>
                {show.performances.map((performance, perfIndex) => (
                  <Card key={`${index}-${perfIndex}`} className="border-2 border-red-100 hover:border-red-300 transition-colors shadow-lg mb-4">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                          <div className="text-2xl text-gray-800 min-w-[80px]">{show.date}</div>
                          <div className="text-lg text-gray-800 min-w-[50px]">{show.day}</div>
                          <div className="text-lg text-red-600 uppercase min-w-[160px]">{show.city}</div>
                          <div className="text-lg text-gray-800">{performance.time}</div>
                        </div>
                        <Button className="bg-red-700 hover:bg-red-800 text-white px-6 flex items-center gap-2">
                          <Ticket className="w-4 h-4" />
                          Get Tickets
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </motion.div>

          <motion.div 
            className="bg-gradient-to-r from-red-600 to-green-600 rounded-lg p-8 text-white text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-2xl mb-4">Don't Miss Out!</h3>
            <p className="text-lg">
              Limited seating available for these intimate performances. Book early to secure your spot.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}