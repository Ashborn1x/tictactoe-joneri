import { motion } from 'motion/react';
import type { Player } from '../types/game';

interface MarkIconProps {
  player: Player;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  isGhost?: boolean;
  isWinning?: boolean;
}

const SIZE_CLASSES: Record<NonNullable<MarkIconProps['size']>, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-11 h-11 sm:w-[52px] sm:h-[52px]',
};

export function MarkIcon({
  player,
  size = 'lg',
  animated = true,
  isGhost = false,
  isWinning = false,
}: MarkIconProps) {
  const sizeClass = SIZE_CLASSES[size];
  const strokeWidth = size === 'sm' ? 3 : size === 'md' ? 2.8 : 2.6;

  const colorClass =
    player === 'X'
      ? isWinning
        ? 'text-sky-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.55)]'
        : 'text-sky-400'
      : isWinning
        ? 'text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.55)]'
        : 'text-amber-400';

  if (player === 'X') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        width={size === 'sm' ? 16 : size === 'md' ? 24 : 44}
        height={size === 'sm' ? 16 : size === 'md' ? 24 : 44}
        style={{ width: size === 'sm' ? 16 : size === 'md' ? 24 : 44, height: size === 'sm' ? 16 : size === 'md' ? 24 : 44, flexShrink: 0 }}
        className={`${sizeClass} ${colorClass} ${isGhost ? 'opacity-25' : ''} transition-transform duration-150`}
      >
        <motion.path
          d="M10 10L30 30"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={animated && !isGhost ? { pathLength: 0, opacity: 0 } : false}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M30 10L10 30"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={animated && !isGhost ? { pathLength: 0, opacity: 0 } : false}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.16, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      width={size === 'sm' ? 16 : size === 'md' ? 24 : 44}
      height={size === 'sm' ? 16 : size === 'md' ? 24 : 44}
      style={{ width: size === 'sm' ? 16 : size === 'md' ? 24 : 44, height: size === 'sm' ? 16 : size === 'md' ? 24 : 44, flexShrink: 0 }}
      className={`${sizeClass} ${colorClass} ${isGhost ? 'opacity-25' : ''} transition-transform duration-150`}
    >
      <motion.circle
        cx="20"
        cy="20"
        r="11.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={animated && !isGhost ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
