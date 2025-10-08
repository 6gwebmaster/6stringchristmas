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

  const formatTime = (timeString: string) => {
    console.log('🕐 Formatting time from:', timeString);
    
    // If it's already formatted nicely, just return it
    if (timeString && typeof timeString === 'string') {
      return timeString.trim();
    }
    
    console.log('❌ Could not format time from:', timeString);
    return '';
  };

  const getTicketButtonStyle = (status: string) => {
    const normalizedStatus = status.toLowerCase().replace(/[!]/g, '').trim();
    switch (normalizedStatus) {
      case 'coming soon':
        return 'bg-yellow-500 text-white cursor-not-allowed opacity-75';
      case 'limited avail':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'going fast':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'sold out':
        return 'bg-purple-600 text-white cursor-not-allowed opacity-75';
      default:
        return 'bg-red-600 hover:bg-red-700 text-white';
    }
  };

  const getTicketButtonText = (status: string) => {
    const normalizedStatus = status.toLowerCase().replace(/[!]/g, '').trim();
    switch (normalizedStatus) {
      case 'coming soon':
        return 'Coming Soon';
      case 'limited avail':
        return 'Get Tickets - Limited Availability';
      case 'going fast':
        return 'Buy Now - Going Fast!';
      case 'sold out':
        return 'Sold Out!';
      default:
        return 'Get Tickets';
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
            className="space-y-4 mb-16 max-w-5xl mx-auto px-2 md:px-0"
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
                {shows.map((groupedShow, index) => {
                  const hasMultipleShows = groupedShow.shows.length > 1;
                  console.log('🎭 Processing grouped show:', groupedShow, 'hasMultipleShows:', hasMultipleShows);
                  
                  return (
                    <Card key={index} className="border-2 border-red-100 hover:border-red-300 transition-colors shadow-lg mb-4">
                      <CardContent className="p-6 sm:p-8">
                        {hasMultipleShows ? (
                          <>
                            {/* Desktop layout for multiple shows */}
                            <div className="hidden md:block space-y-4">
                              {/* Header row with date, day, location, venue */}
                              <div className="flex items-center gap-8 pb-2 border-b border-gray-200">
                                <div className="text-xl text-gray-800 font-medium w-16">
                                  {formatDate(groupedShow.date)}
                                </div>
                                <div className="text-lg text-gray-600 w-12">
                                  {groupedShow.day}
                                </div>
                                <div className="text-lg text-red-600 uppercase font-bold w-32">
                                  {groupedShow.location}
                                </div>
                                <div className="text-lg text-gray-800 w-48">
                                  {groupedShow.venue}
                                </div>
                              </div>
                              
                              {/* Show times with ticket buttons */}
                              <div className="space-y-2">
                                {groupedShow.shows.map((show, showIndex) => {
                                  console.log('🎭 Show data:', show);
                                  console.log('🎨 Button style:', getTicketButtonStyle(show.ticketAvail));
                                  console.log('🎫 Button text:', getTicketButtonText(show.ticketAvail));
                                  console.log('🔍 Raw ticketAvail value:', `"${show.ticketAvail}"`);
                                  console.log('🔍 Lowercase ticketAvail:', `"${show.ticketAvail.toLowerCase()}"`);
                                  return (
                                    <div key={showIndex} className="flex items-center justify-between">
                                      <div className="flex items-center gap-8">
                                        <div className="w-16"></div>
                                        <div className="w-12"></div>
                                        <div className="w-32"></div>
                                        <div className="w-48"></div>
                                        <div className="text-lg text-gray-800 font-medium w-20 text-right">
                                          {formatTime(show.time)}
                                        </div>
                                      </div>
                                      <Button 
                                        className={`px-6 flex items-center gap-2 ${getTicketButtonStyle(show.ticketAvail)}`}
                                        style={{
                                          backgroundColor: (() => {
                                            const normalized = show.ticketAvail.toLowerCase().replace(/[!]/g, '').trim();
                                            switch (normalized) {
                                              case 'coming soon': return '#eab308';
                                              case 'limited avail': return '#2563eb';
                                              case 'going fast': return '#16a34a';
                                              case 'sold out': return '#9333ea';
                                              default: return '#dc2626';
                                            }
                                          })(),
                                          color: 'white'
                                        }}
                                        onClick={() => {
                                          const normalized = show.ticketAvail.toLowerCase().replace(/[!]/g, '').trim();
                                          if (normalized !== 'coming soon' && normalized !== 'sold out') {
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
                            
                            {/* Mobile layout for multiple shows */}
                            <div className="md:hidden space-y-4">
                              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200">
                                <div className="col-span-2 text-xl text-gray-800 font-medium text-center">
                                  {formatDate(groupedShow.date)}
                                </div>
                                <div className="col-span-2 text-lg text-gray-600 text-center">
                                  {groupedShow.day}
                                </div>
                                <div className="col-span-2 text-lg text-red-600 uppercase font-bold text-center">
                                  {groupedShow.location}
                                </div>
                                <div className="col-span-2 text-lg text-gray-800 text-center">
                                  {groupedShow.venue}
                                </div>
                              </div>
                              
                              {/* Show times with ticket buttons */}
                              <div className="space-y-3">
                                {groupedShow.shows.map((show, showIndex) => (
                                  <div key={showIndex} className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 text-lg text-gray-800 font-medium text-center">
                                      {formatTime(show.time)}
                                    </div>
                                    <div className="col-span-2">
                                      <Button 
                                        className={`w-full px-4 flex items-center justify-center gap-2 text-sm ${getTicketButtonStyle(show.ticketAvail)}`}
                                        style={{
                                          backgroundColor: (() => {
                                            const normalized = show.ticketAvail.toLowerCase().replace(/[!]/g, '').trim();
                                            switch (normalized) {
                                              case 'coming soon': return '#eab308';
                                              case 'limited avail': return '#2563eb';
                                              case 'going fast': return '#16a34a';
                                              case 'sold out': return '#9333ea';
                                              default: return '#dc2626';
                                            }
                                          })(),
                                          color: 'white'
                                        }}
                                        onClick={() => {
                                          const normalized = show.ticketAvail.toLowerCase().replace(/[!]/g, '').trim();
                                          if (normalized !== 'coming soon' && normalized !== 'sold out') {
                                            console.log('🎫 Button clicked!', show.ticketLink);
                                            window.open(show.ticketLink, '_blank');
                                          }
                                        }}
                                        >
                                          <Ticket className="w-4 h-4" />
                                          {getTicketButtonText(show.ticketAvail)}
                                        </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Desktop layout for single show */}
                            <div className="hidden md:flex items-center justify-between">
                              <div className="flex items-center gap-8">
                                <div className="text-xl text-gray-800 font-medium w-16">
                                  {formatDate(groupedShow.date)}
                                </div>
                                <div className="text-lg text-gray-600 w-12">
                                  {groupedShow.day}
                                </div>
                                <div className="text-lg text-red-600 uppercase font-bold w-32">
                                  {groupedShow.location}
                                </div>
                                <div className="text-lg text-gray-800 w-48">
                                  {groupedShow.venue}
                                </div>
                                <div className="text-lg text-gray-800 font-medium w-20 text-right">
                                  {formatTime(groupedShow.shows[0].time)}
                                </div>
                              </div>
                              <Button 
                                className={`px-6 flex items-center gap-2 ${getTicketButtonStyle(groupedShow.shows[0].ticketAvail)}`}
                                style={{
                                  backgroundColor: (() => {
                                    const normalized = groupedShow.shows[0].ticketAvail.toLowerCase().replace(/[!]/g, '').trim();
                                    switch (normalized) {
                                      case 'coming soon': return '#eab308';
                                      case 'limited avail': return '#2563eb';
                                      case 'going fast': return '#16a34a';
                                      case 'sold out': return '#9333ea';
                                      default: return '#dc2626';
                                    }
                                  })(),
                                  color: 'white'
                                }}
                                onClick={() => {
                                  const normalized = groupedShow.shows[0].ticketAvail.toLowerCase().replace(/[!]/g, '').trim();
                                  if (normalized !== 'coming soon' && normalized !== 'sold out') {
                                    console.log('🎫 Button clicked!', groupedShow.shows[0].ticketLink);
                                    window.open(groupedShow.shows[0].ticketLink, '_blank');
                                  }
                                }}
                              >
                                <Ticket className="w-4 h-4" />
                                {getTicketButtonText(groupedShow.shows[0].ticketAvail)}
                              </Button>
                            </div>
                            
                            {/* Mobile layout for single show */}
                            <div className="md:hidden grid grid-cols-2 gap-4">
                              <div className="col-span-2 text-xl text-gray-800 font-medium text-center">
                                {formatDate(groupedShow.date)}
                              </div>
                              <div className="col-span-2 text-lg text-gray-600 text-center">
                                {groupedShow.day}
                              </div>
                              <div className="col-span-2 text-lg text-red-600 uppercase font-bold text-center">
                                {groupedShow.location}
                              </div>
                              <div className="col-span-2 text-lg text-gray-800 text-center">
                                {groupedShow.venue}
                              </div>
                              <div className="col-span-2 text-lg text-gray-800 font-medium text-center">
                                {formatTime(groupedShow.shows[0].time)}
                              </div>
                              <div className="col-span-2">
                                <Button 
                                  className={`w-full px-4 flex items-center justify-center gap-2 text-sm ${getTicketButtonStyle(groupedShow.shows[0].ticketAvail)}`}
                                  style={{
                                    backgroundColor: (() => {
                                      const normalized = groupedShow.shows[0].ticketAvail.toLowerCase().replace(/[!]/g, '').trim();
                                      switch (normalized) {
                                        case 'coming soon': return '#eab308';
                                        case 'limited avail': return '#2563eb';
                                        case 'going fast': return '#16a34a';
                                        case 'sold out': return '#9333ea';
                                        default: return '#dc2626';
                                      }
                                    })(),
                                    color: 'white'
                                  }}
                                  onClick={() => {
                                    const normalized = groupedShow.shows[0].ticketAvail.toLowerCase().replace(/[!]/g, '').trim();
                                    if (normalized !== 'coming soon' && normalized !== 'sold out') {
                                      console.log('🎫 Button clicked!', groupedShow.shows[0].ticketLink);
                                      window.open(groupedShow.shows[0].ticketLink, '_blank');
                                    }
                                  }}
                                >
                                  <Ticket className="w-4 h-4" />
                                  {getTicketButtonText(groupedShow.shows[0].ticketAvail)}
                                </Button>
                              </div>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
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