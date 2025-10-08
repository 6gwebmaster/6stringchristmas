import React from "react";
import { Button } from "./ui/button";
import { Ticket, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const NAV = [
  { id: "about",   label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
  { id: "shows",   label: "Shows" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false);
  const [showBottomMenu, setShowBottomMenu] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const onScroll = () => {
      const hero = document.getElementById("home");
      if (!hero) {
        setIsScrolled(window.scrollY > 20);
        return;
      }
      const halfway = hero.offsetHeight * 0.5;
      setIsScrolled(window.scrollY > halfway);
      
      // Show bottom menu when scrolling down, hide when scrolling up
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setShowBottomMenu(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setShowBottomMenu(false);
      }
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener("scroll", onScroll);
    onScroll(); // initialize once
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsTopMenuOpen(false);
    setIsBottomMenuOpen(false);
  };

  return (
    <>
      <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
              isScrolled
                  ? "bg-white/95 backdrop-blur-sm border-b border-red-100"
                  : "bg-transparent border-b border-transparent"
          }`}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
      >
        {/* Mobile Layout - max-width: 767px */}
        <div className="md:hidden w-full px-4 py-2 flex items-center justify-between">
          {/* Hamburger Button - Left */}
          <button
            onClick={() => setIsTopMenuOpen(!isTopMenuOpen)}
            className={`p-2 transition-colors ${
              isScrolled
                ? "text-gray-700 hover:text-red-700"
                : "text-white hover:text-red-300"
            }`}
          >
            {isTopMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Tickets Button - Center */}
          <Button
              onClick={() => scrollToSection("shows")}
              className={`flex items-center gap-2 px-6 py-3 text-base transition-all duration-500 ${
                  isScrolled
                      ? "bg-red-700 hover:bg-red-800 text-white"
                      : "bg-white hover:bg-red-50 text-red-700 border-2 border-white hover:border-red-700"
              }`}
          >
            <Ticket className="w-5 h-5" />
            Tickets
          </Button>

          {/* Spacer - Right */}
          <div className="w-10"></div>
        </div>

        {/* Desktop Layout - min-width: 768px */}
        <div className="hidden md:flex container mx-auto px-4 py-2 items-center justify-between">
          {/* Left spacer */}
          <div className="flex-1" />

          {/* Center: Tickets button */}
          <Button
              onClick={() => scrollToSection("shows")}
              className={`flex items-center gap-3 px-10 py-5 text-xl transition-all duration-500 ${
                  isScrolled
                      ? "bg-red-700 hover:bg-red-800 text-white"
                      : "bg-white hover:bg-red-50 text-red-700 border-2 border-white hover:border-red-700"
              }`}
          >
            <Ticket className="w-7 h-7" />
            Tickets
          </Button>

          {/* Right: navigation links */}
          <nav className="flex flex-1 items-center justify-end space-x-6">
            {NAV.map((item) => (
                <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`whitespace-nowrap transition-all duration-500 text-xl ${
                        isScrolled
                            ? "text-gray-700 hover:text-red-700"
                            : "text-white hover:text-red-300"
                    }`}
                >
                  {item.label}
                </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Top Menu Popup - Slides down from top */}
      <AnimatePresence>
        {isTopMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-2xl"
            style={{ zIndex: 100 }}
          >
            <nav className="flex flex-col">
              {/* Close Button */}
              <button
                onClick={() => setIsTopMenuOpen(false)}
                className="px-6 py-4 text-left text-red-700 hover:bg-red-50 transition-colors border-b border-gray-100 flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Close Menu
              </button>
              
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-6 py-4 text-left text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bottom Bar with Tickets Button - HIDDEN */}
      {/* <AnimatePresence>
        {showBottomMenu && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-[100] p-3"
          >
            <div className="flex justify-center">
              <Button
                onClick={() => scrollToSection("shows")}
                className="bg-red-700 hover:bg-red-800 text-white flex items-center gap-2 px-6 py-3 text-base transition-all duration-200"
              >
                <Ticket className="w-5 h-5" />
                Tickets
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  );
}
