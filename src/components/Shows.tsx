import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Ticket } from "lucide-react";
import { motion } from "motion/react";
import { fetchShows, GroupedShow } from "../services/airtable";

export function Shows() {
  const [shows, setShows] = useState<GroupedShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadShows = async () => {
      try {
        setLoading(true);
        console.log('🎭 Loading shows...');
        const data = await fetchShows();
        console.log('🎪 Shows loaded:', data);
        setShows(data);
      } catch (err) {
        setError('Failed to load shows');
        console.error('❌ Error loading shows:', err);
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatDay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatTime = (dateTimeString: string) => {
    // Extract time from "12/7/2025 7:00pm" format
    const timeMatch = dateTimeString.match(/(\d+):(\d+)(am|pm)/i);
    if (timeMatch) {
      const [, hour, minute, period] = timeMatch;
      return `${hour}:${minute} ${period.toUpperCase()}`;
    }
    return '';
  };

  const getTicketButtonStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'coming soon':
        return 'bg-red-600 text-white cursor-not-allowed opacity-75';
      case 'limited':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'selling fast':
        return 'bg-red-600 hover:bg-red-700 text-white';
      default:
        return 'bg-red-600 hover:bg-red-700 text-white';
    }
  };

  const getTicketButtonText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'coming soon':
        return 'Coming Soon';
      case 'limited':
        return 'Limited Tickets';
      case 'selling fast':
        return 'Selling Fast';
      default:
        return 'Get Your Tickets';
    }
  };

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
            {loading ? (
              <div className="text-center py-8">
                <div className="text-lg text-gray-600">Loading shows...</div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="text-lg text-red-600">{error}</div>
              </div>
            ) : shows.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-lg text-gray-600">No shows scheduled at this time.</div>
              </div>
            ) : (
              <>
                {console.log('🎬 Rendering shows:', shows)}
                {console.log('🎬 Shows length:', shows.length)}
                {shows.map((groupedShow, index) => (
                <Card key={index} className="border-2 border-red-100 hover:border-red-300 transition-colors shadow-lg mb-4">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header with date, venue, location */}
                      <div className="flex items-center space-x-8">
                        <div className="text-2xl text-gray-800 min-w-[80px]">
                          {formatDate(groupedShow.date)}
                        </div>
                        <div className="text-lg text-gray-800 min-w-[50px]">
                          {formatDay(groupedShow.date)}
                        </div>
                        <div className="text-lg text-red-600 uppercase min-w-[160px]">
                          {groupedShow.location}
                        </div>
                        <div className="text-lg text-gray-800 font-medium">
                          {groupedShow.venue}
                        </div>
                      </div>
                      
                      {/* Show times with individual ticket buttons */}
                      <div className="space-y-2">
                        {groupedShow.shows.map((show, showIndex) => {
                          console.log('🎭 Show data:', show);
                          console.log('🎨 Button style:', getTicketButtonStyle(show.ticketAvail));
                          console.log('🎫 Button text:', getTicketButtonText(show.ticketAvail));
                          return (
                            <div key={showIndex} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                              <div className="text-lg text-gray-800 font-medium">
                                {formatTime(show.time)}
                              </div>
                              <Button 
                                className={`px-6 flex items-center gap-2 ${getTicketButtonStyle(show.ticketAvail)}`}
                                onClick={() => {
                                  if (show.ticketAvail.toLowerCase() !== 'coming soon') {
                                    console.log('🎫 Button clicked!', show.ticketLink);
                                    window.open(show.ticketLink, '_blank');
                                  }
                                }}
                              >
                                <Ticket className="w-4 h-4" />
                                {getTicketButtonText(show.ticketAvail)}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                ))}
              </>
            )}
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