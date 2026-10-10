import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export function MenuFab({ hidden, onClick }: { hidden: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Open menu sections"
      aria-haspopup="dialog"
      initial={false}
      animate={{ y: hidden ? 120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
      whileTap={{ scale: 0.94 }}
      tabIndex={hidden ? -1 : 0}
      className="fixed z-40 flex h-[52px] items-center gap-2 rounded-full bg-royal-900 pl-4 pr-5 text-[15px] font-semibold text-white shadow-[0_14px_32px_-10px_rgb(10_18_64/0.7)] ring-1 ring-gold/40 dark:bg-royal-600 lg:hidden"
      style={{
        right: 'max(16px, env(safe-area-inset-right))',
        bottom: 'max(20px, calc(env(safe-area-inset-bottom) + 12px))',
      }}
    >
      <BookOpen className="h-5 w-5 text-gold dark:text-white" aria-hidden="true" />
      Menu
    </motion.button>
  );
}
