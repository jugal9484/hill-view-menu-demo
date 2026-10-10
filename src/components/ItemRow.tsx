import { motion } from 'framer-motion';
import { memo } from 'react';
import { formatPrice } from '../data/menu';
import { highlight } from '../data/search';
import type { Item } from '../data/types';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ChefBadge, SpicyBadge } from './Badge';
import { DishImage } from './DishImage';
import { VegMark } from './VegMark';

export function Highlighted({ text, tokens }: { text: string; tokens: string[] }) {
  return (
    <>
      {highlight(text, tokens).map((p, i) =>
        p.hit ? (
          <mark key={i} className="hl">
            {p.text}
          </mark>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  );
}

export function Prices({ item, size = 'row' }: { item: Item; size?: 'row' | 'sheet' }) {
  if (item.variants?.length) {
    return (
      <ul className="flex flex-wrap gap-1.5" aria-label="Prices">
        {item.variants.map((v) => (
          <li
            key={v.label}
            className={`inline-flex items-baseline gap-1.5 rounded-full border border-hairline bg-page leading-none ${size === 'sheet' ? 'px-3.5 py-2 text-[14px]' : 'px-2.5 py-1.5 text-[12.5px]'}`}
          >
            <span className="text-muted">{v.label}</span>
            <span className="tabular font-semibold text-ink">{formatPrice(v.price)}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (item.price == null) return null;
  return <p className={`tabular font-semibold text-ink ${size === 'sheet' ? 'text-xl' : 'text-[15px]'}`}>{formatPrice(item.price)}</p>;
}

type Props = {
  item: Item;
  index: number;
  tokens: string[];
  fallbackSrc?: string;
  onOpen: (item: Item) => void;
};

function ItemRowBase({ item, index, tokens, fallbackSrc, onOpen }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      layout={reduce ? false : 'position'}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.32, ease: 'easeOut', delay: reduce ? 0 : (index % 4) * 0.04 }}
      className="group relative border-t border-dashed border-hairline first:border-t-0 xl:border-t-0 xl:rounded-card xl:bg-card xl:shadow-card xl:transition-shadow xl:hover:shadow-lift"
    >
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="flex w-full items-start gap-4 py-5 text-left xl:h-full xl:px-4 xl:py-4"
        aria-haspopup="dialog"
      >
        <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="flex flex-wrap items-center gap-1.5">
            <VegMark />
            {item.chefSpecial && <ChefBadge />}
            {item.spicy && <SpicyBadge />}
          </span>
          <span className="line-clamp-2 text-[15.5px] font-semibold leading-snug text-ink">
            <Highlighted text={item.name} tokens={tokens} />
          </span>
          <Prices item={item} />
          {item.desc && (
            <span className="line-clamp-2 text-[13px] leading-relaxed text-muted">
              <Highlighted text={item.desc} tokens={tokens} />
            </span>
          )}
          {item.portion && <span className="text-[12px] font-medium text-muted">{item.portion}</span>}
        </span>
        <span className="relative shrink-0">
          <DishImage
            itemId={item.id}
            src={item.image}
            fallbackSrc={fallbackSrc}
            alt={item.name}
            size={136}
            sizes="(min-width: 1280px) 136px, 112px"
            className="h-28 w-28 rounded-2xl shadow-card transition-transform duration-300 group-hover:scale-[1.04] group-active:scale-[1.04] xl:h-[136px] xl:w-[136px]"
          />
        </span>
      </button>
    </motion.li>
  );
}

export const ItemRow = memo(ItemRowBase);
