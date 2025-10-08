import { Button } from "./ui/button";
import { Ticket, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        const halfwayPoint = heroHeight * 0.5;
        setIsScrolled(scrollPosition > halfwayPoint);
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isMobile = windowWidth > 0 && windowWidth < 768;

  // Mobile View
  if (isMobile) {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-red-100">
          <div className="container mx-auto px-4 h-16 flex items-center justify-center relative">
            {/* Centered Tickets Button */}
            <Button 
              onClick={() => scrollToSection('shows')}
              className="bg-red-700 hover:bg-red-800 text-white flex items-center gap-2 px-6 py-3"
            >
              <Ticket className="w-5 h-5" />
              Tickets
            </Button>

            {/* Hamburger Menu on Right */}
            <button 
              className="absolute right-4 w-12 h-12 flex items-center justify-center text-red-700"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="w-8 h-8" strokeWidth={2.5} />
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="fixed top-16 left-0 right-0 z-40 bg-white/98 backdrop-blur-sm border-b border-red-100"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-700 hover:text-red-700 text-left py-2 text-lg"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-700 hover:text-red-700 text-left py-2 text-lg"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-700 hover:text-red-700 text-left py-2 text-lg"
                >
                  Contact
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop View
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm border-b border-red-100' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left spacer */}
        <div className="flex-1"></div>

        {/* Centered Tickets Button */}
        <div className="flex justify-center">
          <Button 
            onClick={() => scrollToSection('shows')}
            className={`flex items-center gap-3 px-10 py-5 text-xl transition-all duration-500 ${
              isScrolled 
                ? 'bg-red-700 hover:bg-red-800 text-white' 
                : 'bg-white hover:bg-red-50 text-red-700 border-2 border-white hover:border-red-700'
            }`}
          >
            <Ticket className="w-7 h-7" />
            Tickets
          </Button>
        </div>

        {/* Right navigation links */}
        <div className="flex flex-1 items-center justify-end space-x-6">
          <button 
            onClick={() => scrollToSection('home')}
            className={`transition-all duration-500 text-xl ${
              isScrolled 
                ? 'text-gray-700 hover:text-red-700' 
                : 'text-white hover:text-red-300'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className={`transition-all duration-500 text-xl ${
              isScrolled 
                ? 'text-gray-700 hover:text-red-700' 
                : 'text-white hover:text-red-300'
            }`}
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className={`transition-all duration-500 text-xl ${
              isScrolled 
                ? 'text-gray-700 hover:text-red-700' 
                : 'text-white hover:text-red-300'
            }`}
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}
