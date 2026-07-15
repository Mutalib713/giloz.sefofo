/**
 * Menu fixtures transcribed from the brands' REAL printed menus:
 *  - "Giloz Restaurant — Menu" (GilozMenuCompressednew.pdf)
 *  - "Sefofo Restaurant, Liquids & Grill — Menu" (Sefofo_Menu.pdf)
 *
 * Categories, dishes and prices mirror those PDFs exactly. Where the menu
 * prints one line per variant ("Ademe with Akple", "Ademe with Banku"), we
 * model a single product with an option group whose price deltas reproduce
 * the printed price of every listed combination.
 *
 * Prices are stored in pesewas (GHS 95 → 9500).
 */
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
  { slug: "family-pack", label: "Family pack", kind: "attribute" },
  { slug: "alcoholic", label: "18+", kind: "attribute" },
];

/* --------------------------------------------------------- option sets */
/** Akple or Banku — the classic Eʋe swallow choice, same price. */
const SWALLOW: OptionGroup = {
  name: "Served with",
  choices: [
    { name: "Akple", priceDelta: 0, isDefault: true },
    { name: "Banku", priceDelta: 0 },
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

/* ---------------------------------------------------------- categories */
export const CATEGORIES: Category[] = [
  // Giloz — exactly the sections of the printed menu
  cat("giloz", "Fried Rice Combo", "Wok-fired rice — super, assorted, egg or beef — packed your way.", 1),
  cat("giloz", "Jollof Zone", "Smoky jollof from the zone: superb, assorted or with your favourite protein.", 2),
  cat("giloz", "Mixed Corner", "Noodles, spaghetti, shawarma, french fries and yam chips.", 3),
  cat("giloz", "Local Cuisine", "Akple, banku and the Eʋe soups of home — ademe, okro, fetri and more.", 4),
  cat("giloz", "The Salads", "Fresh, crisp and generous.", 5),
  // Sefofo — exactly the sections of the printed menu
  cat("sefofo", "Locals", "The Volta table: ademe, gbatakpã, fufu, akple and banku done properly.", 1),
  cat("sefofo", "Continentals", "Jollof, fried rice, shawarma, fries and more from the grill side.", 2),
  cat("sefofo", "Platters", "Rose & Lily — sharing platters for the table.", 3),
  cat("sefofo", "Drinks & Cocktails", "Minerals, malts, beers, cocktails and mocktails.", 4),
  cat("sefofo", "Extras", "Top-ups: extra swallow, soup, protein and sides.", 5),
];

/* ------------------------------------------------------------ products */
export const PRODUCTS: Product[] = [
  /* ================================ GILOZ ================================ */

  /* ---- Fried Rice Combo ---- */
  mk("giloz", "Fried Rice Combo", "Super Fried Rice", 8000, {
    description:
      "Giloz's signature loaded fried rice. Go Luxury Pack for the full works.",
    tags: ["chefs-pick"],
    spiceLevel: 1,
    tone: ["#C9A24B", "#5A4418"],
    featured: true,
    rating: [4.8, 186],
    options: [
      {
        name: "Pack",
        choices: [
          { name: "Standard", priceDelta: 0, isDefault: true },
          { name: "Luxury Pack", priceDelta: 500 },
        ],
      },
    ],
    pairings: ["giloz-chicken-salad"],
  }),
  mk("giloz", "Fried Rice Combo", "Fried Rice with Beef Sauce", 8500, {
    description: "Fried rice smothered in a rich, slow-cooked beef sauce.",
    tags: [],
    spiceLevel: 1,
    tone: ["#A85A2A", "#3A2010"],
    rating: [4.7, 121],
    options: [SPICE],
    pairings: [],
  }),
  mk("giloz", "Fried Rice Combo", "Fried Rice with Chicken Sauce", 8500, {
    description: "Fried rice with a hearty chicken sauce ladled over the top.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C08A3A", "#42280F"],
    rating: [4.7, 108],
    options: [SPICE],
    pairings: [],
  }),
  mk("giloz", "Fried Rice Combo", "Assorted Fried Rice", 7000, {
    description:
      "Wok-tossed fried rice with assorted meats and crisp vegetables — solo or family pack.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C9A24B", "#4A3818"],
    rating: [4.6, 143],
    options: [
      {
        name: "Protein",
        choices: [
          { name: "Chicken", priceDelta: 0, isDefault: true },
          { name: "Grilled Chicken", priceDelta: 500 },
          { name: "Fish", priceDelta: 500 },
        ],
      },
      {
        name: "Pack",
        choices: [
          { name: "Solo", priceDelta: 0, isDefault: true },
          { name: "Family Pack", priceDelta: 500 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("giloz", "Fried Rice Combo", "Egg Fried Rice", 6000, {
    description: "Golden egg fried rice with chicken — the everyday favourite.",
    tags: [],
    spiceLevel: 1,
    tone: ["#D8B25A", "#4A3414"],
    rating: [4.6, 97],
    options: [
      {
        name: "Chicken",
        choices: [
          { name: "Fried Chicken", priceDelta: 0, isDefault: true },
          { name: "Grilled Chicken", priceDelta: 1000 },
        ],
      },
      {
        name: "Pack",
        choices: [
          { name: "Solo", priceDelta: 0, isDefault: true },
          { name: "Family Pack", priceDelta: 1000 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("giloz", "Fried Rice Combo", "Beef Fried Rice", 8500, {
    description: "Fried rice studded with tender seasoned beef.",
    tags: [],
    spiceLevel: 1,
    tone: ["#9A4A22", "#2E160E"],
    rating: [4.7, 88],
    options: [SPICE],
    pairings: [],
  }),

  /* ---- Jollof Zone ---- */
  mk("giloz", "Jollof Zone", "Superb Jollof", 8000, {
    description:
      "Smoky party-grade jollof, done the Giloz way. The Luxury Pack piles it higher.",
    tags: ["chefs-pick"],
    spiceLevel: 1,
    tone: ["#C24E2A", "#5A2412"],
    featured: true,
    rating: [4.9, 232],
    options: [
      {
        name: "Pack",
        choices: [
          { name: "Standard", priceDelta: 0, isDefault: true },
          { name: "Luxury Pack", priceDelta: 500 },
        ],
      },
    ],
    pairings: ["giloz-vegetable-salad"],
  }),
  mk("giloz", "Jollof Zone", "Jollof with Beef Sauce", 8500, {
    description: "Jollof rice under a rich beef sauce.",
    tags: [],
    spiceLevel: 1,
    tone: ["#A83E22", "#33160E"],
    rating: [4.7, 104],
    options: [SPICE],
    pairings: [],
  }),
  mk("giloz", "Jollof Zone", "Jollof with Chicken Sauce", 8500, {
    description: "Jollof rice with a generous chicken sauce.",
    tags: [],
    spiceLevel: 1,
    tone: ["#B85A2A", "#3A1C0E"],
    rating: [4.7, 96],
    options: [SPICE],
    pairings: [],
  }),
  mk("giloz", "Jollof Zone", "Assorted Jollof", 7000, {
    description: "Party jollof with assorted meats — solo or family pack.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C24E2A", "#4A1E10"],
    rating: [4.7, 155],
    options: [
      {
        name: "Protein",
        choices: [
          { name: "Chicken", priceDelta: 0, isDefault: true },
          { name: "Grilled Chicken", priceDelta: 500 },
          { name: "Fish", priceDelta: 500 },
        ],
      },
      {
        name: "Pack",
        choices: [
          { name: "Solo", priceDelta: 0, isDefault: true },
          { name: "Family Pack", priceDelta: 500 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("giloz", "Jollof Zone", "Jollof with Chicken", 6000, {
    description: "The classic plate — jollof and chicken, fried or off the grill.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C86A2A", "#42200E"],
    rating: [4.7, 178],
    options: [
      {
        name: "Chicken",
        choices: [
          { name: "Fried Chicken", priceDelta: 0, isDefault: true },
          { name: "Grilled Chicken", priceDelta: 1000 },
        ],
      },
      {
        name: "Pack",
        choices: [
          { name: "Solo", priceDelta: 0, isDefault: true },
          { name: "Family Pack", priceDelta: 1000 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("giloz", "Jollof Zone", "Beef Jollof", 8500, {
    description: "Jollof rice with tender seasoned beef.",
    tags: [],
    spiceLevel: 1,
    tone: ["#9A3A22", "#2E120E"],
    rating: [4.6, 82],
    options: [SPICE],
    pairings: [],
  }),

  /* ---- Mixed Corner ---- */
  mk("giloz", "Mixed Corner", "Assorted Noodles", 7000, {
    description: "Stir-fried noodles loaded with assorted meats and vegetables.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C9A24B", "#4A3418"],
    rating: [4.6, 92],
    options: [SPICE],
    pairings: [],
  }),
  mk("giloz", "Mixed Corner", "Assorted Spaghetti", 7000, {
    description: "Spaghetti tossed with assorted meats in a savoury sauce.",
    tags: [],
    spiceLevel: 1,
    tone: ["#B85A2A", "#3A1C10"],
    rating: [4.5, 71],
    options: [SPICE],
    pairings: [],
  }),
  mk("giloz", "Mixed Corner", "Shawarma Mix", 7000, {
    description: "Beef and chicken together in one loaded wrap.",
    tags: [],
    spiceLevel: 1,
    tone: ["#B08A4A", "#3A2C16"],
    rating: [4.7, 113],
    options: [SPICE],
    pairings: [],
  }),
  mk("giloz", "Mixed Corner", "Beef Shawarma", 7000, {
    description: "Marinated beef, crunchy veg and garlic sauce in a toasted wrap.",
    tags: [],
    spiceLevel: 1,
    tone: ["#9A4A22", "#2E160E"],
    rating: [4.6, 98],
    options: [SPICE],
    pairings: [],
  }),
  mk("giloz", "Mixed Corner", "Chicken Shawarma", 7000, {
    description: "Juicy chicken shawarma with the works.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C08A3A", "#42280F"],
    rating: [4.7, 124],
    options: [SPICE],
    pairings: [],
  }),
  mk("giloz", "Mixed Corner", "French Fries & Chicken", 7000, {
    description: "Golden fries with chicken — fried, or grilled for a little extra.",
    tags: [],
    spiceLevel: 0,
    tone: ["#D8B25A", "#4A3414"],
    rating: [4.6, 87],
    options: [
      {
        name: "Chicken",
        choices: [
          { name: "Fried Chicken", priceDelta: 0, isDefault: true },
          { name: "Grilled Chicken", priceDelta: 500 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("giloz", "Mixed Corner", "Yam Chips", 7000, {
    description: "Crisp golden yam chips with your choice of protein.",
    tags: [],
    spiceLevel: 0,
    tone: ["#C88A2E", "#4A2E10"],
    rating: [4.7, 106],
    options: [
      {
        name: "Protein",
        choices: [
          { name: "Fried Chicken", priceDelta: 0, isDefault: true },
          { name: "Grilled Chicken", priceDelta: 500 },
          { name: "Fish", priceDelta: 500 },
        ],
      },
    ],
    pairings: [],
  }),

  /* ---- Local Cuisine ---- */
  mk("giloz", "Local Cuisine", "Totonyanya", 8500, {
    eweName: "Totonyanya",
    description:
      "The celebrated Eʋe delicacy — deep, savoury and unmistakably Volta. Served with akple, banku or eba.",
    tags: ["chefs-pick"],
    spiceLevel: 2,
    tone: ["#6E7B3D", "#241E10"],
    featured: true,
    rating: [4.9, 141],
    options: [
      {
        name: "Served with",
        choices: [
          { name: "Akple", priceDelta: 0, isDefault: true },
          { name: "Banku", priceDelta: 0 },
          { name: "Eba", priceDelta: 0 },
        ],
      },
      SPICE,
    ],
    pairings: [],
  }),
  mk("giloz", "Local Cuisine", "Gbomanyanya", 8000, {
    eweName: "Gbɔmanyanya",
    description: "Rich Eʋe leaf stew, served with akple or banku.",
    tags: [],
    spiceLevel: 2,
    tone: ["#3E5C3A", "#182213"],
    rating: [4.8, 102],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("giloz", "Local Cuisine", "Oiless Okro", 7000, {
    description: "Light, oil-free okro soup with akple or banku.",
    tags: [],
    spiceLevel: 1,
    tone: ["#5E7A3D", "#20240F"],
    rating: [4.6, 78],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("giloz", "Local Cuisine", "Okro", 7000, {
    eweName: "Fetri",
    description: "Classic draw-y okro soup with akple or banku.",
    tags: [],
    spiceLevel: 2,
    tone: ["#5E7A3D", "#1E2410"],
    rating: [4.7, 115],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("giloz", "Local Cuisine", "Oiless Ademe", 7000, {
    eweName: "Adɛmɛ",
    description: "Silky jute-leaf soup, cooked clean with no oil.",
    tags: [],
    spiceLevel: 1,
    tone: ["#6E7B3D", "#242410"],
    rating: [4.6, 69],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("giloz", "Local Cuisine", "Ademe", 7000, {
    eweName: "Adɛmɛ",
    description: "The signature jute-leaf soup of the Volta table.",
    tags: ["chefs-pick"],
    spiceLevel: 2,
    tone: ["#6E7B3D", "#241E10"],
    rating: [4.8, 134],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("giloz", "Local Cuisine", "Okro Stew", 7000, {
    description: "Hearty okro stew with akple or banku.",
    tags: [],
    spiceLevel: 2,
    tone: ["#5E7A3D", "#20240F"],
    rating: [4.6, 74],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("giloz", "Local Cuisine", "Detsififi", 7500, {
    eweName: "Detsiƒiƒi",
    description: "Steaming Eʋe hot soup, served with banku or akple.",
    tags: [],
    spiceLevel: 2,
    tone: ["#B5502B", "#3A1810"],
    rating: [4.7, 66],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("giloz", "Local Cuisine", "Eba with Egusi", 7500, {
    description: "Smooth eba with rich, nutty egusi stew.",
    tags: ["contains-nuts"],
    spiceLevel: 1,
    tone: ["#B07A34", "#3A2A12"],
    rating: [4.6, 58],
    options: [SPICE],
    pairings: [],
  }),
  mk("giloz", "Local Cuisine", "Eba with Okro", 7000, {
    description: "Eba paired with classic okro soup.",
    tags: [],
    spiceLevel: 1,
    tone: ["#7A8A3A", "#2A2E14"],
    rating: [4.5, 44],
    options: [SPICE],
    pairings: [],
  }),
  mk("giloz", "Local Cuisine", "Attieke", 8000, {
    description:
      "Fluffy cassava attieke with grilled tilapia or grilled chicken, fresh pepper and onion.",
    tags: ["contains-fish"],
    spiceLevel: 1,
    tone: ["#C9A24B", "#4A3818"],
    rating: [4.7, 89],
    options: [
      {
        name: "Grill",
        choices: [
          { name: "Grilled Tilapia", priceDelta: 0, isDefault: true },
          { name: "Grilled Chicken", priceDelta: 0 },
        ],
      },
      SPICE,
    ],
    pairings: [],
  }),
  mk("giloz", "Local Cuisine", "Boiled Yam", 7000, {
    description: "Soft boiled yam with egg stew, garden egg stew or palava sauce.",
    tags: ["vegetarian"],
    spiceLevel: 1,
    tone: ["#D8B25A", "#4A3414"],
    rating: [4.7, 63],
    options: [
      {
        name: "Sauce",
        choices: [
          { name: "Egg Stew", priceDelta: 0, isDefault: true },
          { name: "Garden Egg Stew", priceDelta: 0 },
          { name: "Palava Sauce", priceDelta: 0 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("giloz", "Local Cuisine", "Garifotor", 8000, {
    eweName: "Garifɔtɔ",
    description: "Gari tossed in seasoned palm-oil stew with egg — made the Giloz way.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C88A3A", "#42280F"],
    rating: [4.6, 57],
    options: [],
    pairings: [],
  }),
  mk("giloz", "Local Cuisine", "Aborbitadi", 7000, {
    eweName: "Aborbitadi",
    description: "The beloved Eʋe delicacy, with akple or banku.",
    tags: [],
    spiceLevel: 2,
    tone: ["#8E5A2A", "#2E1C0E"],
    rating: [4.7, 61],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("giloz", "Local Cuisine", "Hot Pepper Tilapia", 10000, {
    description:
      "Whole tilapia in fiery hot pepper — fried with akple, or grilled with banku.",
    tags: ["chefs-pick", "spicy", "contains-fish"],
    spiceLevel: 3,
    tone: ["#B5502B", "#3A1810"],
    featured: true,
    rating: [4.9, 127],
    options: [
      {
        name: "Style",
        choices: [
          { name: "Fried Tilapia & Akple", priceDelta: 0, isDefault: true },
          { name: "Grilled Tilapia & Banku", priceDelta: 0 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("giloz", "Local Cuisine", "Fetri Toto", 7500, {
    eweName: "Fetri Toto",
    description: "Thick, draw-y okro specialty served with banku or akple.",
    tags: [],
    spiceLevel: 2,
    tone: ["#5E7A3D", "#20240F"],
    rating: [4.7, 72],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),

  /* ---- The Salads ---- */
  mk("giloz", "The Salads", "Chicken Salad", 7000, {
    description: "Grilled chicken strips over crisp greens and vegetables.",
    tags: [],
    spiceLevel: 0,
    tone: ["#5E7A3D", "#22301A"],
    rating: [4.6, 54],
    options: [],
    pairings: [],
  }),
  mk("giloz", "The Salads", "Potato Salad", 7000, {
    description: "Creamy potato salad, chilled and generous.",
    tags: ["vegetarian"],
    spiceLevel: 0,
    tone: ["#D8B25A", "#4A3818"],
    rating: [4.5, 38],
    options: [],
    pairings: [],
  }),
  mk("giloz", "The Salads", "Vegetable Salad", 7000, {
    description: "A fresh garden salad of crunchy seasonal vegetables.",
    tags: ["vegetarian"],
    spiceLevel: 0,
    tone: ["#5E8A3D", "#1E2E12"],
    rating: [4.5, 41],
    options: [],
    pairings: [],
  }),

  /* =============================== SEFOFO =============================== */

  /* ---- Locals ---- */
  mk("sefofo", "Locals", "Ademe", 9500, {
    eweName: "Adɛmɛ",
    description: "Silky jute-leaf soup with smoked fish, served with akple or banku.",
    tags: ["chefs-pick", "contains-fish"],
    spiceLevel: 2,
    tone: ["#6E7B3D", "#241E10"],
    featured: true,
    rating: [4.9, 178],
    options: [SWALLOW, SPICE],
    pairings: ["sefofo-malta-guinness"],
  }),
  mk("sefofo", "Locals", "Oil-less Ademe", 9500, {
    eweName: "Adɛmɛ",
    description: "Ademe cooked clean with no oil — light and wholesome.",
    tags: [],
    spiceLevel: 1,
    tone: ["#6E7B3D", "#242410"],
    rating: [4.7, 83],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Okro Soup", 9500, {
    description: "Classic okro soup with banku or akple.",
    tags: [],
    spiceLevel: 2,
    tone: ["#5E7A3D", "#20240F"],
    rating: [4.7, 121],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Oil-less Okro Soup", 9500, {
    description: "Okro soup, no oil — all the draw, none of the weight.",
    tags: [],
    spiceLevel: 1,
    tone: ["#5E7A3D", "#242810"],
    rating: [4.6, 67],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Oil-less Ademe & Okro Mix", 9500, {
    description: "The best of both leaves — ademe and okro mixed, oil-free.",
    tags: [],
    spiceLevel: 1,
    tone: ["#6E8A3D", "#22240F"],
    rating: [4.7, 59],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Waakye Special", 10000, {
    description:
      "Waakye with boiled egg, meat, chicken wings and wele — the full works.",
    tags: ["chefs-pick"],
    spiceLevel: 1,
    tone: ["#7A4A2A", "#2A1A10"],
    featured: true,
    rating: [4.8, 164],
    options: [],
    pairings: ["sefofo-coca-cola"],
  }),
  mk("sefofo", "Locals", "Gbatakpã", 10000, {
    eweName: "Gbatakpã",
    description:
      "If comfort food had a name it would be Gbatakpã — hot, hearty and unmistakably home.",
    tags: ["chefs-pick"],
    spiceLevel: 2,
    tone: ["#B5502B", "#3A1810"],
    featured: true,
    rating: [4.9, 132],
    options: [
      {
        name: "Served with",
        choices: [
          { name: "Banku", priceDelta: 0, isDefault: true },
          { name: "Akple", priceDelta: 0 },
        ],
      },
      SPICE,
    ],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Gbomanyanya", 10000, {
    eweName: "Gbɔmanyanya",
    description: "Deep, savoury Eʋe leaf stew with akple or banku.",
    tags: [],
    spiceLevel: 2,
    tone: ["#3E5C3A", "#182213"],
    rating: [4.8, 97],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Aborbitadi", 9500, {
    eweName: "Aborbitadi",
    description: "The beloved Eʋe delicacy — how do you like yours, akple or banku?",
    tags: [],
    spiceLevel: 2,
    tone: ["#8E5A2A", "#2E1C0E"],
    rating: [4.7, 76],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Detsififi", 10000, {
    eweName: "Detsiƒiƒi",
    description: "Steaming Eʋe hot soup, ladled over akple or banku.",
    tags: [],
    spiceLevel: 2,
    tone: ["#B5502B", "#38180E"],
    rating: [4.7, 71],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Abolo", 10000, {
    eweName: "Abolo",
    description:
      "Soft steamed Eʋe rice bread, with gravy & chicken wings or gbomanyanya.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C9A24B", "#4A3818"],
    rating: [4.8, 89],
    options: [
      {
        name: "Served with",
        choices: [
          { name: "Gravy & Chicken Wings", priceDelta: 0, isDefault: true },
          { name: "Gbomanyanya", priceDelta: 0 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Yakayake", 10000, {
    eweName: "Yakayake",
    description:
      "Steamed cassava granules, with gbomanyanya or gravy & chicken wings.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C9B24B", "#443818"],
    rating: [4.7, 78],
    options: [
      {
        name: "Served with",
        choices: [
          { name: "Gbomanyanya", priceDelta: 0, isDefault: true },
          { name: "Gravy & Chicken Wings", priceDelta: 0 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Fufu & Light Soup", 10000, {
    description:
      "Soft pounded fufu in aromatic, peppery light soup — goat or chicken.",
    tags: ["chefs-pick"],
    spiceLevel: 3,
    tone: ["#B5502B", "#3A1810"],
    featured: true,
    rating: [4.9, 156],
    options: [
      {
        name: "Soup",
        choices: [
          { name: "Goat Light Soup", priceDelta: 0, isDefault: true },
          { name: "Chicken Light Soup", priceDelta: 0 },
        ],
      },
      SPICE,
    ],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Boiled Yam", 9500, {
    description: "Boiled yam with palava sauce, egg stew or garden egg stew.",
    tags: ["vegetarian"],
    spiceLevel: 1,
    tone: ["#D8B25A", "#4A3414"],
    rating: [4.7, 68],
    options: [
      {
        name: "Sauce",
        choices: [
          { name: "Palava Sauce", priceDelta: 0, isDefault: true },
          { name: "Egg Stew", priceDelta: 0 },
          { name: "Garden Egg Stew", priceDelta: 0 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Attieke", 12000, {
    description:
      "Fluffy cassava attieke with grilled tilapia or grilled chicken, pepper and onion.",
    tags: ["contains-fish"],
    spiceLevel: 1,
    tone: ["#C9A24B", "#4A3818"],
    rating: [4.7, 94],
    options: [
      {
        name: "Grill",
        choices: [
          { name: "Grilled Tilapia", priceDelta: 0, isDefault: true },
          { name: "Grilled Chicken", priceDelta: 0 },
        ],
      },
      SPICE,
    ],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Garifotor with Grilled Turkey Wings", 12000, {
    eweName: "Garifɔtɔ",
    description: "Seasoned garifotor crowned with smoky grilled turkey wings.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C88A3A", "#42280F"],
    rating: [4.7, 62],
    options: [],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Aborbi Dzenkple", 10000, {
    eweName: "Aborbi Dzenkple",
    description: "Volta-style dzenkple, rich with aborbi.",
    tags: [],
    spiceLevel: 2,
    tone: ["#8E5A2A", "#2E1C0E"],
    rating: [4.7, 48],
    options: [SPICE],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Tilapia & Hot Pepper", 13000, {
    description:
      "Whole tilapia — fried or grilled — buried in fresh hot pepper, with akple or banku.",
    tags: ["chefs-pick", "spicy", "contains-fish"],
    spiceLevel: 3,
    tone: ["#B5502B", "#3A1810"],
    featured: true,
    rating: [4.9, 143],
    options: [
      {
        name: "Tilapia",
        choices: [
          { name: "Fried", priceDelta: 0, isDefault: true },
          { name: "Grilled", priceDelta: 0 },
        ],
      },
      SWALLOW,
    ],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Fetri Toto", 11000, {
    eweName: "Fetri Toto",
    description: "Thick, draw-y okro specialty with banku or akple.",
    tags: [],
    spiceLevel: 2,
    tone: ["#5E7A3D", "#20240F"],
    rating: [4.7, 66],
    options: [SWALLOW, SPICE],
    pairings: [],
  }),
  mk("sefofo", "Locals", "Eba with Egusi", 10000, {
    description: "Smooth eba with rich, nutty egusi stew.",
    tags: ["contains-nuts"],
    spiceLevel: 1,
    tone: ["#B07A34", "#3A2A12"],
    rating: [4.6, 52],
    options: [SPICE],
    pairings: [],
  }),

  /* ---- Continentals ---- */
  mk("sefofo", "Continentals", "Jollof Rice & Chicken", 9000, {
    description: "Smoky jollof with fried chicken, grilled wings or grilled chicken.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C24E2A", "#5A2412"],
    rating: [4.7, 187],
    options: [
      {
        name: "Chicken",
        choices: [
          { name: "Fried Chicken", priceDelta: 0, isDefault: true },
          { name: "Grilled Chicken Wings", priceDelta: 1000 },
          { name: "Grilled Chicken", priceDelta: 1000 },
        ],
      },
    ],
    pairings: ["sefofo-coca-cola"],
  }),
  mk("sefofo", "Continentals", "Assorted Jollof Rice", 10000, {
    description: "Jollof loaded with assorted meats.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C24E2A", "#4A1E10"],
    rating: [4.7, 121],
    options: [
      {
        name: "Chicken",
        choices: [
          { name: "Fried Chicken", priceDelta: 0, isDefault: true },
          { name: "Grilled Chicken Wings", priceDelta: 500 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("sefofo", "Continentals", "Jollof Rice Tulip Pack", 12000, {
    description: "The signature tulip pack — jollof stacked and styled to share.",
    tags: ["chefs-pick"],
    spiceLevel: 1,
    tone: ["#C24E2A", "#52200E"],
    rating: [4.8, 74],
    options: [],
    pairings: [],
  }),
  mk("sefofo", "Continentals", "Jollof with Chicken Wings & Plantain", 12000, {
    description: "Jollof with glazed chicken wings and sweet fried plantain.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C86A2A", "#42200E"],
    rating: [4.7, 69],
    options: [],
    pairings: [],
  }),
  mk("sefofo", "Continentals", "Jollof with Goat Meat, Plantain & Tomato Stew", 12000, {
    description: "Jollof with tender goat, fried plantain and rich tomato stew.",
    tags: [],
    spiceLevel: 1,
    tone: ["#A83E22", "#33160E"],
    rating: [4.8, 63],
    options: [],
    pairings: [],
  }),
  mk("sefofo", "Continentals", "Yam Chips", 10000, {
    description: "Golden yam chips with grilled chicken wings or fried tilapia.",
    tags: [],
    spiceLevel: 0,
    tone: ["#C88A2E", "#4A2E10"],
    rating: [4.6, 82],
    options: [
      {
        name: "Served with",
        choices: [
          { name: "Grilled Chicken Wings", priceDelta: 0, isDefault: true },
          { name: "Fried Tilapia", priceDelta: 0 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("sefofo", "Continentals", "Beef Sauce & Rice", 10000, {
    description: "Slow-cooked beef sauce over fried rice or jollof.",
    tags: [],
    spiceLevel: 1,
    tone: ["#9A4A22", "#2E160E"],
    rating: [4.6, 77],
    options: [
      {
        name: "Rice",
        choices: [
          { name: "Fried Rice", priceDelta: 0, isDefault: true },
          { name: "Jollof Rice", priceDelta: 0 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("sefofo", "Continentals", "Chicken Sauce & Rice", 10000, {
    description: "Hearty chicken sauce over fried rice or jollof.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C08A3A", "#42280F"],
    rating: [4.6, 71],
    options: [
      {
        name: "Rice",
        choices: [
          { name: "Fried Rice", priceDelta: 0, isDefault: true },
          { name: "Jollof Rice", priceDelta: 0 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("sefofo", "Continentals", "Fried Rice & Chicken", 9000, {
    description: "Wok-fired rice with fried chicken, grilled wings or grilled chicken.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C9A24B", "#5A4418"],
    rating: [4.7, 169],
    options: [
      {
        name: "Chicken",
        choices: [
          { name: "Fried Chicken", priceDelta: 0, isDefault: true },
          { name: "Grilled Chicken Wings", priceDelta: 1000 },
          { name: "Grilled Chicken", priceDelta: 1000 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("sefofo", "Continentals", "Assorted Fried Rice", 10000, {
    description: "Fried rice packed with assorted meats.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C9A24B", "#4A3818"],
    rating: [4.7, 118],
    options: [
      {
        name: "Chicken",
        choices: [
          { name: "Fried Chicken", priceDelta: 0, isDefault: true },
          { name: "Grilled Chicken Wings", priceDelta: 1000 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("sefofo", "Continentals", "Fried Rice Tulip Pack", 12000, {
    description: "Fried rice, tulip-packed and dressed to impress.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C9A24B", "#52400E"],
    rating: [4.7, 58],
    options: [],
    pairings: [],
  }),
  mk("sefofo", "Continentals", "Chicken Shawarma", 10000, {
    description: "Juicy chicken shawarma, toasted and loaded.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C08A3A", "#42280F"],
    rating: [4.7, 133],
    options: [SPICE],
    pairings: [],
  }),
  mk("sefofo", "Continentals", "Beef Shawarma", 10000, {
    description: "Marinated beef shawarma with garlic sauce and crunch.",
    tags: [],
    spiceLevel: 1,
    tone: ["#9A4A22", "#2E160E"],
    rating: [4.6, 104],
    options: [SPICE],
    pairings: [],
  }),
  mk("sefofo", "Continentals", "Assorted Meat Shawarma", 10000, {
    description: "The everything shawarma — assorted meats in one wrap.",
    tags: [],
    spiceLevel: 1,
    tone: ["#B08A4A", "#3A2C16"],
    rating: [4.7, 92],
    options: [SPICE],
    pairings: [],
  }),
  mk("sefofo", "Continentals", "French Fries", 10000, {
    description:
      "Crisp fries with fried chicken, grilled chicken wings or fried tilapia.",
    tags: [],
    spiceLevel: 0,
    tone: ["#D8B25A", "#4A3414"],
    rating: [4.6, 96],
    options: [
      {
        name: "Served with",
        choices: [
          { name: "Fried Chicken", priceDelta: 0, isDefault: true },
          { name: "Grilled Chicken Wings", priceDelta: 1000 },
          { name: "Fried Tilapia", priceDelta: 1000 },
        ],
      },
    ],
    pairings: [],
  }),
  mk("sefofo", "Continentals", "Assorted Noodles", 10000, {
    description: "Stir-fried noodles with assorted meats and vegetables.",
    tags: [],
    spiceLevel: 1,
    tone: ["#C9A24B", "#4A3418"],
    rating: [4.6, 84],
    options: [SPICE],
    pairings: [],
  }),
  mk("sefofo", "Continentals", "Assorted Spaghetti", 10500, {
    description: "Spaghetti tossed with assorted meats in a savoury sauce.",
    tags: [],
    spiceLevel: 1,
    tone: ["#B85A2A", "#3A1C10"],
    rating: [4.5, 67],
    options: [SPICE],
    pairings: [],
  }),

  /* ---- Platters ---- */
  mk("sefofo", "Platters", "Rose Platter", 55000, {
    description:
      "Continental platter that serves 5 — choose any 5 items from the menu options.",
    tags: ["chefs-pick"],
    spiceLevel: 1,
    tone: ["#C24E2A", "#4A160E"],
    featured: true,
    rating: [4.9, 41],
    options: [],
    pairings: [],
  }),
  mk("sefofo", "Platters", "Lily Platter", 35000, {
    description:
      "Local platter that serves 3 — choose 2 pots of soup and the swallows of your choice.",
    tags: [],
    spiceLevel: 2,
    tone: ["#6E7B3D", "#241E10"],
    rating: [4.8, 36],
    options: [],
    pairings: [],
  }),

  /* ---- Drinks & Cocktails ---- */
  drink("sefofo", "Water 500ml", 500, "Still mineral water, properly cold.", ["#3A6EA5", "#12283E"]),
  drink("sefofo", "Malta Guinness", 2500, "The classic malt — dark, sweet and ice-cold.", ["#4A2410", "#1E0E06"]),
  drink("sefofo", "Alvaro", 2500, "Lightly sparkling malt with a fruity finish.", ["#7A8A3A", "#2A2E14"]),
  drink("sefofo", "Coca-Cola", 1500, "Ice-cold Coke for the table.", ["#B02A1E", "#3A0E0A"]),
  drink("sefofo", "Sprite", 1500, "Crisp lemon-lime, served chilled.", ["#3A8A5E", "#12301E"]),
  drink("sefofo", "Panache", 2500, "Refreshing shandy-style sparkler.", ["#C9A24B", "#3E2C10"]),
  drink("sefofo", "Club Beer", 2500, "Ghana's own premium lager, ice-cold.", ["#C9A24B", "#3E2C10"], ["alcoholic"]),
  drink("sefofo", "Hunters Gold", 3000, "Crisp apple cider over ice.", ["#C88A2E", "#42280F"], ["alcoholic"]),
  drink("sefofo", "Savanna", 3000, "Dry premium cider, best served cold.", ["#D8B25A", "#4A3414"], ["alcoholic"]),
  drink("sefofo", "Club Shandy", 2500, "Beer and lemonade — easy drinking.", ["#D8B25A", "#3E2C10"], ["alcoholic"]),
  drink("sefofo", "Couscous Yoghurt", 2500, "Chilled, creamy couscous yoghurt.", ["#C9C2A4", "#3E3A2C"]),
  // Cocktails — GHC 80
  drink("sefofo", "Citrus Cooler", 8000, "House cocktail — bright citrus over crushed ice.", ["#C88A2E", "#42280F"], ["alcoholic"]),
  drink("sefofo", "Mojito", 8000, "Rum, mint, lime and soda — the classic.", ["#3A8A5E", "#123020"], ["alcoholic"]),
  drink("sefofo", "Cosmopolitan", 8000, "Vodka, cranberry and citrus, shaken cold.", ["#B02A4E", "#3A0E1A"], ["alcoholic"]),
  drink("sefofo", "Blue Lagoon", 8000, "Vodka and blue curaçao with a lemon kick.", ["#2A6EB0", "#0E223A"], ["alcoholic"]),
  drink("sefofo", "Sefotini", 8000, "The house martini — Sefofo's signature pour.", ["#8E1F3A", "#2E0E1A"], ["alcoholic"]),
  drink("sefofo", "Sex on the Beach", 8000, "Vodka, peach and a sunset of juices.", ["#C86A2A", "#42200E"], ["alcoholic"]),
  // Mocktails — GHC 70
  drink("sefofo", "Virgin Mojito", 7000, "All the mint and lime, none of the rum.", ["#3A8A5E", "#123020"]),
  drink("sefofo", "Kingfisher", 7000, "Fruity house mocktail, tall and cold.", ["#C24E2A", "#3A140E"]),
  drink("sefofo", "Milky Coconut", 7000, "Creamy coconut cooler — smooth and sweet.", ["#C9C2A4", "#3E3A2C"]),

  /* ---- Extras ---- */
  extra("sefofo", "Extra Banku", 500, "One extra ball of banku."),
  extra("sefofo", "Extra Akple", 500, "One extra ball of akple."),
  extra("sefofo", "Extra Abolo (5 pcs)", 4000, "Five pieces of soft steamed abolo."),
  extra("sefofo", "Extra Yakayake (3 pcs)", 2500, "Three portions of yakayake."),
  extra("sefofo", "Extra Eba", 500, "One extra serving of eba."),
  extra("sefofo", "Extra Full Tilapia", 12000, "A whole extra tilapia, grilled or fried."),
  extra("sefofo", "Extra Half Tilapia", 6000, "Half a tilapia on the side."),
  extra("sefofo", "Extra Goat Meat", 4000, "A side of tender goat meat."),
  extra("sefofo", "Extra Beef", 3000, "A side of seasoned beef."),
  extra("sefofo", "Extra Crab", 2000, "Add crab to your soup."),
  extra("sefofo", "Extra Chicken", 4000, "An extra piece of chicken."),
  extra("sefofo", "Extra Soup", 5000, "An extra bowl of soup."),
  extra("sefofo", "Extra Stew", 5000, "An extra portion of stew."),
  extra("sefofo", "Extra Fried Plantain", 3000, "Sweet fried plantain on the side."),
  extra("sefofo", "Extra Egg", 3000, "A boiled egg (or two) for the plate."),
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

function drink(
  brand: BrandKey,
  name: string,
  basePrice: number,
  description: string,
  tone: [string, string],
  tags: string[] = [],
): Product {
  const p = mk(brand, "Drinks & Cocktails", name, basePrice, {
    description,
    tags,
    spiceLevel: 0,
    tone,
    rating: [4.7, 40 + Math.round(basePrice / 200)],
    options: [],
    pairings: [],
  });
  return { ...p, prepMinutes: 5 };
}

function extra(brand: BrandKey, name: string, basePrice: number, description: string): Product {
  const p = mk(brand, "Extras", name, basePrice, {
    description,
    tags: [],
    spiceLevel: 0,
    tone: ["#8A6A2A", "#241A10"],
    rating: [4.6, 25],
    options: [],
    pairings: [],
  });
  return { ...p, prepMinutes: 10 };
}
