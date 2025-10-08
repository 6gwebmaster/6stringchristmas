import { Button } from "./ui/button";
import { Ticket, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        const halfwayPoint = heroHeight * 0.5;
        setIsScrolled(scrollPosition > halfwayPoint);
      }
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    checkMobile(); // Check on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-red-100" style={{ minHeight: '60px' }}>
          <div className="w-full h-full flex items-center justify-center relative px-4 py-2">
            {/* Mobile: Centered Tickets Button */}
            <Button 
              onClick={() => scrollToSection('shows')}
              className="bg-red-700 hover:bg-red-800 text-white flex items-center gap-2 px-6 py-3 text-base"
            >
              <Ticket className="w-5 h-5" />
              Tickets
            </Button>

            {/* Mobile: Hamburger Menu on Right */}
            <button 
              className="absolute right-4 w-12 h-12 flex items-center justify-center text-red-700 hover:text-red-900"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="w-10 h-10" strokeWidth={3} />
              ) : (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="bg-white/98 backdrop-blur-sm border-b border-red-100 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.nav 
              className="container mx-auto px-4 py-6 flex flex-col space-y-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <motion.button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-red-700 transition-colors text-left py-2 text-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                whileHover={{ x: 5 }}
              >
                Home
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-red-700 transition-colors text-left py-2 text-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ x: 5 }}
              >
                About
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-red-700 transition-colors text-left py-2 text-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                whileHover={{ x: 5 }}
              >
                Contact
              </motion.button>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="pt-2"
              >
                <Button className="bg-red-700 hover:bg-red-800 text-white flex items-center gap-3 px-10 py-5 text-xl w-full justify-center">
                  <Ticket className="w-7 h-7" />
                  Tickets
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
      </>
    );
  }

  // Desktop Header
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm border-b border-red-100' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Desktop: Left spacer */}
        <div className="flex-1"></div>

        {/* Desktop: Centered Tickets Button */}
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

        {/* Desktop: Right side navigation links */}
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