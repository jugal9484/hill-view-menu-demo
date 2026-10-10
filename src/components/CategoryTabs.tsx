import { LayoutGroup, motion } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';
import type { Category, Group } from '../data/types';

type Props = {
  groups: Group[];
  categories: Category[];
  activeCat: string | null;
  onSelect: (categoryId: string) => void;
  /** rendered at the start of the secondary row (filter chips) */
  leading?: ReactNode;
};

const spring = { type: 'spring', stiffness: 400, damping: 32 } as const;

/** Scroll the row just enough to bring the active pill into view (leaves leading chips visible when possible). */
function useKeepActiveInView(container: React.RefObject<HTMLElement>, activeKey: string | null) {
  const mounted = useRef(false);
  useEffect(() => {
    const row = container.current;
    // Never scroll on first render: an early scroll ends Chrome's LCP measurement.
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!row || !activeKey) return;
    const el = row.querySelector<HTMLElement>(`[data-key="${activeKey}"]`);
    if (!el) return;
    const pad = 48;
    const start = el.offsetLeft;
    const end = start + el.offsetWidth;
    let left: number | null = null;
    if (start - pad < row.scrollLeft) left = start - pad;
    else if (end + pad > row.scrollLeft + row.clientWidth) left = end + pad - row.clientWidth;
    if (left !== null) row.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [container, activeKey]);
}

export function CategoryTabs({ groups, categories, activeCat, onSelect, leading }: Props) {
  const activeGroup = categories.find((c) => c.id === activeCat)?.group ?? groups[0]?.id;
  const groupRow = useRef<HTMLDivElement>(null);
  const catRow = useRef<HTMLDivElement>(null);
  useKeepActiveInView(groupRow, activeGroup ?? null);
  useKeepActiveInView(catRow, activeCat);

  const groupCats = categories.filter((c) => c.group === activeGroup);

  return (
    <nav aria-label="Menu sections" className="bg-card/95 backdrop-blur-md supports-[backdrop-filter]:bg-card/85">
      <LayoutGroup id="group-tabs">
        <div ref={groupRow} className="no-scrollbar edge-fade relative flex gap-1 overflow-x-auto px-3 pt-2 md:px-5" role="tablist" aria-label="Menu groups">
          {groups.map((g) => {
            const active = g.id === activeGroup;
            const first = categories.find((c) => c.group === g.id);
            return (
              <button
                key={g.id}
                data-key={g.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => first && onSelect(first.id)}
                className={`relative h-11 shrink-0 rounded-full px-4 text-[14px] font-semibold transition-colors duration-200 ${active ? 'text-white' : 'text-muted hover:text-ink'}`}
              >
                {active && (
                  <motion.span layoutId="group-pill" transition={spring} className="absolute inset-0 rounded-full bg-royal-600 shadow-[0_6px_16px_-8px_rgb(36_71_214/0.7)] dark:bg-royal-500" />
                )}
                <span className="relative">{g.short}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <LayoutGroup id="cat-chips">
        <div ref={catRow} className="no-scrollbar edge-fade relative flex items-center gap-2 overflow-x-auto px-3 pb-2 pt-1.5 md:px-5">
          {leading}
          {leading && groupCats.length > 0 && <span className="mx-0.5 h-5 w-px shrink-0 bg-hairline" aria-hidden="true" />}
          {groupCats.map((c) => {
            const active = c.id === activeCat;
            return (
              <button
                key={c.id}
                data-key={c.id}
                type="button"
                aria-current={active ? 'true' : undefined}
                onClick={() => onSelect(c.id)}
                className={`relative h-9 shrink-0 rounded-full border px-3 text-[13px] font-medium transition-colors duration-200 after:absolute after:-inset-y-1 after:inset-x-0 after:content-[''] ${
                  active ? 'border-transparent text-accent' : 'border-hairline text-muted hover:text-ink'
                }`}
              >
                {active && <motion.span layoutId="cat-pill" transition={spring} className="absolute inset-0 rounded-full bg-accent-soft ring-1 ring-inset ring-accent/30" />}
                <span className="relative whitespace-nowrap">
                  {c.title} <span className="tabular font-normal">{c.items.length}</span>
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>
      <div className="h-px bg-hairline" />
    </nav>
  );
}
