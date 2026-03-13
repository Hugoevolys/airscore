import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getScoreColor } from '../lib/utils';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  delay?: number;
  showLabel?: boolean;
  label?: string;
}

export function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  delay = 0,
  showLabel = true,
  label,
}: ScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 10) * circumference;
  const offset = circumference - progress;
  const color = getScoreColor(score);

  // Animate counter
  useEffect(() => {
    const startDelay = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const increment = score / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.round(current * 10) / 10);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay * 1000);

    return () => clearTimeout(startDelay);
  }, [score, delay]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{
              duration: 1.5,
              delay,
              ease: 'easeOut',
            }}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-bold tabular-nums"
            style={{
              fontSize: size * 0.28,
              color,
            }}
          >
            {displayScore.toFixed(1)}
          </span>
          <span className="text-white/40" style={{ fontSize: size * 0.1 }}>
            / 10
          </span>
        </div>
      </div>
      {showLabel && label && (
        <span className="text-white/50 text-sm font-medium">{label}</span>
      )}
    </div>
  );
}
