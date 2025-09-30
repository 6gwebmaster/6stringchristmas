import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import orlandoWeeklyLogo from "figma:asset/23d7f94d2a94d466921a75d5933c8162fe60b943.png";
import { useEffect } from "react";

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
    <section id="about" className="pt-20 pb-20 bg-gradient-to-br from-red-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-red-800 uppercase font-bold">About</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A Fun & Funny Musical Romp for the Holiday Season
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Chase Padgett brings his prodigious talents as a singer, guitarist, comedian, and 
                storyteller to this unforgettable evening of Christmas spirit. This show is stuffed like a stocking 
                with timeless Christmas music as well as tons of jokes and stories about how Christmas changed 
                Chase's life forever. His blazing guitar work, lighting fast wit, and surprisingly soulful singing 
                voice will remind any audience why Christmas is such a special time of year. Perfect for all ages!
              </p>
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-xl">
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
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="text-center mt-16">
            <blockquote className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-800 mb-8 leading-tight">
              "Padgett's holiday spirit<br />
              shines bright"
            </blockquote>
            <div className="flex justify-center">
              <img 
                src={orlandoWeeklyLogo}
                alt="Orlando Weekly"
                className="h-16 md:h-20 lg:h-24 w-auto"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}