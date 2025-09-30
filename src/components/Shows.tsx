import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Ticket } from "lucide-react";

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
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-red-800 uppercase font-bold">Shows</h2>
          </div>

          <div className="space-y-4 mb-16 max-w-6xl mx-auto">
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
          </div>

          <div className="bg-gradient-to-r from-red-600 to-green-600 rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl mb-4">Don't Miss Out!</h3>
            <p className="text-lg">
              Limited seating available for these intimate performances. Book early to secure your spot.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}