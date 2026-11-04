import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { Snow } from "./Snow";
import { TrailerModal } from "./TrailerModal";

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const videoSrc = isMobile
    ? "/videos/Hero%20Loop%20720x1040.mp4"
    : "/videos/Hero%20Loop%201920x720.mp4";

  return (
    <section
      id="home"
      className="relative min-h-screen h-[100vh] flex items-center justify-center overflow-hidden"
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

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 pt-24">
        <motion.img
          src="/images/hero/6SC%20Logo%20SIMPLE.png"
          alt="a 6 String Christmas"
          className="h-auto drop-shadow-2xl"
          style={{ width: "min(100vw, 787px)", maxWidth: "787px", marginTop: "130px" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "5%",
          transform: "translateX(-50%)",
          zIndex: 30,
        }}
      >
        <button
          type="button"
          onClick={() => setShowTrailer(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(0.45rem, 1.8vw, 1.125rem)",
            width: "auto",
            maxWidth: "min(92vw, 28rem)",
            padding: "clamp(0.65rem, 2vw, 1.35rem) clamp(1rem, 3.8vw, 2.4rem)",
            borderRadius: "clamp(0.45rem, 1.2vw, 0.75rem)",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#b91c1c",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "clamp(0.95rem, 3.6vw, 2.025rem)",
            letterSpacing: "0.02em",
            lineHeight: 1.15,
            whiteSpace: "nowrap",
            boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#991b1b";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#b91c1c";
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "clamp(1.6rem, 5vw, 3rem)",
              height: "clamp(1.6rem, 5vw, 3rem)",
              flexShrink: 0,
              borderRadius: "9999px",
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            <Play
              className="fill-current"
              style={{
                width: "clamp(0.85rem, 2.6vw, 1.5rem)",
                height: "clamp(0.85rem, 2.6vw, 1.5rem)",
              }}
            />
          </span>
          Watch Trailer
        </button>
      </div>

      <TrailerModal open={showTrailer} onClose={() => setShowTrailer(false)} />
    </section>
  );
}
