import { AnimatePresence, motion, useDragControls, type PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useReducedMotion } from '../hooks/useReducedMotion';

type Props = {
  open: boolean;
  onClose: () => void;
  label: string;
  children: (startDrag: (e: PointerEvent) => void) => ReactNode;
  /** max sheet height on phones */
  maxHeight?: string;
};

let openSheets = 0;
let pendingBack: number | null = null;

/** Lock page scroll while any sheet is open. */
function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    openSheets++;
    const { body, documentElement: html } = document;
    const gap = window.innerWidth - html.clientWidth;
    // only the root element: hiding body overflow would break the sticky header behind the sheet
    html.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      openSheets--;
      if (openSheets === 0) {
        html.style.overflow = '';
        body.style.paddingRight = '';
      }
    };
  }, [active]);
}

/** Android/browser Back closes the sheet instead of leaving the page. */
function useBackToClose(active: boolean, onClose: () => void) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!active) return;
    let poppedByBack = false;
    // An immediate re-open (or React's dev double-mount) reuses the entry instead of popping and re-pushing.
    if (pendingBack !== null) {
      clearTimeout(pendingBack);
      pendingBack = null;
    } else {
      history.pushState({ hvSheet: true }, '');
    }
    const onPop = () => {
      poppedByBack = true;
      closeRef.current();
    };
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      if (poppedByBack) return;
      pendingBack = window.setTimeout(() => {
        pendingBack = null;
        if (history.state?.hvSheet) history.back();
      }, 0);
    };
  }, [active]);
}

function useFocusTrap(active: boolean, panel: React.RefObject<HTMLDivElement>, onClose: () => void) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!active) return;
    const previous = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => panel.current?.focus({ preventScroll: true }), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;
      const nodes = panel.current.querySelectorAll<HTMLElement>('button, [href], input, [tabindex]:not([tabindex="-1"])');
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      previous?.focus?.({ preventScroll: true });
    };
  }, [active, panel]);
}

export function BottomSheet({ open, onClose, label, children, maxHeight = '88dvh' }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const controls = useDragControls();
  const reduce = useReducedMotion();
  const wide = useMediaQuery('(min-width: 768px)');

  useScrollLock(open);
  useBackToClose(open, onClose);
  useFocusTrap(open, panel, onClose);

  const startDrag = (e: PointerEvent) => {
    if (!wide) controls.start(e);
  };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 110 || info.velocity.y > 600) onClose();
  };

  const variants = wide
    ? { hidden: { opacity: 0, scale: 0.96, y: 12 }, shown: { opacity: 1, scale: 1, y: 0 } }
    : reduce
      ? { hidden: { opacity: 0 }, shown: { opacity: 1 } }
      : { hidden: { y: '100%' }, shown: { y: 0 } };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6">
          <motion.div
            className="absolute inset-0 touch-none bg-royal-950/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            variants={variants}
            initial="hidden"
            animate="shown"
            exit="hidden"
            transition={reduce ? { duration: 0.2 } : { type: 'spring', stiffness: 380, damping: 36, mass: 0.9 }}
            drag={wide ? false : 'y'}
            dragControls={controls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            onDragEnd={onDragEnd}
            style={{ maxHeight: wide ? '86dvh' : maxHeight }}
            className="relative flex w-full flex-col overflow-hidden rounded-t-sheet bg-card text-ink shadow-sheet outline-none md:max-w-[560px] md:rounded-sheet"
          >
            <div
              onPointerDown={startDrag}
              className="absolute inset-x-0 top-0 z-20 flex h-6 cursor-grab touch-none justify-center pt-2 md:hidden"
              aria-hidden="true"
            >
              <span className="h-1.5 w-10 rounded-full bg-hairline shadow-[0_0_0_1px_rgb(255_255_255/0.4)]" />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 grid h-11 w-11 place-items-center rounded-full bg-card/90 text-ink shadow-card backdrop-blur"
            >
              <X className="h-5 w-5" />
            </button>
            {children(startDrag)}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
