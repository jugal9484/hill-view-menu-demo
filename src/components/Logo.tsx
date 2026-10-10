import { motion } from 'framer-motion';

/**
 * Placeholder brand mark: gold mountain-peak line above a serif wordmark.
 * Replace <MountainMark/> (or the whole component) with the real logo file when available.
 */
export const PEAK_PATH = 'M4 52 L36 16 L52 34 L72 6 L116 52';
export const SNOW_PATH = 'M63 18 L72 6 L82 20';

type MarkProps = { className?: string; draw?: boolean; strokeWidth?: number };

export function MountainMark({ className, draw = false, strokeWidth = 3 }: MarkProps) {
  const t = { duration: 0.9, ease: [0.65, 0, 0.35, 1] as const };
  return (
    <svg viewBox="0 0 120 56" className={className} fill="none" aria-hidden="true">
      <motion.path
        d={PEAK_PATH}
        stroke="#C9A45C"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={draw ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={t}
      />
      <motion.path
        d={SNOW_PATH}
        stroke="#C9A45C"
        strokeWidth={strokeWidth * 0.55}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.7}
        initial={draw ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ ...t, delay: draw ? 0.45 : 0, duration: 0.4 }}
      />
    </svg>
  );
}

type LogoProps = { size?: 'sm' | 'lg'; className?: string; tone?: 'light' | 'ink' };

export function Logo({ size = 'lg', className = '', tone = 'light' }: LogoProps) {
  const color = tone === 'light' ? 'text-white' : 'text-ink';
  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <MountainMark className="h-5 w-auto" strokeWidth={5} />
        <span className={`font-serif text-[19px] font-semibold leading-none tracking-[0.06em] ${color}`}>Hill View</span>
      </span>
    );
  }
  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <MountainMark className="h-12 w-auto sm:h-14" />
      <span className={`mt-2 font-serif text-[40px] font-semibold leading-none tracking-[0.12em] sm:text-5xl ${color}`}>HILL VIEW</span>
      <span className="mt-2 flex items-center gap-3 text-[11px] font-medium tracking-[0.5em] text-gold sm:text-xs">
        <span className="h-px w-6 bg-gold/60" />
        RESTAURANT
        <span className="-ml-[0.5em] h-px w-6 bg-gold/60" />
      </span>
    </span>
  );
}
