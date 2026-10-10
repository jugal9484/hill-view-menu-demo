import type { Group } from './types';

/** The seven super-groups shown as main tabs. Order here is menu order. */
export const groups: Group[] = [
  { id: 'breakfast', title: 'Tea, Breakfast & Snacks', short: 'Breakfast & Snacks' },
  { id: 'drinks', title: 'Drinks & Shakes', short: 'Drinks & Shakes' },
  { id: 'soups', title: 'Soups & Salads', short: 'Soups & Salads' },
  { id: 'starters', title: 'Starters', short: 'Starters' },
  { id: 'mains', title: 'Main Course', short: 'Main Course' },
  { id: 'breads', title: 'Breads, Rice & Noodles', short: 'Breads & Rice' },
  { id: 'global', title: 'Global Favourites & Desserts', short: 'Global & Desserts' },
];

/**
 * All 21 sections of the printed menu, in order. Items live in menu.ts.
 * Categories without items are hidden automatically.
 */
export const categoryMeta: { id: string; title: string; group: string; blurb?: string }[] = [
  { id: 'round-o-clock', title: "Round O' Clock", group: 'breakfast', blurb: 'Served all day' },
  { id: 'south-indian', title: 'South Indian', group: 'breakfast', blurb: 'Served with sambar and chutney' },
  { id: 'beverages', title: 'Selection of Beverages', group: 'drinks' },
  { id: 'smoothies-mocktails', title: 'Smoothies & Mocktails', group: 'drinks' },
  { id: 'soups', title: 'Type of Soups', group: 'soups' },
  { id: 'saath-me', title: 'Saath Me', group: 'soups', blurb: 'Salad, papad & raita' },
  { id: 'starter-chinese', title: 'Starter Chinese', group: 'starters' },
  { id: 'tandoori-starters', title: 'Tandoori Starters', group: 'starters', blurb: 'From the clay oven' },
  { id: 'oriental-lite-bit', title: 'Oriental Lite-Bit', group: 'starters' },
  { id: 'paneer', title: 'Paneer-Ke-Shauqueen', group: 'mains' },
  { id: 'subz', title: 'Subz-Ke-Shauqueen', group: 'mains' },
  { id: 'kofta', title: 'Kofta', group: 'mains' },
  { id: 'dal-kadhi', title: 'Dal & Kadhi', group: 'mains' },
  { id: 'one-man-combo', title: 'One Man Combo', group: 'mains' },
  { id: 'tandoor-bread', title: 'Tandoor Bread', group: 'breads' },
  { id: 'rice', title: 'Rice Preparations', group: 'breads' },
  { id: 'noodles', title: 'Noodles & Chopsuey', group: 'breads' },
  { id: 'pizza', title: 'Pizza', group: 'global', blurb: '7" hand-stretched base' },
  { id: 'pasta', title: 'Pasta', group: 'global', blurb: 'Choice of penne, spaghetti, fusilli or macaroni' },
  { id: 'sizzlers', title: 'Sizzlers', group: 'global', blurb: 'Brought to your table still sizzling' },
  { id: 'dessert', title: 'Dessert', group: 'global' },
];
