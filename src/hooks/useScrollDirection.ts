import { useEffect, useState } from 'react';

/** 'down' while the guest scrolls down the page, 'up' otherwise. */
export function useScrollDirection(threshold = 8) {
  const [dir, setDir] = useState<'up' | 'down'>('up');
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < threshold) return;
      setDir(y > last && y > 120 ? 'down' : 'up');
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return dir;
}
