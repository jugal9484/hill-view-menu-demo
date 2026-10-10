# Hill View Restaurant — digital menu

View-only menu for Hill View Restaurant, Hill View Resort, Bhuj. Guests open it from a QR code and tell the waiter what they'd like.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/ (pre-renders the hero into index.html)
npm run preview   # serve the production build
npm run images    # re-download placeholder photos listed in scripts/photo-sources.json
npm run thumbs    # rebuild 240px row thumbnails after replacing photos
```

## Editing the menu

- **Dishes:** `src/data/menu.ts`. Paste an item object into the right category list. Prices are in ₹, taxes extra.
- **Sections and groups:** `src/data/categories.ts`. Sections with no items are hidden automatically.
- **Photos:** drop a 600×600 WebP at `public/menu/<item-id>.webp` and run `npm run thumbs`. To point an item at a different file, add a line to `imageOverrides` in `src/data/images.ts`. If a photo is missing, the row falls back to the section's first photo, then to a branded placeholder.
- **Logo:** `src/components/Logo.tsx` is a placeholder (mountain line and wordmark). Swap in the real logo there.

The placeholder photos are free-licensed Unsplash images matched to each dish type. Replace them with real dish photos before going live.
