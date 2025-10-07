import React from "react";
import { motion } from "motion/react";

interface SnowflakeProps {
  delay: number;
  duration: number;
  size: number;
  left: number;
  opacity: number;
}

function Snowflake({ delay, duration, size, left, opacity }: SnowflakeProps) {
  const horizontalDrift = Math.random() * 30 - 15; // Random drift between -15 and 15
  
  return (
    <motion.div
      className="absolute pointer-events-none top-0"
      style={{
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: opacity,
      }}
      initial={{ y: -20 }}
      animate={{
        y: "100vh",
        x: [0, horizontalDrift, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
        x: {
          duration: duration / 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-white drop-shadow-sm" style={{ fontSize: `${size}px` }}>❄</span>
      </div>
    </motion.div>
  );
}

export function Snow() {
  const snowflakes = Array.from({ length: 30 }, (_, i) => ({
    delay: Math.random() * 8,
    duration: 10 + Math.random() * 15, // 10-25 seconds
    size: 10 + Math.random() * 12, // 10-22px
    left: Math.random() * 100,
    opacity: 0.4 + Math.random() * 0.5, // 0.4-0.9 opacity
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
      {snowflakes.map((snowflake, index) => (
        <Snowflake
          key={index}
          delay={snowflake.delay}
          duration={snowflake.duration}
          size={snowflake.size}
          left={snowflake.left}
          opacity={snowflake.opacity}
        />
      ))}
    </div>
  );
}
