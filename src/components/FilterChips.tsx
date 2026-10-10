import { motion } from 'framer-motion';
import { Check, ChefHat, Flame } from 'lucide-react';

export type Filters = { spicy: boolean; chef: boolean };

type Props = { value: Filters; onChange: (f: Filters) => void; tone?: 'page' | 'bar' };

export function FilterChips({ value, onChange, tone = 'page' }: Props) {
  const chips = [
    { key: 'spicy' as const, label: 'Spicy', Icon: Flame, on: 'bg-spicy text-white border-spicy' },
    { key: 'chef' as const, label: 'Chef’s Special', Icon: ChefHat, on: 'bg-gold text-royal-950 border-gold' },
  ];
  const off =
    tone === 'bar'
      ? 'border-white/20 text-white hover:bg-white/10'
      : 'border-hairline bg-card text-ink hover:border-royal-200';

  return (
    <div className="flex shrink-0 gap-2" role="group" aria-label="Filter dishes">
      {chips.map(({ key, label, Icon, on }) => {
        const active = value[key];
        return (
          <motion.button
            key={key}
            type="button"
            aria-pressed={active}
            whileTap={{ scale: 0.94 }}
            onClick={() => onChange({ ...value, [key]: !active })}
            className={`relative flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 after:absolute after:inset-x-0 after:-inset-y-1 after:content-[''] text-[13px] font-semibold transition-colors duration-200 ${active ? on : off}`}
            style={{ boxShadow: active ? '0 4px 14px -6px rgb(15 30 107 / 0.35)' : undefined }}
          >
            <motion.span
              key={String(active)}
              initial={{ scale: 0.4, rotate: -30, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 26 }}
              className="grid place-items-center"
            >
              {active ? <Check className="h-4 w-4" aria-hidden="true" /> : <Icon className={`h-4 w-4 ${key === 'spicy' ? 'text-spicy' : 'text-gold'} ${tone === 'bar' && key === 'spicy' ? 'text-[#FF8A80]' : ''}`} aria-hidden="true" />}
            </motion.span>
            {label}
          </motion.button>
        );
      })}
    </div>
  );
}
