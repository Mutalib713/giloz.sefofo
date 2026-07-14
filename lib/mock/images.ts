/**
 * Imagery for the two brands — served from this repo (public/).
 *
 * Files are vendored by `scripts/vendor-images.mjs` via the "Vendor images"
 * GitHub Action: the brands' own Instagram photos (matched to dishes by post
 * caption), their Linktree logos, and Unsplash stand-ins for gaps. If a file
 * is missing (workflow not run yet / a source failed), the UI falls back to
 * the designed gradient — nothing breaks.
 *
 * Swap these paths for Cloudinary URLs later without touching any component.
 */

export const PRODUCT_IMAGES: Record<string, string> = {
  // Giloz — own Instagram
  "giloz-akple-ademe-soup": "/food/giloz-akple-ademe-soup.jpg",
  "giloz-banku-grilled-tilapia": "/food/giloz-banku-grilled-tilapia.jpg",
  "giloz-fufu-goat-light-soup": "/food/giloz-fufu-goat-light-soup.jpg",
  "giloz-fetri-detsi-banku": "/food/giloz-fetri-detsi-banku.jpg",
  "giloz-palmnut-soup-fufu": "/food/giloz-palmnut-soup-fufu.jpg",
  "giloz-assorted-fried-rice": "/food/giloz-assorted-fried-rice.jpg",
  "giloz-grilled-chicken-yam-chips": "/food/giloz-grilled-chicken-yam-chips.jpg",
  // Giloz — stand-ins
  "giloz-giloz-jollof-chicken": "/food/giloz-giloz-jollof-chicken.jpg",
  "giloz-waakye-special": "/food/giloz-waakye-special.jpg",
  "giloz-khebab-platter": "/food/giloz-khebab-platter.jpg",
  "giloz-kelewele": "/food/giloz-kelewele.jpg",
  "giloz-naturia-sobolo": "/food/naturia-sobolo.jpg",

  // Sefofo — own Instagram
  "sefofo-abolo-one-man-thousand": "/food/sefofo-abolo-one-man-thousand.jpg",
  "sefofo-kontomire-palava-yam": "/food/sefofo-kontomire-palava-yam.jpg",
  "sefofo-banku-okro-stew": "/food/sefofo-banku-okro-stew.jpg",
  "sefofo-konkonte-groundnut-soup": "/food/sefofo-konkonte-groundnut-soup.jpg",
  "sefofo-yakayake-ademe": "/food/sefofo-yakayake-ademe.jpg",
  "sefofo-sefofo-jollof-chicken": "/food/sefofo-sefofo-jollof-chicken.jpg",
  "sefofo-naturia-sobolo": "/food/naturia-sobolo.jpg",
  // Sefofo — stand-ins
  "sefofo-red-red-fried-plantain": "/food/sefofo-red-red-fried-plantain.jpg",
  "sefofo-ampesi-garden-egg-stew": "/food/sefofo-ampesi-garden-egg-stew.jpg",
  "sefofo-gari-beans": "/food/sefofo-gari-beans.jpg",
  "sefofo-kelewele": "/food/sefofo-kelewele.jpg",
  // (naturia tamarind + pineapple-ginger keep the designed gradient until the
  //  owners share real Naturia bottle photography)
};

export const BRAND_LOGOS: Record<string, string> = {
  giloz: "/brands/giloz-logo.jpg",
  sefofo: "/brands/sefofo-logo.jpg",
};

export const BRAND_HERO: Record<string, string> = {
  giloz: "/food/hero-giloz.jpg",
  sefofo: "/food/hero-sefofo.jpg",
};
