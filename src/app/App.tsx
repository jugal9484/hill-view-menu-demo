import { MotionConfig } from 'framer-motion';
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AppBar } from '../components/AppBar';
import { BrandStrip } from '../components/BrandStrip';
import { CategorySection } from '../components/CategorySection';
import { CategoryTabs } from '../components/CategoryTabs';
import { DesktopSidebar } from '../components/DesktopSidebar';
import { EmptyState } from '../components/EmptyState';
import { FilterChips, type Filters } from '../components/FilterChips';
import { MenuFab } from '../components/MenuFab';
import { SearchBar } from '../components/SearchBar';
import { SplashIntro } from '../components/SplashIntro';
import { groups } from '../data/categories';
import { categories } from '../data/menu';
import { matches, tokenize } from '../data/search';
import type { Item } from '../data/types';
import { useDebounced } from '../hooks/useDebounced';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useScrollSpy } from '../hooks/useScrollSpy';

// Sheets are split into their own chunk and warmed up once the page is idle.
const loadItemSheet = () => import('../components/ItemSheet');
const loadMenuSheet = () => import('../components/MenuSheet');
const loadInfoSheet = () => import('../components/InfoSheet');
const ItemSheet = lazy(loadItemSheet);
const MenuSheet = lazy(loadMenuSheet);
const InfoSheet = lazy(loadInfoSheet);

const categoryOf = new Map(categories.flatMap((c) => c.items.map((i) => [i.id, c] as const)));

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark');
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.dataset.theme = 'dark';
    else delete root.dataset.theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0A1240' : '#0F1E6B');
    try {
      if (dark) localStorage.setItem('hv-theme', 'dark');
      else localStorage.removeItem('hv-theme');
    } catch {
      /* storage unavailable: theme just won't persist */
    }
  }, [dark]);
  return [dark, () => setDark((d) => !d)] as const;
}

export default function App() {
  const isDesktop = useIsDesktop();
  const reduce = useReducedMotion();
  const [dark, toggleTheme] = useTheme();

  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({ spicy: false, chef: false });
  const debounced = useDebounced(query.trim(), 160);
  const tokens = useMemo(() => tokenize(debounced), [debounced]);

  const visible = useMemo(
    () =>
      categories
        .map((c) => ({
          ...c,
          items: c.items.filter((i) => matches(i, tokens) && (!filters.spicy || i.spicy) && (!filters.chef || i.chefSpecial)),
        }))
        .filter((c) => c.items.length > 0),
    [tokens, filters],
  );
  const visibleGroups = useMemo(() => groups.filter((g) => visible.some((c) => c.group === g.id)), [visible]);
  const resultCount = visible.reduce((n, c) => n + c.items.length, 0);
  const filtering = tokens.length > 0 || filters.spicy || filters.chef;

  // --- sticky stack height (drives scroll offsets + scroll-margin) ---
  const stackRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [stackH, setStackH] = useState(200);
  useLayoutEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const h = Math.round(el.getBoundingClientRect().height);
      setStackH(h);
      document.documentElement.style.setProperty('--stack-h', `${h}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isDesktop]);

  // --- scrollspy, with a short lock while a tap-initiated scroll is running ---
  const spy = useScrollSpy(
    visible.map((c) => c.id),
    stackH + 2,
  );
  const [lock, setLock] = useState<string | null>(null);
  const lockTimer = useRef<number>();
  const activeCat = lock ?? spy;

  const scrollToCategory = useCallback(
    (id: string) => {
      const el = document.getElementById(`cat-${id}`);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - stackH + 1;
      setLock(id);
      window.clearTimeout(lockTimer.current);
      lockTimer.current = window.setTimeout(() => setLock(null), reduce ? 80 : 900);
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
    },
    [stackH, reduce],
  );

  // jump back to the top of the list when results change under the guest
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const main = mainRef.current;
    if (main && window.scrollY > main.offsetTop) window.scrollTo({ top: main.offsetTop, behavior: 'auto' });
  }, [tokens, filters]);

  // --- sheets ---
  const [openItem, setOpenItem] = useState<Item | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [mounted, setMounted] = useState({ item: false, menu: false, info: false });
  const openItemSheet = useCallback((item: Item) => {
    setMounted((m) => ({ ...m, item: true }));
    setOpenItem(item);
  }, []);
  const closeItem = useCallback(() => setOpenItem(null), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeInfo = useCallback(() => setInfoOpen(false), []);

  useEffect(() => {
    const warm = () => {
      loadItemSheet();
      loadMenuSheet();
      loadInfoSheet();
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const t = window.setTimeout(() => (w.requestIdleCallback ? w.requestIdleCallback(warm) : warm()), 2500);
    return () => clearTimeout(t);
  }, []);

  // The Menu button is always available, stepping aside only while the guest scrolls down or a sheet is open.
  const scrollDir = useScrollDirection();
  const fabHidden = scrollDir === 'down' || menuOpen || !!openItem || infoOpen;

  const resetAll = () => {
    setQuery('');
    setFilters({ spicy: false, chef: false });
  };

  const seenGroups = new Set<string>();

  return (
    <MotionConfig reducedMotion="user">
      <SplashIntro />
      <div className="min-h-[100dvh]">
        <div className="mx-auto max-w-[1200px] py-4 lg:px-8 lg:py-6">
          <BrandStrip />
        </div>

        <main ref={mainRef} id="menu" aria-label="Menu">
          <div ref={stackRef} className="sticky top-0 z-30 shadow-[0_8px_24px_-18px_rgb(15_30_107/0.45)]">
            <AppBar dark={dark} onToggleTheme={toggleTheme} onOpenInfo={() => (setMounted((m) => ({ ...m, info: true })), setInfoOpen(true))}>
              {isDesktop && (
                <>
                  <SearchBar value={query} onChange={setQuery} tone="bar" className="max-w-[420px] flex-1" />
                  <FilterChips value={filters} onChange={setFilters} tone="bar" />
                </>
              )}
            </AppBar>
            {!isDesktop && (
              <>
                <div className="bg-card/95 px-3 pt-2.5 backdrop-blur-md md:px-5">
                  <SearchBar value={query} onChange={setQuery} />
                </div>
                <CategoryTabs
                  groups={visibleGroups}
                  categories={visible}
                  activeCat={activeCat}
                  onSelect={scrollToCategory}
                  leading={<FilterChips value={filters} onChange={setFilters} />}
                />
              </>
            )}
          </div>

          <div className="mx-auto max-w-[1200px] pb-28 lg:grid lg:grid-cols-[248px_minmax(0,1fr)] lg:gap-10 lg:px-8 lg:pb-20">
            {isDesktop && (
              <aside className="sticky self-start pt-6" style={{ top: stackH }}>
                <DesktopSidebar groups={visibleGroups} categories={visible} activeCat={activeCat} onSelect={scrollToCategory} />
              </aside>
            )}
            <div className="min-w-0 lg:pt-1">
              <p aria-live="polite" className={filtering ? 'px-4 pt-4 text-[13px] font-medium text-muted md:px-6 lg:px-0' : 'sr-only'}>
                {filtering && resultCount > 0 ? `${resultCount} ${resultCount === 1 ? 'dish' : 'dishes'} found` : ''}
              </p>
              {visible.length === 0 ? (
                <EmptyState query={debounced} onReset={resetAll} />
              ) : (
                <div className="flex flex-col gap-2 lg:gap-4">
                  {visible.map((c) => {
                    const first = !seenGroups.has(c.group);
                    seenGroups.add(c.group);
                    return (
                      <CategorySection
                        key={c.id}
                        category={c}
                        tokens={tokens}
                        onOpen={openItemSheet}
                        groupTitle={first ? groups.find((g) => g.id === c.group)?.title : undefined}
                      />
                    );
                  })}
                  <p className="px-4 pt-6 text-center text-[12.5px] text-muted md:px-6">
                    All prices in ₹. Taxes extra as per Govt. rules. Please tell your waiter what you’d like.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <MenuFab hidden={fabHidden} onClick={() => (setMounted((m) => ({ ...m, menu: true })), setMenuOpen(true))} />

      <Suspense fallback={null}>
        {mounted.item && (
          <ItemSheet
            item={openItem}
            categoryTitle={openItem ? categoryOf.get(openItem.id)?.title : undefined}
            fallbackSrc={openItem ? categoryOf.get(openItem.id)?.items[0]?.image : undefined}
            onClose={closeItem}
          />
        )}
        {mounted.menu && (
          <MenuSheet
            open={menuOpen}
            groups={visibleGroups}
            categories={visible}
            activeCat={activeCat}
            onClose={closeMenu}
            onSelect={(id) => {
              setMenuOpen(false);
              window.setTimeout(() => scrollToCategory(id), 90);
            }}
          />
        )}
        {mounted.info && <InfoSheet open={infoOpen} onClose={closeInfo} />}
      </Suspense>
    </MotionConfig>
  );
}
