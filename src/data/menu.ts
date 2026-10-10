import { categoryMeta } from './categories';
import { itemImage } from './images';
import type { Category, Item } from './types';

/** Item without `image` — the photo path is filled in from images.ts. */
type Seed = Omit<Item, 'image'>;

/**
 * Menu items keyed by category id. To add a dish, paste an object into the
 * right list and drop its photo at /public/menu/<id>.webp. All prices in ₹, taxes extra.
 */
const seed: Record<string, Seed[]> = {
  'round-o-clock': [
    { id: 'masala-tea', name: 'Masala Tea', price: 75, portion: '300 ml', desc: 'Strong Assam leaf brewed with milk, fresh ginger, cardamom and our house chai masala.' },
    { id: 'hot-coffee', name: 'Hot Coffee', price: 90, desc: 'Frothy milk coffee, made the way Gujarat likes it — sweet and comforting.' },
    { id: 'fresh-seasonal-juice', name: 'Fresh Seasonal Juice', price: 160, desc: 'Pressed to order from the best fruit of the season. Ask your server what’s fresh today.' },
    { id: 'aloo-paratha', name: 'Aloo Paratha with Curd', variants: [{ label: '1 pc', price: 170 }, { label: '2 pcs', price: 260 }], desc: 'Whole-wheat paratha stuffed with spiced potato, finished with white butter. Served with curd and pickle.' },
    { id: 'puri-bhaji', name: 'Puri Bhaji', price: 260, portion: '4 pcs', desc: 'Puffed golden puris with a mildly spiced potato bhaji.' },
    { id: 'chhole-bhature', name: 'Chhole Bhature', price: 280, portion: '2 pcs', desc: 'Punjabi-style chickpeas slow-cooked with whole spices, with two fluffy bhature, onion and pickle.' },
    { id: 'veg-grill-sandwich', name: 'Veg Grill Sandwich', price: 199, portion: '4 pcs', desc: 'Layers of potato, cucumber, tomato and capsicum with green chutney, grilled crisp.' },
    { id: 'cheese-garlic-bread', name: 'Cheese Garlic Bread', price: 240, portion: '8 pcs', desc: 'Toasted bread with garlic butter, herbs and a generous layer of melted cheese.' },
    { id: 'french-fry', name: 'French Fry', price: 190, portion: '250 g', desc: 'Crisp, golden and lightly salted. Peri-peri seasoning on request.' },
    { id: 'poha', name: 'Poha', price: 190, portion: '300 g', desc: 'Flattened rice tempered with mustard seeds, curry leaves and peanuts, topped with sev and lemon.' },
  ],
  'south-indian': [
    { id: 'dosa', name: 'Dosa', portion: '17"', variants: [{ label: 'Plain', price: 220 }, { label: 'Masala', price: 240 }], desc: 'Thin, crisp rice-and-lentil crêpe. Masala comes filled with tempered potato.' },
    { id: 'cheese-paneer-dosa', name: 'Cheese / Paneer Dosa', price: 290, portion: '17"', desc: 'Crisp dosa loaded with grated cheese or crumbled paneer and spiced potato.' },
    { id: 'mysore-dosa', name: 'Mysore Dosa', portion: '17"', variants: [{ label: 'Plain', price: 225 }, { label: 'Masala', price: 275 }], desc: 'Dosa spread with fiery red Mysore chutney before it’s folded.' },
    { id: 'paper-dosa', name: 'Paper Dosa', variants: [{ label: 'Plain', price: 260 }, { label: 'Masala', price: 280 }], desc: 'Extra-long and paper-thin, roasted until it shatters.' },
    { id: 'special-dosa', name: 'Special Dosa', price: 299, portion: '17"', chefSpecial: true, desc: 'Our kitchen’s own dosa — butter-roasted with cheese, paneer, vegetables and a spicy masala filling.' },
    { id: 'uttapam', name: 'Uttapam', price: 240, desc: 'Thick, soft rice pancake topped with onion, tomato, capsicum and coriander.' },
    { id: 'idli-sambar', name: 'Idli Sambar', price: 220, portion: '3 pcs', desc: 'Steamed rice cakes, soft as clouds, with hot sambar and coconut chutney.' },
  ],
  beverages: [
    { id: 'shakes', name: 'Shakes', price: 250, desc: 'Thick and chilled. Choose vanilla, chocolate, strawberry, banana or mango.' },
    { id: 'lassi', name: 'Lassi', price: 155, desc: 'Churned fresh curd, sweet or salted.' },
    { id: 'flavoured-lassi', name: 'Flavoured Lassi', price: 175, desc: 'Rich lassi blended with fruit — mango is the house favourite.' },
    { id: 'cold-coffee', name: 'Cold Coffee', price: 220, desc: 'Creamy blended coffee over ice.' },
    { id: 'ice-mint-tea', name: 'Ice Mint Tea', price: 175, desc: 'Chilled black tea with fresh mint and a squeeze of lemon.' },
    { id: 'buttermilk', name: 'Buttermilk', variants: [{ label: 'Plain', price: 70 }, { label: 'Masala', price: 80 }], desc: 'Gujarati chaas, light and cooling. Masala adds roasted cumin, ginger and coriander.' },
    { id: 'jal-jeera', name: 'Jal Jeera', variants: [{ label: 'Regular', price: 70 }, { label: 'With soda', price: 90 }], desc: 'Tangy cumin-and-mint cooler with black salt.' },
    { id: 'fresh-lime-soda', name: 'Fresh Lime Soda', price: 110, desc: 'Sweet, salted or mixed — your choice.' },
  ],
  'smoothies-mocktails': [
    { id: 'caramel-banana-blast', name: 'Caramel Banana Blast', price: 250, desc: 'Ripe banana, caramel and vanilla ice cream blended thick.' },
    { id: 'bounty-shake', name: 'Bounty Shake', price: 260, desc: 'Chocolate and coconut, like the bar — topped with chocolate sauce.' },
    { id: 'biscoff-shake', name: 'Brown Butter Biscoff Shake', price: 260, chefSpecial: true, desc: 'Biscoff spread, brown butter and crushed biscuits with ice cream.' },
    { id: 'litchi-rainbow-soda', name: 'Litchi Rainbow Soda', price: 230, desc: 'Litchi, layered fruit syrups and sparkling soda.' },
    { id: 'jamun-mint-fizz', name: 'Jamun Mint Fizz', price: 260, desc: 'Tart Indian jamun with mint and soda.' },
    { id: 'blue-boyo', name: 'Blue Boyo', price: 220, desc: 'Blue curaçao syrup, lemon and lemonade over crushed ice.' },
    { id: 'hibiscus-passion', name: 'Hibiscus Passion', price: 240, desc: 'Hibiscus tea and passion fruit, lightly sweet and floral.' },
    { id: 'pina-colada', name: 'Pina Colada', price: 230, desc: 'Pineapple and coconut cream, non-alcoholic.' },
    { id: 'mojito', name: 'Mojito', price: 210, desc: 'Muddled mint and lime topped with soda.' },
    { id: 'red-honey-lemon-soda', name: 'Red Honey Lemon Soda', price: 220, desc: 'Honey, lemon and a red berry syrup with sparkling soda.' },
  ],
  soups: [
    { id: 'cream-of-tomato', name: 'Cream of Tomato', price: 180, desc: 'Velvety tomato soup with a swirl of cream and crunchy croutons.' },
    { id: 'hot-and-sour', name: 'Hot & Sour', price: 220, spicy: true, desc: 'Peppery, tangy Indo-Chinese soup with vegetables and chilli vinegar.' },
    { id: 'manchow', name: 'Manchow', price: 220, desc: 'Garlicky vegetable soup topped with crispy fried noodles.' },
    { id: 'veg-sweet-corn', name: 'Veg Sweet Corn', price: 220, desc: 'Mild, comforting soup of sweet corn and finely chopped vegetables.' },
    { id: 'himalayan-thukpa', name: 'Himalayan Thukpa', price: 230, desc: 'Tibetan noodle soup with vegetables in a fragrant, gingery broth.' },
    { id: 'tamatar-ka-shorba', name: 'Tamatar-ka-Shorba', price: 220, desc: 'Thin Indian tomato broth spiced with cumin and fresh coriander.' },
  ],
  'starter-chinese': [
    { id: 'paneer-chilly', name: 'Paneer Chilly', spicy: true, variants: [{ label: 'Dry', price: 320 }, { label: 'Gravy', price: 340 }], desc: 'Paneer, peppers and onion tossed in a hot soy-chilli sauce.' },
    { id: 'veg-manchurian', name: 'Veg Manchurian', variants: [{ label: 'Dry', price: 299 }, { label: 'Gravy', price: 310 }], desc: 'Crisp vegetable dumplings in a garlicky Manchurian sauce.' },
    { id: 'paneer-bang-bang', name: 'Paneer Bang Bang', price: 330, spicy: true, desc: 'Crunchy paneer tossed in a creamy, sweet-chilli bang bang sauce.' },
    { id: 'corn-salt-pepper', name: 'American Corn Salt & Pepper', price: 340, desc: 'Crisp-fried sweet corn with spring onion, garlic and cracked pepper.' },
    { id: 'potato-honey-chilly', name: 'Potato Honey Chilly', price: 290, desc: 'Crisp potato fingers glazed with honey, chilli and sesame.' },
    { id: 'veg-spring-roll', name: 'Veg Spring Roll', price: 290, portion: '8 pcs', desc: 'Golden rolls filled with stir-fried vegetables and noodles.' },
  ],
  'tandoori-starters': [
    { id: 'hara-bhara-kebab', name: 'Hara Bhara Kebab', price: 299, desc: 'Spinach, green peas and potato patties with mint chutney.' },
    { id: 'dahi-ke-sole', name: 'Dahi Ke Sole', price: 320, desc: 'Crisp bread parcels with a cool hung-curd and vegetable filling.' },
    { id: 'paneer-tikka', name: 'Paneer Tikka', price: 340, desc: 'Paneer, onion and capsicum marinated in spiced yoghurt and charred in the tandoor.' },
    { id: 'paneer-malai-tikka', name: 'Paneer Malai Tikka', price: 360, desc: 'Paneer in a mild cream, cheese and cardamom marinade.' },
    { id: 'afghani-soya-chaap', name: 'Afghani Soya Chaap', price: 340, desc: 'Soya chaap in a rich, creamy Afghani marinade, roasted until smoky.' },
    { id: 'mushroom-duplex', name: 'Mushroom Duplex Smokey', price: 360, desc: 'Stuffed mushrooms, tandoor-roasted and finished with a smoky glaze.' },
    { id: 'tandoori-platter', name: 'Tandoori Platter', price: 599, portion: '24 pcs', chefSpecial: true, desc: 'A sharing platter of our tandoori starters — paneer tikka, malai tikka, hara bhara kebab, soya chaap and mushroom.' },
  ],
  paneer: [
    { id: 'paneer-butter-masala', name: 'Paneer Butter Masala', price: 340, desc: 'Soft paneer in a smooth, buttery tomato and cashew gravy.' },
    { id: 'paneer-tikka-masala', name: 'Paneer Tikka Masala', price: 350, desc: 'Charred paneer tikka simmered in a spiced onion-tomato masala.' },
    { id: 'paneer-toofani', name: 'Paneer Toofani', price: 375, spicy: true, desc: 'A stormy, fiery gravy for those who like it hot.' },
    { id: 'paneer-kadhai', name: 'Paneer Kadhai Masala', price: 345, desc: 'Paneer and peppers with freshly pounded kadhai spices.' },
    { id: 'sahi-paneer', name: 'Sahi Paneer', price: 360, desc: 'Royal Mughlai gravy of cashew, cream and saffron.' },
    { id: 'paneer-anjeer', name: 'Paneer Anjeer', price: 360, desc: 'Paneer in a mildly sweet gravy of figs and dry fruits.' },
    { id: 'paneer-palak', name: 'Paneer Palak', price: 310, desc: 'Paneer cubes in a garlicky purée of fresh spinach.' },
    { id: 'paneer-long-latika', name: 'Paneer Long Latika', price: 380, chefSpecial: true, desc: 'Our signature: paneer parcels sealed with a clove, in a rich, aromatic gravy.' },
  ],
  'dal-kadhi': [
    { id: 'dal-makhani', name: 'Dal Makhani', price: 260, desc: 'Black lentils slow-cooked overnight with butter and cream.' },
    { id: 'dal-tadke-wali', name: 'Dal Tadke Wali', price: 240, desc: 'Yellow dal with a sizzling tempering of ghee, garlic and red chilli.' },
    { id: 'dal-fry', name: 'Dal Fry', price: 220, desc: 'Everyday-comfort toor dal cooked with onion and tomato.' },
    { id: 'dal-baluchi', name: 'Dal Baluchi', price: 240, desc: 'Mixed lentils in a thick, smoky Baluchi-style masala.' },
    { id: 'punjabi-kadhi', name: 'Punjabi Kadhi', variants: [{ label: 'Plain', price: 220 }, { label: 'Pakoda', price: 240 }], desc: 'Tangy curd and besan curry, with or without onion pakodas.' },
  ],
  'tandoor-bread': [
    { id: 'tandoor-roti', name: 'Tandoor Roti', variants: [{ label: 'Plain', price: 45 }, { label: 'Butter', price: 50 }], desc: 'Whole-wheat roti baked on the walls of the clay oven.' },
    { id: 'butter-naan', name: 'Butter Naan', price: 95, desc: 'Soft, blistered naan brushed with butter.' },
    { id: 'cheese-naan', name: 'Cheese Naan', variants: [{ label: 'Chilly', price: 170 }, { label: 'Garlic', price: 180 }], desc: 'Naan stuffed with molten cheese, with green chilli or garlic.' },
    { id: 'rumali-roti', name: 'Rumali Roti', price: 160, desc: 'Handkerchief-thin roti, folded soft.' },
    { id: 'bread-basket', name: 'Bread Basket', price: 460, desc: 'An assortment of our tandoor breads for the table.' },
  ],
  rice: [
    { id: 'veg-biryani', name: 'Veg Biryani', price: 320, desc: 'Basmati layered with vegetables, saffron and whole spices. Served with raita.' },
    { id: 'veg-hyderabadi-biryani', name: 'Veg Hyderabadi Biryani', price: 330, desc: 'Dum-cooked biryani with mint, fried onion and a spicier Hyderabadi masala.' },
    { id: 'jeera-rice', name: 'Jeera Rice', price: 210, desc: 'Basmati tempered with cumin and ghee.' },
    { id: 'dal-khichdi', name: 'Dal Khichdi', variants: [{ label: 'Plain', price: 240 }, { label: 'Masala', price: 250 }], desc: 'Rice and moong dal cooked soft — Gujarat’s favourite comfort food.' },
  ],
  noodles: [
    { id: 'veg-hakka-noodles', name: 'Veg Hakka Noodles', price: 290, desc: 'Wok-tossed noodles with crunchy vegetables and soy.' },
    { id: 'veg-schezwan-noodles', name: 'Veg Schezwan Noodles', price: 299, spicy: true, desc: 'Noodles tossed in fiery Schezwan sauce.' },
  ],
  pizza: [
    { id: 'margherita-pizza', name: 'Margherita Classic Pizza', price: 285, portion: '7"', desc: 'Tomato sauce, mozzarella and basil. Simple and classic.' },
    { id: 'mexican-pizza', name: 'Mexican Pizza', price: 299, portion: '7"', desc: 'Peppers, onion, sweet corn, jalapeños and a smoky salsa base.' },
    { id: 'barbeque-pizza', name: 'Barbeque Pizza', price: 310, portion: '7"', desc: 'Barbecue-glazed paneer, onion and capsicum with mozzarella.' },
  ],
  pasta: [
    { id: 'pasta-cheese', name: 'Cheese Pasta', price: 330, desc: 'Creamy cheese sauce with herbs and cracked pepper.' },
    { id: 'pasta-arrabbiata', name: 'Arrabbiata Pasta', price: 330, desc: 'Spicy tomato sauce with garlic, chilli flakes and basil.' },
    { id: 'pasta-pesto', name: 'Pesto Pasta', price: 360, desc: 'Fresh basil pesto with parmesan and olive oil.' },
    { id: 'pasta-spinach-alfredo', name: 'Spinach Alfredo Pasta', price: 340, desc: 'Silky white sauce with sautéed spinach and garlic.' },
  ],
  sizzlers: [
    { id: 'mexican-sizzler', name: 'Mexican Sizzler', price: 499, desc: 'Mexican rice, beans, grilled vegetables and cheese on a hot iron plate.' },
    { id: 'paneer-shashlik-sizzler', name: 'Paneer Shashlik Sizzler', price: 490, desc: 'Paneer shashlik skewers with rice, vegetables and a tangy sauce.' },
    { id: 'chef-special-sizzler', name: 'Chef Special Sizzler', price: 510, chefSpecial: true, desc: 'The kitchen’s pick of the day, plated sizzling. Ask your server what’s on it.' },
  ],
  dessert: [
    { id: 'sizzling-brownie', name: 'Sizzling Brownie with Ice Cream', price: 290, desc: 'Warm chocolate brownie on a hot plate, vanilla ice cream and hot chocolate sauce poured at the table.' },
    { id: 'fudge-brownie', name: 'Fudge Brownie with Ice Cream', price: 250, desc: 'Dense, fudgy brownie with a scoop of vanilla.' },
    { id: 'gulab-jamun', name: 'Gulab Jamun', price: 130, portion: '3 pcs', desc: 'Warm milk dumplings soaked in cardamom syrup.' },
    { id: 'ice-cream', name: 'Ice Cream', price: 140, desc: 'Two scoops. Ask for today’s flavours.' },
  ],
};

export const categories: Category[] = categoryMeta.map((c) => ({
  ...c,
  items: (seed[c.id] ?? []).map((it) => ({ ...it, image: itemImage(it.id) })),
}));

export const allItems = categories.flatMap((c) => c.items);

export const formatPrice = (n: number) => `₹${n.toLocaleString('en-IN')}`;
