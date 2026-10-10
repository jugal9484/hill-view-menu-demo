export type Variant = { label: string; price: number };

export type Item = {
  id: string;
  name: string;
  desc?: string;
  /** e.g. "320 g", "8 pcs", "250 ml" */
  portion?: string;
  price?: number;
  variants?: Variant[];
  spicy?: boolean;
  chefSpecial?: boolean;
  /** public path, e.g. /menu/<id>.webp — resolved through data/images.ts */
  image: string;
};

export type Category = {
  id: string;
  title: string;
  /** id of the super-group this category belongs to */
  group: string;
  blurb?: string;
  items: Item[];
};

export type Group = { id: string; title: string; short: string };
