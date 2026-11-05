import { motion } from "motion/react";
import { useEffect, useState, type CSSProperties } from "react";
import { CalendarDays, Play } from "lucide-react";
import { Snow } from "./Snow";
import { TrailerModal } from "./TrailerModal";

type Viewport = "desktop" | "portrait" | "landscape";

function getViewport(): Viewport {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (width >= 1024 && height >= 640) return "desktop";
  if (height < 520 || width > height) return "landscape";
  return "portrait";
}

export function Hero() {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const update = () => setViewport(getViewport());
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  const isDesktop = viewport === "desktop";
  const isLandscape = viewport === "landscape";
  const videoSrc = isLandscape || isDesktop
    ? "/videos/Hero%20Loop%201920x720.mp4"
    : "/videos/Hero%20Loop%20720x1040.mp4";

  // Leave the About heading in the first screen so it is visible on load.
  const heroHeight = isDesktop
    ? "calc(100vh - 190px)"
    : isLandscape
      ? "calc(100svh - 120px)"
      : "calc(100svh - 160px)";

  const scrollToShows = () => {
    document.getElementById("shows")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const buttonBase: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    color: "#ffffff",
    fontWeight: 700,
    letterSpacing: "0.02em",
    lineHeight: 1.15,
    whiteSpace: "nowrap",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    width: isDesktop ? "auto" : "100%",
    maxWidth: isDesktop ? "none" : "22rem",
    gap: isLandscape ? "0.4rem" : isDesktop ? "0.85rem" : "0.65rem",
    padding: isDesktop
      ? "0.85rem 1.85rem"
      : isLandscape
        ? "0.45rem 0.9rem"
        : "0.75rem 1.15rem",
    borderRadius: isLandscape ? "0.45rem" : "0.65rem",
    fontSize: isDesktop ? "1.65rem" : isLandscape ? "0.95rem" : "1.12rem",
  };

  const iconWrap: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    borderRadius: "9999px",
    backgroundColor: "rgba(255,255,255,0.2)",
    width: isDesktop ? "2.35rem" : isLandscape ? "1.45rem" : "1.85rem",
    height: isDesktop ? "2.35rem" : isLandscape ? "1.45rem" : "1.85rem",
  };

  const iconSize = isDesktop ? "1.25rem" : isLandscape ? "0.8rem" : "1rem";

  return (
    <section
      id="home"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: heroHeight, minHeight: heroHeight }}
    >
      <div className="absolute inset-0 z-0">
        <video
          key={videoSrc}
          className="h-full w-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <Snow />

      <div
        className="relative z-10 flex h-full w-full flex-col items-center px-4"
        style={{
          justifyContent: "flex-end",
          paddingTop: isLandscape ? "3.2rem" : "4.5rem",
          paddingBottom: isDesktop ? "2.25rem" : isLandscape ? "0.65rem" : "1.25rem",
          boxSizing: "border-box",
        }}
      >
        <motion.img
          src="/images/hero/6SC%20Logo%20SIMPLE.png"
          alt="a 6 String Christmas"
          className="h-auto drop-shadow-2xl"
          style={{
            width: isDesktop
              ? "min(78vw, 760px)"
              : isLandscape
                ? "min(46vw, 280px)"
                : "min(88vw, 460px)",
            maxWidth: "100%",
            marginTop: "auto",
            marginBottom: isDesktop ? "1.5rem" : isLandscape ? "0.55rem" : "1rem",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: isDesktop ? "row" : "column",
            alignItems: "center",
            justifyContent: "center",
            gap: isDesktop ? "1rem" : isLandscape ? "0.4rem" : "0.65rem",
            width: isDesktop ? "auto" : "min(92vw, 22rem)",
          }}
        >
          <button
            type="button"
            onClick={scrollToShows}
            style={{ ...buttonBase, backgroundColor: "#16a34a" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#15803d";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#16a34a";
            }}
          >
            <span style={iconWrap}>
              <CalendarDays style={{ width: iconSize, height: iconSize }} />
            </span>
            Get Tour Dates
          </button>

          <button
            type="button"
            onClick={() => setShowTrailer(true)}
            style={{ ...buttonBase, backgroundColor: "#b91c1c" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#991b1b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#b91c1c";
            }}
          >
            <span style={iconWrap}>
              <Play className="fill-current" style={{ width: iconSize, height: iconSize }} />
            </span>
            Watch Trailer
          </button>
        </div>
      </div>

      <TrailerModal open={showTrailer} onClose={() => setShowTrailer(false)} />
    </section>
  );
}
