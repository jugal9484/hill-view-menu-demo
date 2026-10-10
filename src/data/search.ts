import type { Item } from './types';

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]+/g, ' ');

/** Loose subsequence match so "pnr tka" still finds "Paneer Tikka". */
function subsequence(needle: string, hay: string) {
  let i = 0;
  for (const ch of hay) if (ch === needle[i]) i++;
  return i === needle.length;
}

export const tokenize = (q: string) => norm(q).split(' ').filter(Boolean);

/** Every token must appear in the name or description (substring, or fuzzy on the name). */
export function matches(item: Item, tokens: string[]) {
  if (!tokens.length) return true;
  const name = norm(item.name);
  const text = `${name} ${norm(item.desc ?? '')} ${item.variants?.map((v) => norm(v.label)).join(' ') ?? ''}`;
  return tokens.every((t) => text.includes(t) || (t.length >= 3 && name.split(' ').some((w) => subsequence(t, w))) || (t.length >= 4 && subsequence(t, name.replace(/ /g, ''))));
}

/** Split text into plain and highlighted parts for the given tokens. */
export function highlight(text: string, tokens: string[]): { text: string; hit: boolean }[] {
  if (!tokens.length) return [{ text, hit: false }];
  const lower = text.toLowerCase();
  // tokens that only matched fuzzily ("tika") highlight the whole word they matched ("Tikka")
  const fuzzyWords = tokens
    .filter((t) => t.length >= 3 && !lower.includes(t))
    .flatMap((t) => text.split(/[^A-Za-z]+/).filter((w) => w.length >= t.length && subsequence(t, w.toLowerCase())));
  const all = [...tokens, ...fuzzyWords.map((w) => w.toLowerCase())];
  tokens = all;
  const escaped = all.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'gi');
  const set = new Set(tokens);
  return text.split(re).filter(Boolean).map((part) => ({ text: part, hit: set.has(part.toLowerCase()) }));
}
