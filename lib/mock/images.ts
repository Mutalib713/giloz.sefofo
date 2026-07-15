/**
 * Imagery for the two brands — served from this repo (public/).
 *
 * Product keys are the slugs generated in lib/mock/menu.ts from the REAL
 * printed menus. Every mapped file exists in public/; photos come from,
 * in order of preference:
 *  1. the brands' own Instagram posts (@giloz_restaurant / @sefofo.rlg),
 *  2. their Google Maps listings (owner/customer photos of the actual food),
 *  3. free-media photos of the authentic dish (a few legacy Wikimedia shots).
 * Several menu variants share one photo of the same dish. Products without
 * a verified photo are deliberately unmapped — the UI shows its designed
 * gradient rather than a wrong picture. Swap paths for Cloudinary later
 * without touching a single component.
 *
 * Candidate sources are recorded in scripts/image-candidates.json; the
 * fetch-candidates workflow re-harvests them on demand.
 */

export const PRODUCT_IMAGES: Record<string, string> = {
  // ---- Giloz ----
  "giloz-super-fried-rice": "/food/fried-rice-chicken.jpg", // their IG
  "giloz-fried-rice-with-beef-sauce": "/food/beef-sauce-rice.jpg", // their Maps
  "giloz-fried-rice-with-chicken-sauce": "/food/chicken-sauce-rice.jpg", // their Maps
  "giloz-assorted-fried-rice": "/food/giloz-assorted-fried-rice.jpg", // their IG
  "giloz-egg-fried-rice": "/food/egg-fried-rice.jpg", // their Maps
  "giloz-beef-fried-rice": "/food/beef-sauce-rice.jpg", // their Maps
  "giloz-superb-jollof": "/food/giloz-jollof.jpg",
  "giloz-jollof-with-beef-sauce": "/food/jollof-assorted.jpg", // their IG
  "giloz-jollof-with-chicken-sauce": "/food/jollof-chicken.jpg", // their IG
  "giloz-assorted-jollof": "/food/jollof-assorted.jpg", // their IG
  "giloz-jollof-with-chicken": "/food/jollof-chicken.jpg", // their IG
  "giloz-beef-jollof": "/food/jollof-assorted.jpg", // their IG
  "giloz-assorted-spaghetti": "/food/assorted-spaghetti.jpg", // their IG (beef pasta)
  "giloz-shawarma-mix": "/food/shawarma.jpg", // their Maps
  "giloz-beef-shawarma": "/food/shawarma.jpg", // their Maps
  "giloz-chicken-shawarma": "/food/shawarma.jpg", // their Maps
  "giloz-french-fries-chicken": "/food/french-fries-chicken.jpg", // their IG
  "giloz-yam-chips": "/food/giloz-yam-chips.jpg", // their IG
  "giloz-totonyanya": "/food/totonyanya.jpg", // their IG
  "giloz-gbomanyanya": "/food/gbomanyanya.jpg", // their IG
  "giloz-oiless-okro": "/food/okro-oiless.jpg", // sefofo IG (same dish)
  "giloz-okro": "/food/okro-soup.jpg", // their IG
  "giloz-oiless-ademe": "/food/ademe.jpg", // their IG
  "giloz-ademe": "/food/ademe.jpg", // their IG
  "giloz-okro-stew": "/food/okro-soup.jpg", // their IG
  "giloz-detsififi": "/food/detsififi.jpg", // their IG
  "giloz-eba-with-egusi": "/food/eba-egusi.jpg", // their Maps
  "giloz-eba-with-okro": "/food/okro-soup.jpg", // their IG
  "giloz-attieke": "/food/giloz-attieke.jpg", // their IG
  "giloz-boiled-yam": "/food/giloz-boiled-yam.jpg", // their IG
  "giloz-garifotor": "/food/garifotor.jpg", // their IG
  "giloz-aborbitadi": "/food/aborbitadi.jpg", // sefofo IG (same dish)
  "giloz-hot-pepper-tilapia": "/food/giloz-tilapia-pepper.jpg", // their Maps
  "giloz-fetri-toto": "/food/giloz-fetri-toto.jpg", // their IG
  "giloz-chicken-salad": "/food/giloz-chicken-salad.jpg", // their IG
  "giloz-potato-salad": "/food/potato-salad.jpg", // their IG

  // ---- Sefofo ----
  "sefofo-ademe": "/food/sefofo-ademe.jpg", // their IG
  "sefofo-oil-less-ademe": "/food/sefofo-ademe.jpg", // their IG
  "sefofo-okro-soup": "/food/sefofo-okro-banku.jpg", // their IG
  "sefofo-oil-less-okro-soup": "/food/okro-oiless.jpg", // their IG
  "sefofo-oil-less-ademe-okro-mix": "/food/sefofo-ademe.jpg", // their IG
  "sefofo-waakye-special": "/food/waakye.jpg",
  "sefofo-gbatakpa": "/food/sefofo-gbatakpa.jpg", // their IG
  "sefofo-gbomanyanya": "/food/gbomanyanya.jpg", // giloz IG (same dish)
  "sefofo-aborbitadi": "/food/sefofo-aborbitadi.jpg", // their IG
  "sefofo-detsififi": "/food/detsififi.jpg", // giloz IG (same dish)
  "sefofo-abolo": "/food/sefofo-abolo.jpg", // their IG (abolo, gravy & wings)
  "sefofo-yakayake": "/food/sefofo-yakayake.jpg", // their IG (yakayake & wings)
  "sefofo-fufu-light-soup": "/food/sefofo-fufu.jpg", // their IG
  "sefofo-boiled-yam": "/food/sefofo-boiled-yam.jpg", // their IG
  "sefofo-attieke": "/food/giloz-attieke.jpg", // giloz IG (same dish)
  "sefofo-garifotor-with-grilled-turkey-wings": "/food/garifotor.jpg", // giloz IG
  "sefofo-tilapia-hot-pepper": "/food/tilapia-hot-pepper.jpg", // their IG
  "sefofo-fetri-toto": "/food/fetri-toto.jpg", // their IG
  "sefofo-eba-with-egusi": "/food/eba-egusi.jpg", // their Maps
  "sefofo-jollof-rice-chicken": "/food/jollof-chicken.jpg", // their IG
  "sefofo-assorted-jollof-rice": "/food/sefofo-assorted-jollof.jpg", // their IG
  "sefofo-yam-chips": "/food/giloz-yam-chips.jpg", // giloz IG (same dish)
  "sefofo-beef-sauce-rice": "/food/beef-sauce-rice.jpg", // giloz Maps
  "sefofo-chicken-sauce-rice": "/food/chicken-sauce-rice.jpg", // giloz Maps
  "sefofo-fried-rice-chicken": "/food/fried-rice-chicken.jpg", // giloz IG
  "sefofo-assorted-fried-rice": "/food/giloz-assorted-fried-rice.jpg", // giloz IG
  "sefofo-chicken-shawarma": "/food/french-fries-chicken.jpg", // their IG
  "sefofo-beef-shawarma": "/food/french-fries-chicken.jpg", // their IG
  "sefofo-assorted-meat-shawarma": "/food/french-fries-chicken.jpg", // their IG
  "sefofo-french-fries": "/food/french-fries-chicken.jpg", // their IG
  "sefofo-assorted-spaghetti": "/food/assorted-spaghetti.jpg", // giloz IG
  "sefofo-rose-platter": "/food/sefofo-assorted-jollof.jpg", // their IG (sharing tray)
  "sefofo-lily-platter": "/food/lily-platter.jpg", // their Maps
  // Drinks with real photos (rest keep their designed gradients)
  "sefofo-coca-cola": "/food/drinks-soft.jpg",
  "sefofo-club-beer": "/food/drinks-beer.jpg",
  "sefofo-citrus-cooler": "/food/cocktail-kingfisher.jpg", // their Maps (bar duo)
  "sefofo-mojito": "/food/cocktail-mojito.jpg", // their IG
  "sefofo-cosmopolitan": "/food/cocktail-blue-lagoon.jpg", // their IG
  "sefofo-blue-lagoon": "/food/cocktail-blue-lagoon.jpg", // their IG
  "sefofo-virgin-mojito": "/food/cocktail-mojito.jpg", // their IG
  "sefofo-kingfisher": "/food/cocktail-kingfisher.jpg", // their Maps
  "sefofo-milky-coconut": "/food/cocktail-coconut.jpg", // their IG
  // Extras with real photos
  "sefofo-extra-akple": "/food/extra-akple.jpg", // their IG
  "sefofo-extra-abolo-5-pcs": "/food/sefofo-abolo.jpg", // their IG
  "sefofo-extra-yakayake-3-pcs": "/food/sefofo-yakayake.jpg", // their IG
  "sefofo-extra-full-tilapia": "/food/tilapia-hot-pepper.jpg", // their IG
  "sefofo-extra-half-tilapia": "/food/tilapia-hot-pepper.jpg", // their IG
  "sefofo-extra-soup": "/food/sefofo-light-soup-bowl.jpg", // their Maps
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
  giloz: "/brands/giloz-venue.jpg", // their IG: storefront with the "Welcome to Giloz" sign
  sefofo: "/brands/sefofo-venue.jpg", // Google Maps: SEFOFO signage over the entrance
};
