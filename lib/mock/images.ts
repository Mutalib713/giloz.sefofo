/**
 * Imagery for the two brands — served from this repo (public/).
 *
 * Product keys are the slugs generated in lib/mock/menu.ts from the REAL
 * printed menus. Photos come from, in order of preference:
 *  1. the brands' own Instagram posts (@giloz_restaurant / @sefofo.rlg),
 *  2. free-media photos of the authentic dish (Wikimedia Commons etc.).
 * Several menu variants share one photo of the same dish (e.g. Ademe at both
 * kitchens). If a file is missing the UI falls back to the designed gradient
 * — nothing breaks. Swap these paths for Cloudinary URLs later without
 * touching a single component.
 */

export const PRODUCT_IMAGES: Record<string, string> = {
  // ---- Giloz ----
  "giloz-super-fried-rice": "/food/fried-rice-chicken.jpg",
  "giloz-fried-rice-with-beef-sauce": "/food/beef-sauce-rice.jpg",
  "giloz-fried-rice-with-chicken-sauce": "/food/chicken-sauce-rice.jpg",
  "giloz-assorted-fried-rice": "/food/giloz-assorted-fried-rice.jpg", // their IG
  "giloz-egg-fried-rice": "/food/egg-fried-rice.jpg",
  "giloz-beef-fried-rice": "/food/beef-sauce-rice.jpg",
  "giloz-superb-jollof": "/food/giloz-jollof.jpg", // their IG
  "giloz-jollof-with-beef-sauce": "/food/jollof-beef.jpg",
  "giloz-jollof-with-chicken-sauce": "/food/jollof-chicken.jpg",
  "giloz-assorted-jollof": "/food/jollof-assorted.jpg",
  "giloz-jollof-with-chicken": "/food/jollof-chicken.jpg",
  "giloz-beef-jollof": "/food/jollof-beef.jpg",
  "giloz-assorted-noodles": "/food/assorted-noodles.jpg",
  "giloz-assorted-spaghetti": "/food/assorted-spaghetti.jpg",
  "giloz-shawarma-mix": "/food/shawarma.jpg",
  "giloz-beef-shawarma": "/food/shawarma.jpg",
  "giloz-chicken-shawarma": "/food/shawarma.jpg",
  "giloz-french-fries-chicken": "/food/french-fries-chicken.jpg",
  "giloz-yam-chips": "/food/giloz-yam-chips.jpg", // their IG
  "giloz-totonyanya": "/food/totonyanya.jpg",
  "giloz-gbomanyanya": "/food/gbomanyanya.jpg",
  "giloz-oiless-okro": "/food/okro-soup.jpg",
  "giloz-okro": "/food/okro-soup.jpg",
  "giloz-oiless-ademe": "/food/ademe.jpg",
  "giloz-ademe": "/food/ademe.jpg", // their IG (akple & ademe)
  "giloz-okro-stew": "/food/okro-stew-banku.jpg", // their IG
  "giloz-detsififi": "/food/detsififi.jpg",
  "giloz-eba-with-egusi": "/food/eba-egusi.jpg",
  "giloz-eba-with-okro": "/food/okro-soup.jpg",
  "giloz-attieke": "/food/giloz-attieke.jpg", // their IG
  "giloz-boiled-yam": "/food/giloz-boiled-yam.jpg", // their IG
  "giloz-garifotor": "/food/garifotor.jpg",
  "giloz-aborbitadi": "/food/aborbitadi.jpg",
  "giloz-hot-pepper-tilapia": "/food/tilapia-hot-pepper.jpg",
  "giloz-fetri-toto": "/food/giloz-fetri-toto.jpg", // their IG (fetri detsi)
  "giloz-chicken-salad": "/food/giloz-chicken-salad.jpg", // their IG
  "giloz-potato-salad": "/food/potato-salad.jpg",
  "giloz-vegetable-salad": "/food/vegetable-salad.jpg",

  // ---- Sefofo ----
  "sefofo-ademe": "/food/ademe.jpg",
  "sefofo-oil-less-ademe": "/food/ademe.jpg",
  "sefofo-okro-soup": "/food/sefofo-okro-banku.jpg", // their IG
  "sefofo-oil-less-okro-soup": "/food/okro-soup.jpg",
  "sefofo-oil-less-ademe-okro-mix": "/food/ademe.jpg",
  "sefofo-waakye-special": "/food/waakye.jpg",
  "sefofo-gbatakpa": "/food/sefofo-gbatakpa.jpg", // their IG
  "sefofo-gbomanyanya": "/food/gbomanyanya.jpg",
  "sefofo-aborbitadi": "/food/sefofo-aborbitadi.jpg", // their IG
  "sefofo-detsififi": "/food/detsififi.jpg",
  "sefofo-abolo": "/food/sefofo-abolo.jpg", // their IG
  "sefofo-yakayake": "/food/sefofo-yakayake.jpg", // their IG
  "sefofo-fufu-light-soup": "/food/sefofo-fufu.jpg", // their IG
  "sefofo-boiled-yam": "/food/sefofo-boiled-yam.jpg", // their IG
  "sefofo-attieke": "/food/giloz-attieke.jpg",
  "sefofo-garifotor-with-grilled-turkey-wings": "/food/garifotor-turkey.jpg",
  "sefofo-aborbi-dzenkple": "/food/aborbi-dzenkple.jpg",
  "sefofo-tilapia-hot-pepper": "/food/tilapia-hot-pepper.jpg",
  "sefofo-fetri-toto": "/food/fetri-toto.jpg",
  "sefofo-eba-with-egusi": "/food/eba-egusi.jpg",
  "sefofo-jollof-rice-chicken": "/food/sefofo-jollof.jpg", // their IG
  "sefofo-assorted-jollof-rice": "/food/sefofo-assorted-jollof.jpg", // their IG
  "sefofo-jollof-rice-tulip-pack": "/food/jollof-tulip.jpg",
  "sefofo-jollof-with-chicken-wings-plantain": "/food/jollof-wings-plantain.jpg",
  "sefofo-jollof-with-goat-meat-plantain-tomato-stew": "/food/jollof-goat-plantain.jpg",
  "sefofo-yam-chips": "/food/giloz-yam-chips.jpg",
  "sefofo-beef-sauce-rice": "/food/beef-sauce-rice.jpg",
  "sefofo-chicken-sauce-rice": "/food/chicken-sauce-rice.jpg",
  "sefofo-fried-rice-chicken": "/food/fried-rice-chicken.jpg",
  "sefofo-assorted-fried-rice": "/food/giloz-assorted-fried-rice.jpg",
  "sefofo-fried-rice-tulip-pack": "/food/fried-rice-tulip.jpg",
  "sefofo-chicken-shawarma": "/food/shawarma.jpg",
  "sefofo-beef-shawarma": "/food/shawarma.jpg",
  "sefofo-assorted-meat-shawarma": "/food/shawarma.jpg",
  "sefofo-french-fries": "/food/french-fries-chicken.jpg",
  "sefofo-assorted-noodles": "/food/assorted-noodles.jpg",
  "sefofo-assorted-spaghetti": "/food/assorted-spaghetti.jpg",
  "sefofo-rose-platter": "/food/rose-platter.jpg",
  "sefofo-lily-platter": "/food/lily-platter.jpg",
  // Drinks
  "sefofo-water-500ml": "/food/drinks-water.jpg",
  "sefofo-malta-guinness": "/food/drinks-malta.jpg",
  "sefofo-alvaro": "/food/drinks-alvaro.jpg",
  "sefofo-coca-cola": "/food/drinks-soft.jpg",
  "sefofo-sprite": "/food/drinks-sprite.jpg",
  "sefofo-panache": "/food/drinks-panache.jpg",
  "sefofo-club-beer": "/food/drinks-beer.jpg",
  "sefofo-hunters-gold": "/food/drinks-cider.jpg",
  "sefofo-savanna": "/food/drinks-savanna.jpg",
  "sefofo-club-shandy": "/food/drinks-shandy.jpg",
  "sefofo-couscous-yoghurt": "/food/drinks-yoghurt.jpg",
  "sefofo-citrus-cooler": "/food/cocktail-citrus.jpg",
  "sefofo-mojito": "/food/cocktail-mojito.jpg",
  "sefofo-cosmopolitan": "/food/cocktail-cosmopolitan.jpg",
  "sefofo-blue-lagoon": "/food/cocktail-blue-lagoon.jpg",
  "sefofo-sefotini": "/food/cocktail-martini.jpg",
  "sefofo-sex-on-the-beach": "/food/cocktail-sex-on-the-beach.jpg",
  "sefofo-virgin-mojito": "/food/cocktail-mojito.jpg",
  "sefofo-kingfisher": "/food/cocktail-kingfisher.jpg",
  "sefofo-milky-coconut": "/food/cocktail-coconut.jpg",
  // Extras
  "sefofo-extra-banku": "/food/extra-banku.jpg",
  "sefofo-extra-akple": "/food/extra-akple.jpg",
  "sefofo-extra-abolo-5-pcs": "/food/sefofo-abolo.jpg",
  "sefofo-extra-yakayake-3-pcs": "/food/sefofo-yakayake.jpg",
  "sefofo-extra-eba": "/food/extra-eba.jpg",
  "sefofo-extra-full-tilapia": "/food/extra-tilapia.jpg",
  "sefofo-extra-half-tilapia": "/food/extra-tilapia.jpg",
  "sefofo-extra-fried-plantain": "/food/extra-plantain.jpg",
  "sefofo-extra-egg": "/food/extra-egg.jpg",
};

export const BRAND_LOGOS: Record<string, string> = {
  giloz: "/brands/giloz-logo.jpg",
  sefofo: "/brands/sefofo-logo.jpg",
};

export const BRAND_HERO: Record<string, string> = {
  giloz: "/food/hero-giloz.jpg",
  sefofo: "/food/hero-sefofo.jpg",
};

/** Photos of the actual restaurant entrances — used on the "Visit Giloz / Sefofo" cards. */
export const BRAND_VENUE: Record<string, string> = {
  giloz: "/brands/giloz-venue.jpg",
  sefofo: "/brands/sefofo-venue.jpg",
};
