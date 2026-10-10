import { useEffect, useState } from 'react';

/**
 * Pass `initial` when the component is pre-rendered and hydrated, so the first client
 * render matches the server markup; the real value is applied right after.
 */
export function useMediaQuery(query: string, initial?: boolean) {
  const [matches, setMatches] = useState(() =>
    initial !== undefined || typeof window === 'undefined' ? (initial ?? false) : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export const useIsDesktop = (initial?: boolean) => useMediaQuery('(min-width: 1024px)', initial);
