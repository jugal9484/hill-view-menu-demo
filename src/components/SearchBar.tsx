import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useRef } from 'react';

type Props = { value: string; onChange: (v: string) => void; className?: string; tone?: 'page' | 'bar' };

export function SearchBar({ value, onChange, className = '', tone = 'page' }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const surface =
    tone === 'bar'
      ? 'bg-white/10 text-white placeholder:text-royal-200 focus-within:bg-white/15 border-white/10'
      : 'bg-card text-ink placeholder:text-muted border-hairline focus-within:border-royal-500';

  return (
    <div role="search" className={`relative flex h-11 items-center rounded-full border transition-colors ${surface} ${className}`}>
      <Search className={`pointer-events-none absolute left-3.5 h-[18px] w-[18px] ${tone === 'bar' ? 'text-royal-200' : 'text-muted'}`} aria-hidden="true" />
      <label htmlFor="menu-search" className="sr-only">
        Search the menu
      </label>
      <input
        ref={input}
        id="menu-search"
        type="search"
        inputMode="search"
        enterKeyHint="search"
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onChange('');
          if (e.key === 'Enter') input.current?.blur();
        }}
        placeholder="Search dishes"
        className="h-full w-full rounded-full bg-transparent pl-10 pr-11 text-[15px] outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      <AnimatePresence>
        {value && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            onClick={() => {
              onChange('');
              input.current?.focus();
            }}
            className="absolute right-0.5 grid h-10 w-10 place-items-center rounded-full"
            aria-label="Clear search"
          >
            <X className="h-[18px] w-[18px]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
