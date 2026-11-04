import { Button } from "./ui/button";
import { Ticket, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "shows", label: "Shows" },
  { id: "reviews", label: "Reviews" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("home");
      if (!hero) {
        setIsScrolled(window.scrollY > 20);
        return;
      }
      const halfway = hero.offsetHeight * 0.5;
      setIsScrolled(window.scrollY > halfway);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-red-100"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="md:hidden w-full px-4 py-2 flex items-center justify-between">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className={`p-2 transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-red-700"
                  : "text-white hover:text-red-300"
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[85%] max-w-sm bg-white/98 backdrop-blur-md border-r border-red-100 p-0"
          >
            <SheetHeader className="px-6 pt-8 pb-4 border-b border-red-100">
              <SheetTitle className="text-left text-2xl text-red-800 font-bold tracking-wide">
                Menu
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col px-4 py-6 gap-1">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-2xl font-semibold text-gray-800 hover:text-red-700 hover:bg-red-50 rounded-lg px-4 py-5 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("shows")}
                className="mt-4 bg-red-700 hover:bg-red-800 text-white flex items-center justify-center gap-3 px-6 py-6 text-xl"
              >
                <Ticket className="w-6 h-6" />
                Tickets
              </Button>
            </nav>
          </SheetContent>
        </Sheet>

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

        <div className="w-10" />
      </div>

      <div className="hidden md:flex container mx-auto px-4 py-2 items-center justify-between">
        <div className="flex-1" />

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

        <nav className="flex flex-1 items-center justify-end space-x-6">
          {NAV.filter((item) => item.id !== "home").map((item) => (
            <button
              key={item.id}
              type="button"
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
  );
}
