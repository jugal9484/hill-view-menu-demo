import type { Category, Group } from '../data/types';
import { BottomSheet } from './BottomSheet';

type Props = {
  open: boolean;
  groups: Group[];
  categories: Category[];
  activeCat: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
};

export default function MenuSheet({ open, groups, categories, activeCat, onSelect, onClose }: Props) {
  return (
    <BottomSheet open={open} onClose={onClose} label="Jump to a menu section" maxHeight="80dvh">
      {(startDrag) => (
        <>
          <div onPointerDown={startDrag} className="shrink-0 touch-none px-5 pb-2 pt-6">
            <h2 className="font-serif text-[28px] font-semibold leading-none">Menu</h2>
          </div>
          <div className="overflow-y-auto overscroll-contain px-2 pb-safe">
            {groups.map((g) => {
              const cats = categories.filter((c) => c.group === g.id);
              if (!cats.length) return null;
              return (
                <div key={g.id} className="pb-2">
                  <h3 className="px-3 pb-1 pt-3 text-[12.5px] font-semibold text-gold-deep dark:text-gold">{g.title}</h3>
                  <ul>
                    {cats.map((c) => {
                      const active = c.id === activeCat;
                      return (
                        <li key={c.id}>
                          <button
                            type="button"
                            onClick={() => onSelect(c.id)}
                            aria-current={active ? 'true' : undefined}
                            className={`flex min-h-[48px] w-full items-center justify-between rounded-xl px-3 text-left text-[15px] transition-colors ${
                              active ? 'bg-accent-soft font-semibold text-accent' : 'text-ink hover:bg-page'
                            }`}
                          >
                            <span>{c.title}</span>
                            <span className="tabular text-[13px] text-muted">{c.items.length}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </>
      )}
    </BottomSheet>
  );
}
