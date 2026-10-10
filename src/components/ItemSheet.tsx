import { Leaf } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Item } from '../data/types';
import { ChefBadge, SpicyBadge } from './Badge';
import { BottomSheet } from './BottomSheet';
import { DishImage } from './DishImage';
import { Prices } from './ItemRow';
import { VegMark } from './VegMark';

type Props = { item: Item | null; categoryTitle?: string; fallbackSrc?: string; onClose: () => void };

/** View-only dish detail. Nothing here takes an action — guests tell the waiter. */
export default function ItemSheet({ item, categoryTitle, fallbackSrc, onClose }: Props) {
  // keep showing the last item while the sheet animates out
  const [shown, setShown] = useState<Item | null>(item);
  useEffect(() => {
    if (item) setShown(item);
  }, [item]);

  return (
    <BottomSheet open={!!item} onClose={onClose} label={shown?.name ?? 'Dish details'} maxHeight="92dvh">
      {(startDrag) =>
        shown && (
          <>
            <div onPointerDown={startDrag} className="relative shrink-0 touch-none">
              <DishImage
                key={shown.id}
                itemId={shown.id}
                src={shown.image}
                fallbackSrc={fallbackSrc}
                alt={shown.name}
                size={600}
                eager
                className="max-h-[46dvh] w-full md:max-h-[340px]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
            </div>
            <div className="overflow-y-auto overscroll-contain px-5 pb-safe pt-1 md:px-7 md:pb-7">
              {categoryTitle && <p className="text-[12.5px] font-medium text-muted">{categoryTitle}</p>}
              <h2 className="mt-1 font-serif text-[30px] font-semibold leading-[1.1] text-ink">{shown.name}</h2>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-veg/10 px-2 py-[3px] text-[12px] font-semibold text-veg dark:text-[#5FD38D]">
                  <VegMark className="h-3.5 w-3.5" /> Pure veg
                </span>
                {shown.chefSpecial && <ChefBadge />}
                {shown.spicy && <SpicyBadge />}
                {shown.portion && (
                  <span className="rounded-full border border-hairline px-2 py-[3px] text-[12px] font-medium text-muted">{shown.portion}</span>
                )}
              </div>
              <div className="mt-4">
                <Prices item={shown} size="sheet" />
              </div>
              {shown.desc && <p className="mt-4 text-[15px] leading-relaxed text-ink/85">{shown.desc}</p>}
              <p className="mt-5 flex items-start gap-2 rounded-2xl bg-page px-4 py-3 text-[13px] leading-relaxed text-muted">
                <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                Jain preparation available. Tell your waiter the dish name and your preference.
              </p>
              <p className="mt-3 text-[12px] text-muted">Prices in ₹. Taxes extra as per Govt. rules.</p>
            </div>
          </>
        )
      }
    </BottomSheet>
  );
}
