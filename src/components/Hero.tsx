import { motion } from "motion/react";
import { useEffect, useState, type CSSProperties } from "react";
import { CalendarDays, Play } from "lucide-react";
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

  // Mobile hero tall enough that object-cover crops less of the portrait video (keeps head in frame).
  const heroHeight = isDesktop
    ? "calc(100vh - 190px)"
    : isLandscape
      ? "calc(100svh - 280px)"
      : "calc(100svh - 280px)";

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
    gap: isDesktop ? "0.85rem" : "0.75rem",
    padding: isDesktop ? "0.85rem 1.85rem" : "1rem 1.35rem",
    borderRadius: isDesktop ? "0.65rem" : "0.65rem",
    fontSize: isDesktop ? "1.65rem" : "1.5rem",
  };

  const iconWrap: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    borderRadius: "9999px",
    backgroundColor: "rgba(255,255,255,0.2)",
    width: isDesktop ? "2.35rem" : "2rem",
    height: isDesktop ? "2.35rem" : "2rem",
  };

  const iconSize = isDesktop ? "1.25rem" : "1.1rem";

  const ctaButtons = (
    <div
      style={{
        display: "flex",
        flexDirection: isDesktop ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isDesktop ? "1rem" : "0.75rem",
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
  );

  return (
    <>
      <section
        id="home"
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: heroHeight, minHeight: heroHeight }}
      >
        <div className="absolute inset-0 z-0">
          <video
            key={videoSrc}
            className="h-full w-full object-cover"
            style={{
              // Prefer the upper frame on mobile so object-cover keeps the head
              objectPosition: isDesktop ? "center center" : "center 0%",
            }}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div
          className="relative z-10 flex h-full w-full flex-col items-center px-4"
          style={{
            justifyContent: isDesktop ? "flex-end" : "center",
            paddingTop: isDesktop ? "1rem" : "0.75rem",
            paddingBottom: isDesktop ? "2.25rem" : "0.75rem",
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
              marginTop: isDesktop ? "auto" : 0,
              marginBottom: isDesktop ? "1.5rem" : 0,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          />

          {isDesktop ? ctaButtons : null}
        </div>

        <TrailerModal open={showTrailer} onClose={() => setShowTrailer(false)} />
      </section>

      {!isDesktop && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: isLandscape ? "0.75rem 1rem 0.5rem" : "1rem 1rem 0.75rem",
            background:
              "linear-gradient(to bottom right, rgb(254 242 242), rgb(255 255 255), rgb(240 253 244))",
          }}
        >
          {ctaButtons}
        </div>
      )}
    </>
  );
}
