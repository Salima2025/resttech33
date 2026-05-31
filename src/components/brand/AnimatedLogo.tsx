import { motion } from "framer-motion";

interface AnimatedLogoProps {
  size?: number;
  className?: string;
  loop?: boolean;
}

/**
 * Animated Rest-Tech RT monogram.
 * Storyboard: bold blue R → motion-blur swipe → orange T resolves →
 * R returns and overlaps T to form a unified RT monogram.
 * Pure SVG + framer-motion. Premium gradient fills, soft glow, no raster assets.
 */
export default function AnimatedLogo({ size = 56, className, loop = true }: AnimatedLogoProps) {
  // Solid bold geometry, filled glyphs (matches the reference storyboard).
  // Bold sans, slight italic feel achieved via path geometry.
  // viewBox: 200x140 (wide canvas, monogram lives roughly within 30..170 / 18..122)
  const total = 5.2; // full loop length in seconds
  const T = (t: number) => t / total;

  // R path — bold, modern, with diagonal leg. Designed inside a 70-wide box.
  // Anchored so the R stem sits at x≈40..110; we translate it via group transforms.
  const R_PATH =
    "M0 122 V18 H42 a30 30 0 0 1 0 60 H22 V52 h18 a10 10 0 0 0 0 -20 H22 V122 Z M40 70 L70 122 H48 L24 84 Z";

  // T path — bold blockletter T inside a ~80-wide box.
  const T_PATH = "M0 18 H80 V40 H51 V122 H29 V40 H0 Z";

  const transition = (delayPattern: number[]) => ({
    duration: total,
    times: delayPattern,
    repeat: loop ? Infinity : 0,
    ease: "easeInOut" as const,
  });

  return (
    <svg
      width={size}
      height={(size * 140) / 200}
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Rest-Tech animated monogram"
    >
      <defs>
        <linearGradient id="rt-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(205 100% 70%)" />
          <stop offset="55%" stopColor="hsl(217 100% 54%)" />
          <stop offset="100%" stopColor="hsl(222 90% 38%)" />
        </linearGradient>
        <linearGradient id="rt-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(38 100% 65%)" />
          <stop offset="55%" stopColor="hsl(22 100% 52%)" />
          <stop offset="100%" stopColor="hsl(14 90% 40%)" />
        </linearGradient>
        <filter id="rt-soft-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="rt-motion" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6 0" />
        </filter>
      </defs>

      {/* Stage A: lone centered R (frames 01–02) */}
      <motion.g
        initial={{ opacity: 0, x: 65, scale: 0.96 }}
        animate={{
          opacity: [0, 1, 1, 0, 0, 0, 0, 0],
          x: [65, 65, 65, 130, 200, 200, 200, 200],
          scale: [0.96, 1, 1, 1, 1, 1, 1, 1],
          transition: transition([0, T(0.4), T(1.2), T(1.6), T(1.9), T(3.4), T(4.6), 1]),
        }}
        style={{ transformOrigin: "100px 70px" }}
        filter="url(#rt-soft-glow)"
      >
        <path d={R_PATH} fill="url(#rt-blue)" />
      </motion.g>

      {/* Motion-blur streaks during R→T swipe (frame 02) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0, 0.8, 0, 0, 0, 0],
          transition: transition([0, T(1.1), T(1.45), T(1.8), T(2.2), T(3.0), 1]),
        }}
      >
        <rect x="40" y="58" width="140" height="3" rx="1.5" fill="url(#rt-orange)" opacity="0.5" />
        <rect x="55" y="72" width="125" height="2" rx="1" fill="url(#rt-orange)" opacity="0.4" />
        <rect x="35" y="86" width="150" height="3" rx="1.5" fill="url(#rt-orange)" opacity="0.5" />
      </motion.g>

      {/* Stage B: lone centered T (frames 03–05) */}
      <motion.g
        initial={{ opacity: 0, x: 200 }}
        animate={{
          opacity: [0, 0, 0, 1, 1, 1, 0, 0, 0],
          x: [200, 200, 200, 60, 60, 60, 60, 60, 60],
          transition: transition([0, T(1.2), T(1.8), T(2.1), T(2.6), T(3.1), T(3.45), T(3.9), 1]),
        }}
        filter="url(#rt-soft-glow)"
      >
        <path d={T_PATH} fill="url(#rt-orange)" />
      </motion.g>

      {/* Stage C: blue R returns from the left (frame 06) */}
      <motion.g
        initial={{ opacity: 0, x: -80 }}
        animate={{
          opacity: [0, 0, 0, 0, 0, 0, 1, 0, 0],
          x: [-80, -80, -80, -80, -80, -80, 40, 65, 65],
          transition: transition([0, T(2.6), T(3.0), T(3.2), T(3.35), T(3.45), T(3.7), T(3.9), 1]),
        }}
        filter="url(#rt-soft-glow)"
      >
        <path d={R_PATH} fill="url(#rt-blue)" />
      </motion.g>

      {/* Stage D: united RT monogram (frames 07–08) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{
          opacity: [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
          scale: [0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 0.94, 1, 1, 1],
          transition: transition([0, T(2.6), T(3.0), T(3.4), T(3.6), T(3.8), T(3.95), T(4.05), T(4.9), 1]),
        }}
        style={{ transformOrigin: "100px 70px" }}
        filter="url(#rt-soft-glow)"
      >
        {/* T sits behind, slightly right */}
        <g transform="translate(60 0)">
          <path d={T_PATH} fill="url(#rt-orange)" />
        </g>
        {/* R overlaps the T stem */}
        <g transform="translate(40 0)">
          <path d={R_PATH} fill="url(#rt-blue)" />
        </g>
      </motion.g>
    </svg>
  );
}
