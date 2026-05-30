import { motion } from "framer-motion";

interface AnimatedLogoProps {
  size?: number;
  className?: string;
  loop?: boolean;
}

/**
 * Animated Rest-Tech monogram.
 * Sequence: minimal R appears → morphs toward T → both unite into RT monogram.
 * Pure SVG + framer-motion, no raster assets.
 */
export default function AnimatedLogo({ size = 56, className, loop = true }: AnimatedLogoProps) {
  const BLUE = "hsl(217 100% 54%)";
  const ORANGE = "hsl(22 100% 50%)";

  // Timing (seconds)
  const tRStart = 0;
  const tRHold = 0.9;
  const tMorph = 1.6;
  const tTHold = 2.4;
  const tUnite = 3.1;
  const tEnd = 4.4;
  const total = loop ? tEnd + 0.6 : tEnd;

  const draw = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: [0, 1, 1, 1, 1, 1, 0],
      opacity: [0, 1, 1, 1, 1, 1, 0],
      transition: {
        duration: total,
        times: [0, tRHold / total, tMorph / total, tTHold / total, tUnite / total, tEnd / total, 1],
        repeat: loop ? Infinity : 0,
        ease: "easeInOut",
      },
    },
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Rest-Tech animated logo"
    >
      <defs>
        <linearGradient id="rt-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={BLUE} />
          <stop offset="100%" stopColor={ORANGE} />
        </linearGradient>
        <filter id="rt-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Stage 1: R draws in */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0, 0, 0, 0],
          transition: {
            duration: total,
            times: [0, 0.1, tRHold / total, tMorph / total, tTHold / total, tUnite / total, 1],
            repeat: loop ? Infinity : 0,
            ease: "easeInOut",
          },
        }}
      >
        <motion.path
          d="M28 78 V22 H52 a14 14 0 0 1 0 28 H32 M48 50 L62 78"
          stroke={BLUE}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
          initial="initial"
          animate="animate"
          filter="url(#rt-glow)"
        />
      </motion.g>

      {/* Stage 2: T draws in (after R) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0, 0, 1, 1, 0, 0],
          transition: {
            duration: total,
            times: [0, tRHold / total, (tRHold + 0.1) / total, tMorph / total, tTHold / total, tUnite / total, 1],
            repeat: loop ? Infinity : 0,
            ease: "easeInOut",
          },
        }}
      >
        <motion.path
          d="M22 26 H78 M50 26 V78"
          stroke={ORANGE}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 0, 0, 1, 1, 1, 0],
            transition: {
              duration: total,
              times: [0, tRHold / total, (tRHold + 0.05) / total, tMorph / total, tTHold / total, tUnite / total, 1],
              repeat: loop ? Infinity : 0,
              ease: "easeInOut",
            },
          }}
          filter="url(#rt-glow)"
        />
      </motion.g>

      {/* Stage 3: Unified RT monogram */}
      <motion.g
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: [0, 0, 0, 0, 0, 1, 1],
          scale: [0.92, 0.92, 0.92, 0.92, 0.92, 1, 1],
          transition: {
            duration: total,
            times: [0, tRHold / total, tMorph / total, tTHold / total, (tUnite - 0.1) / total, tUnite / total, 1],
            repeat: loop ? Infinity : 0,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        style={{ transformOrigin: "50px 50px" }}
      >
        {/* R-stem */}
        <path
          d="M20 80 V20 H46 a14 14 0 0 1 0 28 H24 M42 48 L58 80"
          stroke="url(#rt-grad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#rt-glow)"
        />
        {/* T overlay, sharing the R bowl baseline */}
        <path
          d="M54 22 H86 M70 22 V80"
          stroke={ORANGE}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#rt-glow)"
        />
        {/* Connecting accent dot */}
        <circle cx="50" cy="50" r="3" fill={ORANGE} />
      </motion.g>
    </svg>
  );
}
