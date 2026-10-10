import { useEffect, useState } from 'react';

/**
 * 'down' only while the guest is actively scrolling down the page. It returns to 'up'
 * on any upward scroll, or once scrolling has paused for `idleMs`, so anything hidden
 * on scroll-down never stays hidden after the guest stops.
 */
export function useScrollDirection(threshold = 8, idleMs = 450) {
  const [dir, setDir] = useState<'up' | 'down'>('up');
  useEffect(() => {
    let last = window.scrollY;
    let idle = 0;
    const onScroll = () => {
      window.clearTimeout(idle);
      idle = window.setTimeout(() => setDir('up'), idleMs);
      const y = window.scrollY;
      if (Math.abs(y - last) < threshold) return;
      setDir(y > last ? 'down' : 'up');
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(idle);
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold, idleMs]);
  return dir;
}
