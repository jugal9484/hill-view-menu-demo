import { ChefHat, Flame } from 'lucide-react';

export function ChefBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-[3px] text-[12px] font-semibold leading-none text-[#7A5A1E] dark:text-gold-soft">
      <ChefHat className="h-3.5 w-3.5" aria-hidden="true" />
      {compact ? 'Chef’s pick' : 'Chef’s Special'}
    </span>
  );
}

export function SpicyBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-spicy/10 px-2 py-[3px] text-[12px] font-semibold leading-none text-[#B3261E] dark:bg-spicy/20 dark:text-[#FF9C93]">
      <Flame className="h-3.5 w-3.5" aria-hidden="true" />
      Spicy
    </span>
  );
}
