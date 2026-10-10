import { LayoutGroup, motion } from 'framer-motion';
import type { Category, Group } from '../data/types';

type Props = { groups: Group[]; categories: Category[]; activeCat: string | null; onSelect: (id: string) => void };

export function DesktopSidebar({ groups, categories, activeCat, onSelect }: Props) {
  return (
    <nav aria-label="Menu sections" className="no-scrollbar max-h-[calc(100dvh-var(--stack-h)-32px)] overflow-y-auto pb-6 pr-1">
      <LayoutGroup id="sidebar">
        {groups.map((g) => {
          const cats = categories.filter((c) => c.group === g.id);
          if (!cats.length) return null;
          return (
            <div key={g.id} className="mb-4">
              <p className="mb-1 flex items-center gap-2 px-3 font-serif text-[15px] font-semibold italic text-muted">
                <span className="h-px w-3 bg-gold" aria-hidden="true" />
                {g.title}
              </p>
              <ul>
                {cats.map((c) => {
                  const active = c.id === activeCat;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => onSelect(c.id)}
                        aria-current={active ? 'true' : undefined}
                        className={`relative flex min-h-[40px] w-full items-center justify-between rounded-xl px-3 text-left text-[14px] transition-colors duration-200 ${
                          active ? 'font-semibold text-accent' : 'text-ink/80 hover:bg-card hover:text-ink'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="side-pill"
                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                            className="absolute inset-0 rounded-xl bg-accent-soft"
                          >
                            <span className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-accent" />
                          </motion.span>
                        )}
                        <span className="relative">{c.title}</span>
                        <span className="tabular relative text-[12.5px] text-muted">{c.items.length}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </LayoutGroup>
    </nav>
  );
}
