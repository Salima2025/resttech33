import { motion } from "framer-motion";
import logoAsset from "@/assets/rt-logo.png.asset.json";

interface AnimatedLogoProps {
  size?: number;
  className?: string;
  loop?: boolean;
}

/**
 * Rest-Tech RT badge logo with a smooth entrance animation.
 * Fades in with a gentle scale-up, then performs a soft neon-glow pulse loop.
 */
export default function AnimatedLogo({ size = 56, className, loop = true }: AnimatedLogoProps) {
  const width = size;
  const height = Math.round((size * 3) / 4);

  return (
    <motion.div
      className={className}
      style={{
        width,
        height,
        display: "inline-block",
        position: "relative",
        background: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 60%, #9ca3af 100%)",
        borderRadius: Math.round(size * 0.15),
        padding: Math.round(size * 0.06),
        boxShadow: "0 2px 8px hsl(0 0% 0% / 0.15)",
      }}
      initial={{ opacity: 0, scale: 0.7, rotate: -8, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Rest-Tech logo"
    >
      <motion.img
        src={logoAsset.url}
        alt="Rest-Tech"
        width={width}
        height={height}
        draggable={false}
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        animate={
          loop
            ? {
                filter: [
                  "drop-shadow(0 0 6px hsl(217 100% 54% / 0.35)) drop-shadow(0 0 6px hsl(22 100% 52% / 0.25))",
                  "drop-shadow(0 0 12px hsl(217 100% 54% / 0.55)) drop-shadow(0 0 12px hsl(22 100% 52% / 0.45))",
                  "drop-shadow(0 0 6px hsl(217 100% 54% / 0.35)) drop-shadow(0 0 6px hsl(22 100% 52% / 0.25))",
                ],
              }
            : undefined
        }
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />
    </motion.div>
  );
}
