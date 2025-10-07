export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-red-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-2xl mb-4" style={{ fontFamily: '"Mogra", "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif' }}>6 String Christmas</h3>
              <p className="text-red-200 mb-4 max-w-md">
                Creating magical holiday memories through intimate acoustic guitar performances. 
                Experience Christmas classics like never before.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-red-200">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-red-200">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-red-200">About</button></li>
                <li><button onClick={() => scrollToSection('shows')} className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-red-200">Get Tickets</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-red-200">Contact</button></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-red-200">
                <li>Management@chasepadgett.com</li>
                <li>Available for bookings</li>
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