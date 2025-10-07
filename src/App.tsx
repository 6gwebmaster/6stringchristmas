import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { InfoCards } from "./components/InfoCards";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import { Reviews } from "./components/Reviews";
import { Shows } from "./components/Shows";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <InfoCards />
      <About />
      <Gallery />
      <Reviews />
      <Shows />
      <Contact />
      <Footer />
    </div>
  );
}