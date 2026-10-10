import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { MountainMark } from './Logo';

const KEY = 'hv-splash-seen';
const WORD = 'HILL VIEW';

function alreadySeen() {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

/** Once-per-session intro: the gold peak draws itself, the wordmark rises, then it slides away. */
export function SplashIntro() {
  const [show, setShow] = useState(() => !alreadySeen());
  const reduce = useReducedMotion();

  // index.html shows a plain navy stand-in until this component takes over
  useLayoutEffect(() => {
    document.getElementById('splash-shell')?.remove();
  }, []);

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* private mode: splash simply shows again next time */
    }
    const t = setTimeout(() => setShow(false), reduce ? 600 : 1150);
    const skip = () => setShow(false);
    window.addEventListener('keydown', skip);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', skip);
    };
  }, [show, reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          role="presentation"
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-royal-950"
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: reduce ? 0.2 : 0.45, ease: [0.7, 0, 0.3, 1] }}
        >
          <MountainMark draw={!reduce} className="h-16 w-auto" />
          <div className="mt-3 flex font-serif text-[44px] font-semibold leading-none tracking-[0.12em] text-white" aria-label="Hill View">
            {WORD.split('').map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.045, duration: 0.35, ease: 'easeOut' }}
                className={ch === ' ' ? 'w-3' : ''}
              >
                {ch}
              </motion.span>
            ))}
          </div>
          <motion.p
            className="mt-3 text-xs font-medium tracking-[0.5em] text-gold"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            RESTAURANT
          </motion.p>
          <span className="sr-only">Loading menu. Press any key to skip.</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
