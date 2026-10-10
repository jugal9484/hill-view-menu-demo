import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { Category, Item } from '../data/types';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ItemRow } from './ItemRow';

type Props = {
  category: Category;
  tokens: string[];
  onOpen: (item: Item) => void;
  /** first section of a super-group shows the group title above it */
  groupTitle?: string;
};

export function CategorySection({ category, tokens, onOpen, groupTitle }: Props) {
  const [open, setOpen] = useState(true);
  const reduce = useReducedMotion();
  const fallback = category.items[0]?.image;
  const panelId = `panel-${category.id}`;

  return (
    <section id={`cat-${category.id}`} aria-labelledby={`title-${category.id}`} style={{ scrollMarginTop: 'var(--stack-h)' }}>
      {groupTitle && (
        <div className="flex items-center gap-3 px-4 pb-1 pt-7 md:px-6 lg:px-0">
          <span className="h-px w-5 bg-gold" aria-hidden="true" />
          <h2 className="font-serif text-[15px] font-semibold italic text-muted">{groupTitle}</h2>
        </div>
      )}
      <div className="bg-card px-4 md:px-6 lg:rounded-card lg:shadow-card xl:bg-transparent xl:px-0 xl:shadow-none">
        <h3 id={`title-${category.id}`}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex min-h-[60px] w-full items-center gap-3 py-3 text-left"
          >
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="font-serif text-[24px] font-semibold leading-tight text-ink">
                {category.title}
                <span className="tabular ml-2 align-middle font-sans text-[13px] font-medium text-muted">{category.items.length}</span>
              </span>
              {category.blurb && <span className="mt-0.5 text-[12.5px] text-muted">{category.blurb}</span>}
            </span>
            <motion.span
              animate={{ rotate: open ? 0 : -90 }}
              transition={{ duration: 0.25 }}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent"
              aria-hidden="true"
            >
              <ChevronDown className="h-5 w-5" />
            </motion.span>
          </button>
        </h3>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="panel"
              initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <ul className="pb-2 xl:grid xl:grid-cols-2 xl:gap-4 xl:pb-2">
                {category.items.map((item, i) => (
                  <ItemRow key={item.id} item={item} index={i} tokens={tokens} fallbackSrc={fallback} onOpen={onOpen} />
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
