import { Snow } from "./Snow";

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-red-900 text-white py-12 z-[1]">
      <Snow />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="footer-grid gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: '"Mogra", "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif' }}>6 String Christmas</h3>
              <p className="text-red-200 mb-4 max-w-md">
                Creating magical holiday memories through intimate acoustic guitar performances. 
                Experience Christmas classics like never before.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/chasethatpadgett" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-red-200 hover:text-yellow-400 hover:scale-125 transition-all duration-200 cursor-pointer"
                  aria-label="Visit our Facebook page"
                  style={{ cursor: 'pointer', pointerEvents: 'auto', display: 'inline-block' }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/chasethatpadgett/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-red-200 hover:text-yellow-400 hover:scale-125 transition-all duration-200 cursor-pointer"
                  aria-label="Visit our Instagram page"
                  style={{ cursor: 'pointer', pointerEvents: 'auto', display: 'inline-block' }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#home" 
                    onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                    className="text-red-200 hover:text-yellow-400 hover:scale-110 hover:font-bold transition-all duration-200 cursor-pointer"
                    style={{ cursor: 'pointer', pointerEvents: 'auto', display: 'inline-block' }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                    className="text-red-200 hover:text-yellow-400 hover:scale-110 hover:font-bold transition-all duration-200 cursor-pointer"
                    style={{ cursor: 'pointer', pointerEvents: 'auto', display: 'inline-block' }}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#shows" 
                    onClick={(e) => { e.preventDefault(); scrollToSection('shows'); }}
                    className="text-red-200 hover:text-yellow-400 hover:scale-110 hover:font-bold transition-all duration-200 cursor-pointer"
                    style={{ cursor: 'pointer', pointerEvents: 'auto', display: 'inline-block' }}
                  >
                    Get Tickets
                  </a>
                </li>
                <li>
                  <a 
                    href="#reviews" 
                    onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}
                    className="text-red-200 hover:text-yellow-400 hover:scale-110 hover:font-bold transition-all duration-200 cursor-pointer"
                    style={{ cursor: 'pointer', pointerEvents: 'auto', display: 'inline-block' }}
                  >
                    Reviews
                  </a>
                </li>
                <li>
                  <a 
                    href="#gallery" 
                    onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}
                    className="text-red-200 hover:text-yellow-400 hover:scale-110 hover:font-bold transition-all duration-200 cursor-pointer"
                    style={{ cursor: 'pointer', pointerEvents: 'auto', display: 'inline-block' }}
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                    className="text-red-200 hover:text-yellow-400 hover:scale-110 hover:font-bold transition-all duration-200 cursor-pointer"
                    style={{ cursor: 'pointer', pointerEvents: 'auto', display: 'inline-block' }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="mailto:Management@chasepadgett.com" 
                    className="text-red-200 hover:text-yellow-400 hover:scale-105 hover:font-bold transition-all duration-200 cursor-pointer"
                    style={{ cursor: 'pointer', pointerEvents: 'auto', display: 'inline-block' }}
                  >
                    Management@chasepadgett.com
                  </a>
                </li>
                <li className="text-red-200">Available for bookings</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-red-800 mt-8 pt-8 text-center">
            <p className="text-red-200">
              © 2024 6 String Christmas. All rights reserved. | 
              <span className="ml-2">Spreading holiday joy one song at a time.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}