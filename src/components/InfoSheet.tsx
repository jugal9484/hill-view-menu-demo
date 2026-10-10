import { CircleDollarSign, Clock, Leaf, RefreshCcw, Sun, XCircle } from 'lucide-react';
import { BottomSheet } from './BottomSheet';

const notes = [
  { Icon: CircleDollarSign, text: 'All taxes applicable extra as per Govt. rule.' },
  { Icon: XCircle, text: 'Order once placed will not be cancelled.' },
  { Icon: Clock, text: 'Minimum 20 minutes for table and 30 minutes for room after the order is placed.' },
  { Icon: Sun, text: 'Gujarati Thali is served at noon hours only.' },
  { Icon: Leaf, text: 'Jain food available in all items.' },
  { Icon: RefreshCcw, text: 'Prices may change without prior notice.' },
];

export default function InfoSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <BottomSheet open={open} onClose={onClose} label="Good to know" maxHeight="80dvh">
      {(startDrag) => (
        <>
          <div onPointerDown={startDrag} className="shrink-0 touch-none px-5 pb-1 pt-6 md:px-7">
            <h2 className="font-serif text-[28px] font-semibold leading-none">Good to know</h2>
            <p className="mt-2 text-[13px] text-muted">From the kitchen at Hill View Restaurant</p>
          </div>
          <ul className="overflow-y-auto overscroll-contain px-5 pb-safe pt-3 md:px-7 md:pb-7">
            {notes.map(({ Icon, text }) => (
              <li key={text} className="flex items-start gap-3 border-t border-dashed border-hairline py-3.5 first:border-t-0">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <span className="pt-2 text-[14.5px] leading-snug text-ink">{text}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </BottomSheet>
  );
}
