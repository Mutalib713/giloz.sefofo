/**
 * Imagery for the two brands — served from this repo (public/).
 *
 * Files are vendored by `scripts/vendor-images.mjs` via the "Vendor images"
 * GitHub Action: the brands' own Instagram photos (matched to dishes by post
 * caption), Wikimedia Commons photos of the authentic Ghanaian dishes, and a
 * couple of Unsplash stand-ins. If a file is missing (workflow not run yet /
 * a source failed), the UI falls back to the designed gradient — nothing
 * breaks. Swap these paths for Cloudinary URLs later without touching a
 * single component.
 *
 * Packaged drinks (malt, minerals, water, beer, tamarind, pineapple-ginger)
 * intentionally keep their designed colour gradients.
 */

export const PRODUCT_IMAGES: Record<string, string> = {
  // ---- Giloz ----
  "giloz-akple-ademe-soup": "/food/giloz-akple-ademe-soup.jpg", // their IG
  "giloz-banku-grilled-tilapia": "/food/giloz-banku-grilled-tilapia.jpg", // Wikimedia
  "giloz-fufu-goat-light-soup": "/food/giloz-fufu-goat-light-soup.jpg", // Wikimedia
  "giloz-fetri-detsi-banku": "/food/giloz-fetri-detsi-banku.jpg", // their IG
  "giloz-palmnut-soup-fufu": "/food/giloz-palmnut-soup-fufu.jpg", // their IG
  "giloz-giloz-jollof-chicken": "/food/giloz-giloz-jollof-chicken.jpg", // Unsplash
  "giloz-waakye-special": "/food/giloz-waakye-special.jpg", // Wikimedia
  "giloz-assorted-fried-rice": "/food/giloz-assorted-fried-rice.jpg", // their IG
  "giloz-grilled-chicken-yam-chips": "/food/giloz-grilled-chicken-yam-chips.jpg", // their IG
  "giloz-attieke-grilled-tilapia": "/food/giloz-attieke-grilled-tilapia.jpg", // their IG
  "giloz-kenkey-fried-fish": "/food/giloz-kenkey-fried-fish.jpg", // Wikimedia
  "giloz-boiled-yam-egg-stew": "/food/giloz-boiled-yam-egg-stew.jpg", // their IG
  "giloz-garifoto": "/food/giloz-garifoto.jpg", // their IG
  "giloz-chicken-salad": "/food/giloz-chicken-salad.jpg", // their IG
  "giloz-khebab-platter": "/food/giloz-khebab-platter.jpg", // Wikimedia
  "giloz-kelewele": "/food/giloz-kelewele.jpg", // Wikimedia
  "giloz-naturia-sobolo": "/food/naturia-sobolo.jpg", // their IG

  // ---- Sefofo ----
  "sefofo-red-red-fried-plantain": "/food/sefofo-red-red-fried-plantain.jpg", // Wikimedia
  "sefofo-abolo-one-man-thousand": "/food/sefofo-abolo-one-man-thousand.jpg", // their IG
  "sefofo-kontomire-palava-yam": "/food/sefofo-kontomire-palava-yam.jpg", // Wikimedia
  "sefofo-ampesi-garden-egg-stew": "/food/sefofo-ampesi-garden-egg-stew.jpg", // Wikimedia
  "sefofo-banku-okro-stew": "/food/sefofo-banku-okro-stew.jpg", // their IG
  "sefofo-konkonte-groundnut-soup": "/food/sefofo-konkonte-groundnut-soup.jpg", // Wikimedia
  "sefofo-yakayake-ademe": "/food/sefofo-yakayake-ademe.jpg", // their IG
  "sefofo-sefofo-jollof-chicken": "/food/sefofo-sefofo-jollof-chicken.jpg", // their IG
  "sefofo-gari-beans": "/food/sefofo-gari-beans.jpg", // Wikimedia
  "sefofo-kelewele": "/food/sefofo-kelewele.jpg", // Wikimedia
  "sefofo-gbatakpa": "/food/sefofo-gbatakpa.jpg", // their IG
  "sefofo-aborbitadi": "/food/sefofo-aborbitadi.jpg", // their IG
  "sefofo-fufu-soup-sefofo-special": "/food/sefofo-fufu-special.jpg", // their IG
  "sefofo-boiled-yam-stew": "/food/sefofo-boiled-yam-stew.jpg", // their IG
  "sefofo-village-dawadawa-jollof": "/food/sefofo-village-dawadawa-jollof.jpg", // their IG
  "sefofo-naturia-sobolo": "/food/naturia-sobolo.jpg", // their IG
};

export const BRAND_LOGOS: Record<string, string> = {
  giloz: "/brands/giloz-logo.jpg",
  sefofo: "/brands/sefofo-logo.jpg",
};

export const BRAND_HERO: Record<string, string> = {
  giloz: "/food/hero-giloz.jpg",
  sefofo: "/food/hero-sefofo.jpg",
};
