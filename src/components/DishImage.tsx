import { motion } from 'framer-motion';
import { useState } from 'react';
import { blurFor, thumbFor } from '../data/images';
import { MountainMark } from './Logo';

type Props = {
  itemId: string;
  src: string;
  /** used when the item photo fails to load (usually the category's first photo) */
  fallbackSrc?: string;
  alt: string;
  size: number;
  className?: string;
  eager?: boolean;
  /** responsive `sizes`; when set, a 240px thumbnail is offered via srcset */
  sizes?: string;
};

/** Shimmer → blur-up → photo, with category and branded fallbacks. */
export function DishImage({ itemId, src, fallbackSrc, alt, size, className = '', eager = false, sizes }: Props) {
  const [stage, setStage] = useState<0 | 1 | 2>(0); // 0 item photo, 1 category photo, 2 branded placeholder
  const [loaded, setLoaded] = useState(false);
  const blur = blurFor(itemId);
  const current = stage === 0 ? src : fallbackSrc;
  const thumb = sizes && current ? thumbFor(current) : undefined;

  return (
    <div
      className={`relative isolate overflow-hidden bg-accent-soft ${className}`}
      style={{ aspectRatio: '1 / 1' }}
    >
      {!loaded && stage < 2 && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${blur ? '' : 'shimmer'}`}
          style={blur ? { backgroundImage: `url(${blur})`, backgroundSize: 'cover', filter: 'blur(10px)', transform: 'scale(1.15)' } : undefined}
        >
          {blur && <div className="shimmer absolute inset-0 opacity-30" />}
        </div>
      )}
      {stage < 2 && current ? (
        <motion.img
          key={current}
          src={current}
          srcSet={thumb ? `${thumb} 240w, ${current} 600w` : undefined}
          sizes={thumb ? sizes : undefined}
          alt={alt}
          width={size}
          height={size}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(false);
            setStage((s) => (s === 0 && fallbackSrc && fallbackSrc !== src ? 1 : 2));
          }}
          initial={false}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-royal-800 to-royal-950" role="img" aria-label={alt}>
          <MountainMark className="w-1/2 opacity-80" />
        </div>
      )}
      {/* faint warm wash so photos from mixed sources sit together */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#5b3a12]/10 to-transparent mix-blend-multiply" />
    </div>
  );
}
