import type { BrandKey } from "@/lib/brands";
import type { Category, OptionGroup, Product, Tag } from "@/lib/types";
import { slugify } from "@/lib/format";
import { PRODUCT_IMAGES } from "@/lib/mock/images";

/* ---------------------------------------------------------------- tags */
export const TAGS: Tag[] = [
  { slug: "chefs-pick", label: "Chef's pick", kind: "badge" },
  { slug: "new", label: "New", kind: "badge" },
  { slug: "vegan", label: "Vegan", kind: "diet" },
  { slug: "vegetarian", label: "Vegetarian", kind: "diet" },
  { slug: "contains-fish", label: "Contains fish", kind: "diet" },
  { slug: "contains-nuts", label: "Contains nuts", kind: "diet" },
  { slug: "spicy", label: "Spicy", kind: "attribute" },
];

/* --------------------------------------------------------- option sets */
const SIZE: OptionGroup = {
  name: "Size",
  choices: [
    { name: "Regular", priceDelta: 0, isDefault: true },
    { name: "Large", priceDelta: 1500 },
  ],
};
const SPICE: OptionGroup = {
  name: "Spice",
  choices: [
    { name: "Mild", priceDelta: 0 },
    { name: "Medium", priceDelta: 0, isDefault: true },
    { name: "Hot", priceDelta: 0 },
  ],
};
const PROTEIN: OptionGroup = {
  name: "Protein",
  choices: [
    { name: "Chicken", priceDelta: 0, isDefault: true },
    { name: "Goat", priceDelta: 1200 },
    { name: "Beef", priceDelta: 800 },
    { name: "Fish", priceDelta: 500 },
  ],
};
const SOFT_CHOICE: OptionGroup = {
  name: "Choice",
  choices: [
    { name: "Coca-Cola", priceDelta: 0, isDefault: true },
    { name: "Fanta", priceDelta: 0 },
    { name: "Sprite", priceDelta: 0 },
  ],
};
const SWALLOW_PAIR: OptionGroup = {
  name: "Pair with",
  choices: [
    { name: "Akple", priceDelta: 0, isDefault: true },
    { name: "Banku", priceDelta: 0 },
  ],
};

/* ---------------------------------------------------------- categories */
export const CATEGORIES: Category[] = [
  // Giloz
  cat("giloz", "Soups & Swallows", "Akple, banku, fufu and the soups that define Eʋe cooking.", 1),
  cat("giloz", "Rice & Grains", "Jollof, waakye and fried rice, done properly.", 2),
  cat("giloz", "Grills & Proteins", "Fire-kissed tilapia, chicken and attieke.", 3),
  cat("giloz", "Home Favourites", "Boiled yam, garifoto and the everyday comforts.", 4),
  cat("giloz", "Small Chops", "Kelewele, khebab and things to snack on.", 5),
  cat("giloz", "Salads & Continental", "Fresh plates from the continental side of the kitchen.", 6),
  cat("giloz", "Naturia Drinks", "Naturia brews, malts, minerals and more.", 7),
  // Sefofo
  cat("sefofo", "Home Classics", "The plates that taste like a visit home.", 1),
  cat("sefofo", "Soups & Swallows", "Comfort in a bowl, the way grandma made it.", 2),
  cat("sefofo", "Rice & Grains", "Everyday favourites, generous portions.", 3),
  cat("sefofo", "Sides", "Little extras to complete the plate.", 4),
  cat("sefofo", "Drinks & Liquids", "Naturia brews, malts, minerals and cold beer.", 5),
];

/* ------------------------------------------------------------ products */
export const PRODUCTS: Product[] = [
  /* ---- Giloz ---- */
  mk("giloz", "Soups & Swallows", "Akple & Ademe Soup", 5500, {
    eweName: "Akplɛ kple Adɛmɛ",
    description:
      "Our signature. Soft fermented corn-and-cassava dough with silky jute-leaf (ademe) soup, smoked fish and a whisper of pepper.",
    tags: ["chefs-pick", "contains-fish"],
    spiceLevel: 2,
    tone: ["#6E7B3D", "#241E10"],
    featured: true,
    rating: [4.9, 214],
    options: [SPICE],
    pairings: ["giloz-naturia-sobolo", "giloz-kelewele"],
  }),
  mk("giloz", "Soups & Swallows", "Banku & Grilled Tilapia", 9000, {
    description:
      "A whole grilled tilapia over warm banku, served with shito, fresh pepper and sliced onion.",
    tags: ["chefs-pick", "contains-fish"],
    spiceLevel: 2,
    tone: ["#8A6A2A", "#241A10"],
    featured: true,
    rating: [4.8, 176],
    options: [SPICE],
    pairings: ["giloz-naturia-pineapple-ginger"],
  }),
  mk("giloz", "Soups & Swallows", "Fufu & Goat Light Soup", 7000, {
    eweName: "Fufu kple Detsi",
    description:
      "Pounded cassava-and-plantain fufu in an aromatic, peppery goat light soup. Deeply comforting.",
    tags: ["spicy"],
    spiceLevel: 3,
    tone: ["#B5502B", "#3A1810"],
    rating: [4.7, 132],
    options: [SPICE, PROTEIN],
    pairings: ["giloz-naturia-sobolo"],
  }),
  mk("giloz", "Soups & Swallows", "Fetri Detsi & Banku", 6000, {
    eweName: "Fetri Detsi",
    description: "Draw-y okro soup with assorted meat and fish over soft banku.",
    tags: ["contains-fish"],
    spiceLevel: 2,
    tone: ["#5E7A3D", "#20240F"],
    rating: [4.6, 98],
    options: [SPICE],
    pairings: [],
  }),
  mk("giloz", "Soups & Swallows", "Palmnut Soup & Fufu", 7500, {
    eweName: "Abenkwan",
    description: "Rich, velvety palm-nut soup simmered with fish and meat, served with fufu.",
    tags: ["contains-fish"],
    spiceLevel: 2,
    tone: ["#A83E22", "#33160E"],
    rating: [4.7, 111],
    options: [SPICE],
    pairings: ["giloz-naturia-sobolo"],
  }),
  mk("giloz", "Rice & Grains", "Giloz Jollof & Chicken", 6500, {
    description: "Smoky party jollof with grilled chicken, salad and a slice of egg.",
    tags: ["chefs-pick"],
    spiceLevel: 1,
    tone: ["#C24E2A", "#5A2412"],
    featured: true,
    rating: [4.8, 203],
    options: [SIZE, PROTEIN],
    pairings: ["giloz-naturia-sobolo", "giloz-kelewele"],
  }),
  mk("giloz", "Rice & Grains", "Waakye Special", 5500, {
    description:
      "Rice and beans with the works — spaghetti, egg, gari, shito and your choice of protein.",
    tags: ["contains-fish"],
    spiceLevel: 1,
    tone: ["#7A4A2A", "#2A1A10"],
    rating: [4.7, 158],
    options: [PROTEIN],
    pairings: ["giloz-naturia-pineapple-ginger"],
  }),
  mk("giloz", "Rice & Grains", "Assorted Fried Rice", 7000, {
    description: "Wok-tossed fried rice with assorted meats and crisp vegetables.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C9A24B", "#5A4418"],
    rating: [4.5, 87],
    options: [SIZE, PROTEIN],
    pairings: [],
  }),
  mk("giloz", "Grills & Proteins", "Grilled Chicken & Yam Chips", 7500, {
    description: "Marinated grilled chicken with golden yam chips and shito mayo.",
    tags: [],
    spiceLevel: 1,
    tone: ["#8A6A2A", "#241A10"],
    rating: [4.6, 76],
    options: [SIZE],
    pairings: ["giloz-naturia-pineapple-ginger"],
  }),
  mk("giloz", "Small Chops", "Khebab Platter", 5000, {
    eweName: "Chichinga",
    description: "Skewered, spice-rubbed beef khebab dusted with groundnut and pepper.",
    tags: ["spicy", "contains-nuts"],
    spiceLevel: 2,
    tone: ["#9A4A22", "#2E160E"],
    rating: [4.7, 92],
    options: [],
    pairings: ["giloz-naturia-sobolo"],
  }),
  mk("giloz", "Small Chops", "Kelewele", 2500, {
    description: "Spiced, caramelised fried plantain — sweet, hot and utterly addictive.",
    tags: ["vegan", "spicy"],
    spiceLevel: 2,
    tone: ["#C88A2E", "#4A2E10"],
    rating: [4.9, 240],
    options: [],
    pairings: [],
  }),
  mk("giloz", "Grills & Proteins", "Attieke & Grilled Tilapia", 8500, {
    description:
      "Fluffy cassava attieke crowned with grilled tilapia, fried plantain, fresh veggies and extra sauce — served in grand style.",
    tags: ["new", "contains-fish"],
    spiceLevel: 1,
    tone: ["#C9A24B", "#4A3818"],
    rating: [4.7, 64],
    options: [SPICE],
    pairings: ["giloz-naturia-sobolo"],
  }),
  mk("giloz", "Soups & Swallows", "Kenkey & Fried Fish", 5000, {
    description: "Fermented corn kenkey with crisp fried fish, ground pepper and shito.",
    tags: ["contains-fish"],
    spiceLevel: 2,
    tone: ["#B08A4A", "#3A2C16"],
    rating: [4.6, 58],
    options: [SPICE],
    pairings: [],
  }),
  mk("giloz", "Home Favourites", "Boiled Yam & Egg Stew", 4500, {
    description: "Five-star boiled yam with a rich tomato-and-egg stew, straight from the pot.",
    tags: ["vegetarian"],
    spiceLevel: 1,
    tone: ["#D8B25A", "#4A3414"],
    rating: [4.7, 49],
    options: [],
    pairings: ["giloz-naturia-pineapple-ginger"],
  }),
  mk("giloz", "Home Favourites", "Garifoto", 4000, {
    eweName: "Garifɔtɔ",
    description: "Gari tossed in seasoned palm-oil stew with egg — made the Giloz way.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C88A3A", "#42280F"],
    rating: [4.6, 44],
    options: [],
    pairings: [],
  }),
  mk("giloz", "Salads & Continental", "Chicken Salad", 6000, {
    description: "The authentic chicken salad — grilled strips over crisp greens and vegetables.",
    tags: ["new"],
    spiceLevel: 0,
    tone: ["#5E7A3D", "#22301A"],
    rating: [4.5, 38],
    options: [],
    pairings: ["giloz-naturia-pineapple-ginger"],
  }),
  mk("giloz", "Naturia Drinks", "Naturia Sobolo", 1500, {
    description: "Hibiscus steeped with pineapple, ginger and cloves. Deep, tart and refreshing.",
    tags: ["vegan", "new"],
    spiceLevel: 0,
    tone: ["#8E1F3A", "#3A0E1A"],
    rating: [4.9, 168],
    options: [{ name: "Size", choices: [{ name: "500ml", priceDelta: 0, isDefault: true }, { name: "1L", priceDelta: 1200 }] }],
    pairings: [],
  }),
  mk("giloz", "Naturia Drinks", "Naturia Pineapple-Ginger", 1800, {
    description: "Cold-pressed pineapple with a bright, warming ginger kick.",
    tags: ["vegan"],
    spiceLevel: 0,
    tone: ["#D8A93A", "#6A4E14"],
    rating: [4.8, 121],
    options: [{ name: "Size", choices: [{ name: "500ml", priceDelta: 0, isDefault: true }, { name: "1L", priceDelta: 1200 }] }],
    pairings: [],
  }),
  mk("giloz", "Naturia Drinks", "Malta Guinness", 1200, {
    description: "The classic malt — dark, sweet and ice-cold.",
    tags: ["vegan"],
    spiceLevel: 0,
    tone: ["#4A2410", "#1E0E06"],
    rating: [4.8, 96],
    options: [],
    pairings: [],
  }),
  mk("giloz", "Naturia Drinks", "Soft Drink", 1000, {
    description: "Coca-Cola, Fanta or Sprite — chilled minerals for the table.",
    tags: ["vegan"],
    spiceLevel: 0,
    tone: ["#B02A1E", "#3A0E0A"],
    rating: [4.7, 84],
    options: [SOFT_CHOICE],
    pairings: [],
  }),
  mk("giloz", "Naturia Drinks", "Bottled Water", 500, {
    description: "Still mineral water, properly cold.",
    tags: ["vegan"],
    spiceLevel: 0,
    tone: ["#3A6EA5", "#12283E"],
    rating: [4.9, 61],
    options: [{ name: "Size", choices: [{ name: "500ml", priceDelta: 0, isDefault: true }, { name: "1.5L", priceDelta: 500 }] }],
    pairings: [],
  }),

  /* ---- Sefofo ---- */
  mk("sefofo", "Home Classics", "Red-Red & Fried Plantain", 3500, {
    description:
      "Slow-cooked bean stew in red palm oil with sweet fried plantain. The taste of a Sunday at home.",
    tags: ["vegan", "chefs-pick"],
    spiceLevel: 1,
    tone: ["#B23A22", "#3A140E"],
    featured: true,
    rating: [4.9, 189],
    options: [SPICE],
    pairings: ["sefofo-naturia-sobolo"],
  }),
  mk("sefofo", "Home Classics", "Abolo & One-Man-Thousand", 5000, {
    eweName: "Abolo kple Abobi",
    description:
      "Soft steamed Eʋe rice bread with crispy fried one-man-thousand (small fish) and hot pepper.",
    tags: ["chefs-pick", "contains-fish"],
    spiceLevel: 2,
    tone: ["#C9A24B", "#4A3818"],
    featured: true,
    rating: [4.8, 143],
    options: [],
    pairings: ["sefofo-naturia-tamarind"],
  }),
  mk("sefofo", "Home Classics", "Kontomire Palava & Yam", 4200, {
    eweName: "Kontomire",
    description: "Cocoyam-leaf palava sauce with egusi and fish, served with boiled yam.",
    tags: ["contains-fish"],
    spiceLevel: 1,
    tone: ["#3E5C3A", "#182213"],
    rating: [4.7, 96],
    options: [],
    pairings: ["sefofo-naturia-sobolo"],
  }),
  mk("sefofo", "Home Classics", "Ampesi & Garden Egg Stew", 3800, {
    description: "Boiled yam and plantain with a homely garden-egg (aubergine) stew.",
    tags: ["vegetarian"],
    spiceLevel: 1,
    tone: ["#7A8A3A", "#2A2E14"],
    rating: [4.6, 71],
    options: [],
    pairings: [],
  }),
  mk("sefofo", "Soups & Swallows", "Banku & Okro Stew", 4500, {
    description: "Warm banku with a hearty okro stew of assorted meat and fish.",
    tags: ["chefs-pick", "contains-fish"],
    spiceLevel: 2,
    tone: ["#5E7A3D", "#20240F"],
    featured: true,
    rating: [4.8, 165],
    options: [SPICE],
    pairings: ["sefofo-naturia-sobolo"],
  }),
  mk("sefofo", "Soups & Swallows", "Konkonte & Groundnut Soup", 4000, {
    eweName: "Face-the-wall",
    description: "Dried-cassava konkonte with a rich, nutty groundnut soup.",
    tags: ["contains-nuts"],
    spiceLevel: 2,
    tone: ["#B07A34", "#3A2A12"],
    rating: [4.6, 88],
    options: [SPICE, PROTEIN],
    pairings: [],
  }),
  mk("sefofo", "Soups & Swallows", "Yakayake & Ademe", 4800, {
    eweName: "Yakayake kple Adɛmɛ",
    description: "Steamed cassava granules with jute-leaf soup and smoked fish — pure Volta comfort.",
    tags: ["contains-fish"],
    spiceLevel: 2,
    tone: ["#6E7B3D", "#241E10"],
    rating: [4.7, 74],
    options: [SPICE],
    pairings: ["sefofo-naturia-tamarind"],
  }),
  mk("sefofo", "Rice & Grains", "Sefofo Jollof & Chicken", 5500, {
    description: "Homestyle jollof with tender grilled chicken and fresh salad.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C24E2A", "#5A2412"],
    rating: [4.7, 132],
    options: [SIZE, PROTEIN],
    pairings: ["sefofo-naturia-sobolo"],
  }),
  mk("sefofo", "Rice & Grains", "Gari & Beans", 3000, {
    eweName: "Yɔɔ kple Gari",
    description: "Soft beans crowned with crunchy gari and red palm oil. Simple, honest, filling.",
    tags: ["vegan"],
    spiceLevel: 1,
    tone: ["#B08A4A", "#3A2C16"],
    rating: [4.6, 103],
    options: [],
    pairings: [],
  }),
  mk("sefofo", "Sides", "Kelewele", 2200, {
    description: "Spiced fried plantain, sweet and fiery. A side you'll fight over.",
    tags: ["vegan", "spicy"],
    spiceLevel: 2,
    tone: ["#C88A2E", "#4A2E10"],
    rating: [4.9, 151],
    options: [],
    pairings: [],
  }),
  mk("sefofo", "Home Classics", "Gbatakpã", 4800, {
    eweName: "Gbatakpã",
    description: "If comfort food had a name, it would be Gbatakpã — hot, hearty and unmistakably home.",
    tags: ["chefs-pick"],
    spiceLevel: 2,
    tone: ["#B5502B", "#3A1810"],
    featured: true,
    rating: [4.9, 87],
    options: [SPICE],
    pairings: ["sefofo-naturia-sobolo"],
  }),
  mk("sefofo", "Soups & Swallows", "Aborbitadi", 5200, {
    eweName: "Aborbitadi",
    description: "The beloved Eʋe delicacy — how do you like yours, with Akple or Banku?",
    tags: ["contains-fish"],
    spiceLevel: 2,
    tone: ["#8E5A2A", "#2E1C0E"],
    rating: [4.7, 52],
    options: [SWALLOW_PAIR, SPICE],
    pairings: ["sefofo-naturia-tamarind"],
  }),
  mk("sefofo", "Soups & Swallows", "Fufu & Soup — Sefofo Special", 5500, {
    description:
      "Rated among the best fufu in Accra — pounded soft, served in your choice of steaming soup.",
    tags: ["chefs-pick"],
    spiceLevel: 2,
    tone: ["#C9A24B", "#4A3818"],
    featured: true,
    rating: [4.9, 118],
    options: [SPICE, PROTEIN],
    pairings: ["sefofo-naturia-sobolo"],
  }),
  mk("sefofo", "Home Classics", "Boiled Yam & Stew", 4000, {
    description: "Perfectly boiled yam with your favourite stew — lunch that feels like home.",
    tags: ["vegetarian"],
    spiceLevel: 1,
    tone: ["#D8B25A", "#4A3414"],
    rating: [4.7, 66],
    options: [],
    pairings: [],
  }),
  mk("sefofo", "Rice & Grains", "Village Dawadawa Jollof", 5000, {
    description: "New on the menu — smoky village-style jollof deepened with dawadawa.",
    tags: ["new"],
    spiceLevel: 1,
    tone: ["#A34A22", "#3A180E"],
    rating: [4.6, 33],
    options: [SIZE, PROTEIN],
    pairings: [],
  }),
  mk("sefofo", "Rice & Grains", "Plain Rice & Egusi", 4800, {
    description: "Steamed rice with rich egusi stew — another new addition our regulars love.",
    tags: ["new", "contains-fish"],
    spiceLevel: 1,
    tone: ["#7A8A3A", "#2A2E14"],
    rating: [4.5, 29],
    options: [],
    pairings: [],
  }),
  mk("sefofo", "Naturia Drinks", "Naturia Sobolo", 1500, {
    description: "Hibiscus steeped with pineapple, ginger and cloves. Deep, tart and refreshing.",
    tags: ["vegan", "new"],
    spiceLevel: 0,
    tone: ["#8E1F3A", "#3A0E1A"],
    rating: [4.9, 140],
    options: [{ name: "Size", choices: [{ name: "500ml", priceDelta: 0, isDefault: true }, { name: "1L", priceDelta: 1200 }] }],
    pairings: [],
  }),
  mk("sefofo", "Naturia Drinks", "Naturia Tamarind", 1600, {
    eweName: "Puha",
    description: "Tangy-sweet tamarind cooler with a hint of spice.",
    tags: ["vegan"],
    spiceLevel: 0,
    tone: ["#9A6A2E", "#3A2612"],
    rating: [4.7, 89],
    options: [{ name: "Size", choices: [{ name: "500ml", priceDelta: 0, isDefault: true }, { name: "1L", priceDelta: 1200 }] }],
    pairings: [],
  }),
  mk("sefofo", "Naturia Drinks", "Malta Guinness", 1200, {
    description: "The classic malt — dark, sweet and ice-cold.",
    tags: ["vegan"],
    spiceLevel: 0,
    tone: ["#4A2410", "#1E0E06"],
    rating: [4.8, 74],
    options: [],
    pairings: [],
  }),
  mk("sefofo", "Naturia Drinks", "Soft Drink", 1000, {
    description: "Coca-Cola, Fanta or Sprite — chilled minerals for the table.",
    tags: ["vegan"],
    spiceLevel: 0,
    tone: ["#B02A1E", "#3A0E0A"],
    rating: [4.7, 69],
    options: [SOFT_CHOICE],
    pairings: [],
  }),
  mk("sefofo", "Naturia Drinks", "Bottled Water", 500, {
    description: "Still mineral water, properly cold.",
    tags: ["vegan"],
    spiceLevel: 0,
    tone: ["#3A6EA5", "#12283E"],
    rating: [4.9, 48],
    options: [{ name: "Size", choices: [{ name: "500ml", priceDelta: 0, isDefault: true }, { name: "1.5L", priceDelta: 500 }] }],
    pairings: [],
  }),
  mk("sefofo", "Naturia Drinks", "Club Beer", 1800, {
    description: "Ghana's own premium lager, served ice-cold. 18+ only.",
    tags: [],
    spiceLevel: 0,
    tone: ["#C9A24B", "#3E2C10"],
    rating: [4.7, 57],
    options: [],
    pairings: [],
  }),
  mk("sefofo", "Naturia Drinks", "Star Beer", 1800, {
    description: "The classic Ghanaian lager — crisp, golden, cold. 18+ only.",
    tags: [],
    spiceLevel: 0,
    tone: ["#D8B25A", "#3E2C10"],
    rating: [4.6, 51],
    options: [],
    pairings: [],
  }),
];

/* --------------------------------------------------------- builders */
function cat(brand: BrandKey, name: string, description: string, position: number): Category {
  const slug = name.includes("Drinks") ? "drinks" : slugify(name);
  return { id: `${brand}-cat-${slug}`, brand, name, slug, description, position };
}

interface MkOpts {
  eweName?: string;
  description: string;
  tags: string[];
  spiceLevel: 0 | 1 | 2 | 3;
  tone: [string, string];
  featured?: boolean;
  rating: [number, number];
  options: OptionGroup[];
  pairings: string[];
}

function mk(brand: BrandKey, categoryName: string, name: string, basePrice: number, o: MkOpts): Product {
  const categorySlug = categoryName.includes("Drinks") ? "drinks" : slugify(categoryName);
  const slug = `${brand}-${slugify(name)}`;
  return {
    id: slug,
    brand,
    categorySlug,
    name,
    eweName: o.eweName,
    slug,
    description: o.description,
    basePrice,
    spiceLevel: o.spiceLevel,
    tags: o.tags,
    prepMinutes: 20 + Math.round(basePrice / 1500),
    isAvailable: true,
    isFeatured: o.featured ?? false,
    ratingAvg: o.rating[0],
    ratingCount: o.rating[1],
    image: PRODUCT_IMAGES[slug],
    imageTone: o.tone,
    options: o.options,
    pairings: o.pairings,
  };
}
