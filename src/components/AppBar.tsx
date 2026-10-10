import { motion, useScroll, useSpring } from 'framer-motion';
import { Info, Moon, Sun } from 'lucide-react';
import type { ReactNode } from 'react';
import { Logo } from './Logo';

type Props = {
  dark: boolean;
  onToggleTheme: () => void;
  onOpenInfo: () => void;
  /** desktop only: search + filters sit inline in the bar */
  children?: ReactNode;
};

const iconBtn =
  'grid h-11 w-11 place-items-center rounded-full text-royal-100 transition-colors hover:bg-white/10 active:bg-white/15';

export function AppBar({ dark, onToggleTheme, onOpenInfo, children }: Props) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative bg-royal-900 text-white dark:bg-[#0C1652]">
      <div className="mx-auto flex h-[52px] max-w-[1200px] items-center gap-2 px-safe md:px-6 lg:h-[68px] lg:gap-6 lg:px-8">
        <a href="#top" className="-ml-1 rounded-lg p-1" aria-label="Hill View Restaurant, back to top">
          <Logo size="sm" />
        </a>
        <div className="hidden flex-1 items-center gap-3 lg:flex">{children}</div>
        <div className="ml-auto flex items-center lg:ml-0">
          <button type="button" className={iconBtn} onClick={onOpenInfo} aria-label="Good to know: notes about ordering">
            <Info className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={iconBtn}
            onClick={onToggleTheme}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={dark}
          >
            <motion.span key={dark ? 'sun' : 'moon'} initial={{ rotate: -40, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.25 }}>
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.span>
          </button>
        </div>
      </div>
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-royal-500 dark:bg-gold"
        style={{ scaleX: progress }}
      />
    </div>
  );
}
