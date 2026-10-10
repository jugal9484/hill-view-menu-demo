import { renderToString } from 'react-dom/server';
import { HeroRoot } from './HeroRoot';

/**
 * Pre-renders the hero at build time (scripts/inject-shell.mjs) so it paints before any
 * JavaScript loads; main.tsx then hydrates it in place.
 */
export const renderShell = () => renderToString(<HeroRoot />);
