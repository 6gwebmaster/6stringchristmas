import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import orlandoWeeklyLogo from "figma:asset/23d7f94d2a94d466921a75d5933c8162fe60b943.png";
import { motion } from "motion/react";

const VIMEO_ID = "905410003";

export function About() {
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <section id="about" className="pt-20 pb-20 bg-gradient-to-br from-red-50 via-white to-green-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Animated Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2
              className="text-4xl md:text-5xl mb-8 text-red-800 uppercase font-bold"
              style={{
                fontFamily: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif',
                letterSpacing: "0.15em",
                textShadow: "2px 2px 0px rgba(255, 235, 59, 0.9), 3px 3px 0px rgba(255, 223, 0, 0.6)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              About
            </motion.h2>
            <motion.p
              className="text-2xl text-gray-700 max-w-3xl mx-auto font-medium mb-10"
              style={{ fontFamily: '"Mogra", "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.span
                className="inline-block"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
              >
                ⭐
              </motion.span>{" "}
              Christmas Comedy Meets Musical Magic{" "}
              <motion.span
                className="inline-block"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
              >
                ⭐
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Content Grid with Animations */}
          <div className="about-split gap-12 items-center mb-16">
            {/* Text Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative">
                <p
                  className="text-2xl text-gray-700 leading-relaxed relative z-10"
                  style={{ fontFamily: '"Zain", "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif' }}
                >
                  Chase Padgett brings his prodigious talents as a singer, guitarist, comedian, and
                  storyteller to this unforgettable evening of Christmas spirit. This show is stuffed like a stocking
                  with timeless Christmas music as well as tons of jokes and stories about how Christmas changed
                  Chase&apos;s life forever.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p
                  className="text-2xl text-gray-700 leading-relaxed"
                  style={{ fontFamily: '"Zain", "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif' }}
                >
                  His blazing guitar work, lighting fast wit, and surprisingly soulful singing
                  voice will remind any audience why Christmas is such a special time of year.{" "}
                  <span className="text-red-800 font-bold">✨ Perfect for all ages! ✨</span>
                </p>
              </motion.div>
            </motion.div>

            {/* Trailer GIF thumb — same slot as former embed; opens shadow box like 6G */}
            <motion.div
              className="relative rounded-lg overflow-hidden shadow-2xl group cursor-pointer"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              onClick={() => setShowTrailer(true)}
              role="button"
              tabIndex={0}
              aria-label="Watch the 6 String Christmas trailer"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setShowTrailer(true);
                }
              }}
            >
              <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                <img
                  src="/images/about/6SC%20Trailer%20Button.gif"
                  alt="Watch the 6 String Christmas trailer"
                  className="rounded-lg shadow-lg"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Enhanced Testimonial Card */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Card className="bg-gradient-to-br from-white via-red-50 to-green-50 border-2 border-red-200 shadow-2xl max-w-4xl mx-auto overflow-hidden">
                <CardContent className="p-8 md:p-12 relative">
                  {/* Decorative Quote Marks */}
                  <div className="absolute top-4 left-4 text-8xl text-red-200 opacity-20 font-serif leading-none">
                    &quot;
                  </div>
                  <div className="absolute bottom-4 right-4 text-8xl text-green-200 opacity-20 font-serif leading-none">
                    &quot;
                  </div>

                  {/* Quote Content */}
                  <motion.blockquote
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-900 mb-8 leading-tight relative z-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    &quot;Padgett&apos;s holiday spirit shines bright&quot;
                  </motion.blockquote>

                  {/* Logo */}
                  <motion.div
                    className="flex justify-center relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <a
                      href={`https://vimeo.com/${VIMEO_ID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
                    >
                      <img
                        src={orlandoWeeklyLogo}
                        alt="Orlando Weekly - Click to watch video"
                        className="h-16 md:h-20 lg:h-24 w-auto"
                        style={{ transform: "none" }}
                      />
                    </a>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Shadow box trailer player — same pattern as six-guitars-site About.jsx */}
      {showTrailer && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
          onClick={() => setShowTrailer(false)}
        >
          <div
            style={{
              position: "relative",
              width: "90%",
              maxWidth: "48rem",
              aspectRatio: "16 / 9",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                color: "#fff",
                fontSize: "1.875rem",
                fontWeight: 700,
                zIndex: 10,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                lineHeight: 1,
              }}
              onClick={() => setShowTrailer(false)}
              aria-label="Close trailer"
            >
              ×
            </button>
            <iframe
              src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1`}
              title="Chase Padgett: 6 String Christmas - Sizzle Reel"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "0.5rem",
                border: "none",
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
