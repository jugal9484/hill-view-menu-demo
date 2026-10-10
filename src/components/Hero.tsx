import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf } from 'lucide-react';
import type { ReactNode } from 'react';
import { heroImages } from '../data/images';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Logo } from './Logo';

/** Topographic contour lines: the hills around Bhuj, abstracted. */
function Contours() {
  const lines = [
    'M-20 210 C 80 170, 150 120, 240 140 S 400 220, 520 160 S 700 90, 820 130',
    'M-20 240 C 90 200, 170 160, 250 175 S 410 250, 530 195 S 700 130, 820 165',
    'M-20 270 C 100 235, 180 200, 260 210 S 420 280, 540 230 S 710 170, 820 200',
    'M-20 300 C 110 270, 190 240, 270 245 S 430 310, 550 265 S 720 210, 820 235',
    'M-20 330 C 120 305, 200 280, 280 280 S 440 340, 560 300 S 730 250, 820 270',
  ];
  return (
    <svg viewBox="0 0 800 360" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {lines.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={i === 0 ? '#C9A45C' : '#3A5FE8'}
          strokeOpacity={i === 0 ? 0.4 : 0.32 - i * 0.04}
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}

/**
 * Fine royal grain, drawn as inline SVG. (A CSS background or blend-mode layer here
 * hides the hero text from Chrome's LCP measurement.)
 */
function Grain() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden="true">
      <filter id="hv-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#hv-grain)" />
    </svg>
  );
}

const promises: ReactNode[] = [
  <>
    <span className="grid h-3.5 w-3.5 place-items-center rounded-[3px] border border-[#5FD38D]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#5FD38D]" />
    </span>
    100% Pure Veg
  </>,
  <>
    <Leaf className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
    Jain food available in all items
  </>,
];

const collagePos = [
  'left-[4%] top-[6%] h-[230px] w-[230px] -rotate-[4deg]',
  'right-[4%] top-0 h-[190px] w-[190px] rotate-[3deg]',
  'left-[33%] top-[44%] z-10 h-[210px] w-[210px] rotate-[2deg]',
  'right-0 top-[54%] h-[160px] w-[160px] -rotate-[3deg]',
];

export function Hero() {
  const reduce = useReducedMotion();
  // the collage only exists on desktop, so phones never download its photos
  const isDesktop = useIsDesktop(false);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, reduce ? 0 : 80]);
  const colY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -50]);

  return (
    <header id="top" className="relative overflow-hidden bg-royal-900 text-white">
      <motion.div style={{ y: bgY }} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#1B35B8_0%,#0F1E6B_55%,#0A1240_100%)]" />
        <Contours />
        <Grain />
      </motion.div>

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-safe pb-9 pt-[max(36px,env(safe-area-inset-top))] md:px-8 lg:grid-cols-[1fr_1.1fr] lg:pb-14 lg:pt-14">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="sr-only">Hill View Restaurant menu</h1>
          <Logo className="lg:items-start" />
          <p className="mt-5 font-serif text-[22px] italic text-royal-100 lg:text-[26px]">Eat • Enjoy • Repeat</p>
          <p className="mt-1 text-[13px] text-royal-200">Hill View Resort, Bhuj</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start" aria-label="Kitchen promises">
            {promises.map((content, i) => (
              <motion.li
                key={i}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.35 }}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-2 text-[13px] font-medium"
              >
                {content}
              </motion.li>
            ))}
          </ul>
        </div>

        {isDesktop && (
        <motion.div style={{ y: colY }} className="relative hidden h-[380px] lg:block" aria-hidden="true">
          {heroImages.map((img, i) => (
            <motion.div
              key={img.src}
              className={`absolute overflow-hidden rounded-[22px] border-[3px] border-white/90 shadow-[0_24px_48px_-16px_rgb(0_0_0/0.5)] ${collagePos[i]}`}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, -6, 0] }}
              transition={
                reduce
                  ? undefined
                  : {
                      opacity: { delay: 0.2 + i * 0.1, duration: 0.5 },
                      y: { delay: 0.6 + i * 0.4, duration: 6 + i, repeat: Infinity, ease: 'easeInOut' },
                    }
              }
            >
              <img
                src={img.src}
                alt=""
                width={360}
                height={360}
                decoding="async"
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ backgroundImage: `url(${img.blur})`, backgroundSize: 'cover' }}
              />
            </motion.div>
          ))}
        </motion.div>
        )}
      </div>
    </header>
  );
}
