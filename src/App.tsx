import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Shows } from "./components/Shows";
import { Reviews } from "./components/Reviews";
import { Gallery } from "./components/Gallery";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Shows />
      <Reviews />
      <Gallery />
      <Contact />
      <Footer />
      <Analytics />
    </div>
  );
}
