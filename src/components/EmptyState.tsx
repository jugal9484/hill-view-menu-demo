import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';

export function EmptyState({ query, onReset }: { query: string; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-4 my-10 flex flex-col items-center rounded-card bg-card px-6 py-12 text-center shadow-card md:mx-6 lg:mx-0"
    >
      <motion.span
        initial={{ rotate: -12, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.05 }}
        className="grid h-14 w-14 place-items-center rounded-full bg-accent-soft text-accent"
      >
        <SearchX className="h-7 w-7" aria-hidden="true" />
      </motion.span>
      <h2 className="mt-4 font-serif text-[24px] font-semibold text-ink">
        {query ? <>Nothing matches “{query}”</> : 'No dishes match these filters'}
      </h2>
      <p className="mt-1 max-w-xs text-[14px] text-muted">Try a dish name like paneer, dosa or mojito, or clear the filters to see the full menu.</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 h-11 rounded-full bg-royal-600 px-5 text-[14px] font-semibold text-white transition-colors hover:bg-royal-700"
      >
        Show full menu
      </button>
    </motion.div>
  );
}
