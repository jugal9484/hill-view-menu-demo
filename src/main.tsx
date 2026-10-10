import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './app/App';
import { HeroRoot } from './app/HeroRoot';
import './styles/globals.css';

// Sheets push a history entry so Back closes them; keep the page from jumping when that entry pops.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// The hero is pre-rendered into index.html by the production build; hydrate it in place.
const heroEl = document.getElementById('hero-root')!;
const hero = (
  <StrictMode>
    <HeroRoot />
  </StrictMode>
);
if (heroEl.hasChildNodes()) hydrateRoot(heroEl, hero);
else createRoot(heroEl).render(hero);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
