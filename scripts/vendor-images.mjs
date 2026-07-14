/**
 * Vendors food photos + brand logos into the repo (public/).
 *
 * Runs in GitHub Actions (see .github/workflows/vendor-images.yml), where the
 * runner has open internet access. Sources, in order of preference:
 *  1. the brands' own Instagram posts (matched to dishes by caption),
 *  2. Wikimedia Commons — direct files for authentic Ghanaian dishes, or a
 *     scored `wmSearch(...)` lookup for photos we have no exact filename for
 *     (packaged drinks, restaurant venues),
 *  3. Unsplash stand-ins.
 * Failures are skipped (the UI falls back to a designed gradient), so an
 * expired URL or an empty search can never break the build. For Wikimedia
 * thumbs, the script retries the original file if the sized thumb is absent.
 *
 * Idempotent: a file that already exists in public/ is kept, so good photos
 * survive re-runs and expired Instagram links aren't re-fetched. To re-vendor
 * something, delete the file (and, for a search, tweak its keyword) and push.
 *
 * Later, swap these local files for Cloudinary URLs without touching the UI.
 */
import { access, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const u = (id) => `https://images.unsplash.com/${id}?w=1200&q=75&auto=format&fit=crop`;
/** wikimedia commons: hash path + filename → 1200px thumb (original as fallback) */
const wm = (hashPath, file) =>
  `https://upload.wikimedia.org/wikipedia/commons/thumb/${hashPath}/${file}/1200px-${file}`;
/** wikimedia commons file by name (Special:FilePath redirects to the real URL) */
const fp = (file) => `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=1400`;
/** resolve at build time: search Wikimedia Commons for the first good photo */
const wmSearch = (keyword) => `wmsearch:${keyword}`;

/** file (under public/) → source URL */
const MANIFEST = {
  // --- brand logos (Linktree avatars) ---
  "brands/giloz-logo.jpg":
    "https://ugc.production.linktr.ee/4c921884-4639-41c7-a6ad-94f632567810_WhatsApp-Image-2024-04-30-at-7.21.45-PM.jpeg",
  "brands/sefofo-logo.jpg":
    "https://ugc.production.linktr.ee/a45e3cd8-25c5-4a76-ad5b-a71c43d4fe13_PHOTO-2024-10-02-21-43-29.jpeg",

  // --- Giloz: own Instagram ---
  "food/giloz-akple-ademe-soup.jpg":
    "https://scontent-sjc6-1.cdninstagram.com/v/t51.82787-15/622591805_18067119137225457_8121421705800879647_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-sjc6-1.cdninstagram.com&_nc_cat=109&_nc_oc=Q6cZ2gH8Dg1ZirgjciASalBeS3gcR54mz0PEynghQawurq4qB0pRzjEyq2-uWanRYrxjyt4&_nc_ohc=Cpo2kSTSpE8Q7kNvwHk9Rae&_nc_gid=5VnQ656HWWQdeilQGQ6iHQ&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQBUxbcEy59IZuS2icMiMm5z6zdj4Q3Lq6EEm4fUFSQEsg&oe=6A5AB0D0&_nc_sid=c6f216",
  "food/giloz-attieke-grilled-tilapia.jpg":
    "https://scontent-iad3-1.cdninstagram.com/v/t51.71878-15/502726735_1406506453948340_8294294251556146138_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2gHEQC2e2VItJzirFwYFc1trsBsgY0BerWLVbzqvM_GdvVb3VDci4czq8n_VxrpwNzc&_nc_ohc=mZ2dqsmuylsQ7kNvwHuXcAd&_nc_gid=jYd6MRMdYKClDKf3DMiORA&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQDcWT-RhLoz5nH0yTD47cmm0hPpthX6xBa9TaVLhYBwGw&oe=6A5AD066&_nc_sid=c6f216",
  "food/giloz-fetri-detsi-banku.jpg":
    "https://scontent-lga3-1.cdninstagram.com/v/t51.71878-15/501653085_631018716639995_5375700843775097017_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=111&_nc_oc=Q6cZ2gFtyIsSeSJyWpYBAdshI5CKCj__aRgDRTJhE_onrDZtIaqPRNv7OPSM676f0-PuhM4&_nc_ohc=88zMqcJ98loQ7kNvwHl7tJR&_nc_gid=xM45_Nwey_mPkRzzpyiyrg&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQCCpzGNGbknQd63WDBH31rI3mFmlZBg7HgQf-nAcnoEhA&oe=6A5AB972&_nc_sid=c6f216",
  "food/giloz-palmnut-soup-fufu.jpg":
    "https://scontent-iad3-2.cdninstagram.com/v/t51.82787-15/623280921_18067710710631675_4724083058166092284_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_cat=103&_nc_oc=Q6cZ2gHMqyt1NRm6FhIZiamN7pnQZsAoO7wuJ9w9s4Gx3XeUf2WSyFiXdugyEX-LvtDVcDM&_nc_ohc=dCSCL-9lyGoQ7kNvwG3WVmt&_nc_gid=UHwbqzFsX07iScsG_4lv8w&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQDGnAEKteVRN2ZUBi9VL5ZDjR6w_1nCcFQuEO8332THeg&oe=6A5AC923&_nc_sid=c6f216",
  "food/giloz-assorted-fried-rice.jpg":
    "https://scontent-iad6-1.cdninstagram.com/v/t51.71878-15/499717600_1647463486644138_39944582952825257_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-iad6-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gGWPQuSMbX9w_UR03QHSktnHF5prZSxGQKwAzCqfB1N_pT4sS2L1cy0sK_P0VMDrEg&_nc_ohc=47q4l08qtdgQ7kNvwGJfEzm&_nc_gid=i8vrrTMGUTa0eyZe7rFk_A&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQCR9cmPGSpp004s1-FRegRtLPVY3rAPfW27lDdGS2L9zA&oe=6A5AC5D2&_nc_sid=c6f216",
  "food/giloz-grilled-chicken-yam-chips.jpg":
    "https://scontent-iad3-2.cdninstagram.com/v/t51.71878-15/498551551_1030358898659051_1530117324515809554_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_cat=111&_nc_oc=Q6cZ2gFP1TzE6D95I09TlVuw7o4askwGzfXacKR-eI2-y78wt-ZcaeUMwFpoRT_WkvRsCmE&_nc_ohc=k3VmZOUjWZsQ7kNvwG2ua-U&_nc_gid=jVb2UAyYl9K8RvC3BHJT0Q&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQAnt_N6kBaGktOYnhgQoXTPDTWuY3_vil7fGDEP8IszJA&oe=6A5AA999&_nc_sid=c6f216",
  "food/giloz-boiled-yam-egg-stew.jpg":
    "https://scontent-den2-1.cdninstagram.com/v/t51.71878-15/502086894_3072203762926957_8954379514213121343_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gFoNyCjOn9lc6aSs4icJ-9OeXBBwqmZ_xVDERX1uPK4h2nMEEnw5lZlrxbR3aIkOOg&_nc_ohc=e8GD_XVkN8gQ7kNvwE_FnVS&_nc_gid=_M-QTsB-6dxyJpGoLgq3Og&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQBc-1Guu5o8acgnp-ij_XDS9aGh2GoXrCb8cL7rFcX4gA&oe=6A5AA53E&_nc_sid=c6f216",
  "food/giloz-chicken-salad.jpg":
    "https://scontent-sjc6-1.cdninstagram.com/v/t51.71878-15/503024347_2187661938348217_2311618439783149046_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-sjc6-1.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gF06YOsaALb-WqOfXUbbxjyA8JEGTqFr4GSNmvuC3tTp4Bo_biXRtQ4TjYBnVKDddY&_nc_ohc=Y-Hx9z8U1esQ7kNvwHW5MwF&_nc_gid=hY1-TrSzZjR3BTjFr4VJUQ&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQBajiBz1l3KPqQCZOsD2TTJlJME3ODe2ZFr4Ags1bxSeQ&oe=6A5AD410&_nc_sid=c6f216",
  "food/hero-giloz.jpg":
    "https://scontent-ord5-1.cdninstagram.com/v/t51.71878-15/503875811_712999631479967_6270686632988035438_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-ord5-1.cdninstagram.com&_nc_cat=111&_nc_oc=Q6cZ2gG1-1Goq-V9c2K4sg8VmxFFIaiwbTij29i3FCbhL73RZFO3vvVKk5Whq4tlonwjJ3k&_nc_ohc=4blUSdrUfrMQ7kNvwEeDcti&_nc_gid=O726NyZ2pg9go5TGUCENXQ&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQDL1FFebGM9mbEKZ5BYWbUHtf_pKLDxkvmXGifwZv00Bw&oe=6A5A9EFD&_nc_sid=c6f216",

  // --- Giloz: Wikimedia Commons (authentic dishes) ---
  "food/giloz-banku-grilled-tilapia.jpg": wm("b/bf", "Grilled_tilapia_with_banku.jpg"),
  "food/giloz-fufu-goat-light-soup.jpg": wm(
    "5/58",
    "Ghanaian_Fufuo_in_light_%28tomato%29_soup_with_goat.jpg",
  ),
  "food/giloz-waakye-special.jpg": wm("c/c0", "Waakye_2.jpg"),
  "food/giloz-khebab-platter.jpg": wm("2/20", "Akan_Ghanaian_style_Spicy_Grilled_Kebab.jpg"),
  "food/giloz-kelewele.jpg": wm("3/37", "Kelewele.jpg"),
  "food/giloz-kenkey-fried-fish.jpg": wm("0/0d", "Kenkey.jpg"),

  // --- Giloz: Unsplash (kept — verified great) ---
  "food/giloz-giloz-jollof-chicken.jpg": u("photo-1665332195309-9d75071138f0"),

  // --- Sefofo: own Instagram ---
  "food/sefofo-abolo-one-man-thousand.jpg":
    "https://instagram.foma1-2.fna.fbcdn.net/v/t51.71878-15/567431173_1497760434704279_3094060932165239105_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=instagram.foma1-2.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2gHfmhJ-G8UzgeGOHGgFEXM0DWRpH9FcQE3dLdqvpP7SsBI-Kyr9HwJw2CQJNzS8mCY&_nc_ohc=gv6WI8P9r3EQ7kNvwGuO4wh&_nc_gid=CgMyCeD4FCW-40DjAquw3A&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQD2TbPmnSo-xF9umVGz3P2nKgvlUmT-EEu2tH8fXZcvAg&oe=6A5AB016&_nc_sid=c6f216",
  "food/sefofo-boiled-yam-stew.jpg":
    "https://scontent-phl2-1.cdninstagram.com/v/t51.82787-15/540429208_17907181392215730_4042275276409278343_n.jpg?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-phl2-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gHK9JphE2wzx8FoBAVnS4HQaMoGvxu7dLtZmFpaH8bDbYNp9AK0mvXTT3dxWFvwAys&_nc_ohc=bpc-smQKKmwQ7kNvwGwkVvn&_nc_gid=1wHsYbTmVnjGRK3jOot_bA&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQBTkcv_kUNKFwl6X3miwrOKO1hQC_wBRMnv9Jn3ZfF9eA&oe=6A5AB455&_nc_sid=c6f216",
  "food/sefofo-banku-okro-stew.jpg":
    "https://scontent-dfw6-1.cdninstagram.com/v/t51.71878-15/608403006_838990035702579_4909591156446776609_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-dfw6-1.cdninstagram.com&_nc_cat=103&_nc_oc=Q6cZ2gFkAYusnbDjD6GvcVsRER9K9o5NVSsVVRZKQnV0zqVkfwf6YOxFS3vfh-DEmx2nmFk&_nc_ohc=V4lyosQsK4cQ7kNvwHXBo5t&_nc_gid=KEPYzH97wt3HfRAMZY3rRw&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQCPLxEAToDUSIyLDj7dEnuuDNib7F3qhjaNfHnTTj_EBg&oe=6A5A9FA2&_nc_sid=c6f216",
  "food/sefofo-fufu-special.jpg":
    "https://scontent-atl3-1.cdninstagram.com/v/t51.82787-15/621926253_17923392651215730_3161327566378651124_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-atl3-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gHxNE-TNyJKBmGMLH_QEktgTaa93pZ3yGFGytlb7qkV1DTONRjejDBq35psDXCaK1s&_nc_ohc=BdPsst4XXMMQ7kNvwHHjp5A&_nc_gid=PVluuMGA40IBAUJgeu3OBA&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQDy-5FjpkwRjzkK-SRNJ221T554ySM_HsD_8ScFfox3hw&oe=6A5ABE88&_nc_sid=c6f216",
  "food/sefofo-yakayake-ademe.jpg":
    "https://scontent-sjc3-1.cdninstagram.com/v/t51.82787-15/535852850_17906070009215730_4750713771868220574_n.jpg?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gF9mnq4mMsqjDiUSkxwx3pEBjmM_8tkOGvk9UdIA9yPUnbfUwApMr0pDRjpdBlNep4&_nc_ohc=qOCcQmP2hdoQ7kNvwHAgml3&_nc_gid=hJjRfZ1KeOHDe4dWNOBsZQ&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQC48UO5mLTtBMo3iIp83WsQlr5eKPU2AEjU_4mgr0ZETA&oe=6A5AD2BD&_nc_sid=c6f216",
  "food/sefofo-sefofo-jollof-chicken.jpg":
    "https://scontent-dfw5-1.cdninstagram.com/v/t51.82787-15/574823944_17914966770215730_1486189771035485096_n.jpg?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-dfw5-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gHPbLUq-y_PMakl_WNNckvQpsb4eMD-BRORVbi9RMR-uUl7WCa_I7_U0P7Q7cS2hys&_nc_ohc=N_7g64kgee8Q7kNvwERpI57&_nc_gid=CEbgPjQx7qg9ceUa2xWudA&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQA9Mx-MBxf8-jYCvj4T69IKOPVDfw6T__Gb5mXH0Y6_NA&oe=6A5AA634&_nc_sid=c6f216",
  "food/sefofo-gbatakpa.jpg":
    "https://scontent-ord5-1.cdninstagram.com/v/t51.82787-15/581971922_17915685525215730_45199412938854908_n.jpg?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-ord5-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gFqzF7xkWsvQDqpdOlyDLxkQgKAlPerUyIoDO3yOitTq7Iu3y8DT79D2XaXcvonCxI&_nc_ohc=NzAvDUvwF2MQ7kNvwHxzUDv&_nc_gid=MQd-rVguoZo7DxIna2LzRg&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQB6Bt40uka3PKT1PDD9f5hYAH-CB__g5OUPHLUH8QXvRw&oe=6A5AB8D8&_nc_sid=c6f216",
  "food/sefofo-aborbitadi.jpg":
    "https://scontent-bos5-1.cdninstagram.com/v/t51.82787-15/735180565_17945699541215730_6735664926820409786_n.jpg?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-bos5-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gGE5xmJPQCOpboM1-eJ0NlhvKvs6qTEBOFexRj7TRyG5nkV1I487wKkbzCng5rpmJY&_nc_ohc=veAxNZmnCZgQ7kNvwFM9Qm3&_nc_gid=wAkENNsa1KEHaF3kqKJ5eA&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQCoRi8hC1eRYcCIjtRPVq-5GamV4TFuwJmfrUs9JOl80w&oe=6A5AD3E1&_nc_sid=c6f216",
  "food/sefofo-village-dawadawa-jollof.jpg":
    "https://scontent-hou1-1.cdninstagram.com/v/t51.75761-15/489847099_17890703631215730_78927140808270018_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzYwNjQ0ODk0OTc5NjYxMTI2MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuODI4LnNkci5yZWd1bGFyX3Bob3RvLkMzIn0%3D&_nc_ohc=ERwGmaIQwH0Q7kNvwH4jS5F&_nc_oc=AdqFN0COGxYZ_ylWWD-iLdHamWLtPeVLIrrEcN_DV3eqWWRc9f1RTkiE7KhhJDCH-lk&_nc_zt=23&_nc_ht=scontent-hou1-1.cdninstagram.com&_nc_gid=uLkQmThRXZdujb4DI5VWjw&_nc_ss=72a8c&oh=00_AQAYtJLRN06SPy67ax6LNc3KLf_v4fpCwtknsJ5ydHPuGA&oe=6A5AB007",
  "food/naturia-sobolo.jpg":
    "https://scontent-phl2-1.cdninstagram.com/v/t51.82787-15/708154804_17940216651215730_15506894105459707_n.jpg?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-phl2-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gGpE9B_aEIUlhH4I6iZBMJO6AyUHvCSfvx1ZVCP7eCcg2G7SzoQnhZ8uDwFd8C5m6c&_nc_ohc=Vd4GI1DeYP8Q7kNvwG_rwzi&_nc_gid=7lX_5hyJOkLI60JEEwDSWw&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQALMvDLBTRHB0Ebe_5nbRIU1TMznPblaN2Z4iD8L5SsQA&oe=6A5A9F87&_nc_sid=c6f216",
  "food/hero-sefofo.jpg":
    "https://scontent-dfw6-1.cdninstagram.com/v/t51.82787-15/645938191_18363730993160127_6739726334668836512_n.jpg?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-dfw6-1.cdninstagram.com&_nc_cat=103&_nc_oc=Q6cZ2gFP0nWYDALLBX2P7y3jb2HpYDN6p2G6i-yla3Nio3DvoYDO-iJ8_yfhxPoonxohGPs&_nc_ohc=w7UfvM2xbTkQ7kNvwEzr2Ug&_nc_gid=8MxBe3zV5Xf35-AntHD2HQ&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQCoT-pp83zAT1xjOhUTpsC3vySuuXZJ66j15il4DbkuLQ&oe=6A5AAC48&_nc_sid=c6f216",

  // --- Sefofo: Wikimedia Commons (authentic dishes) ---
  "food/sefofo-red-red-fried-plantain.jpg": wm("b/bf", "Ghanaian_Red-Red_with_Fish.jpg"),
  "food/sefofo-kontomire-palava-yam.jpg": wm(
    "9/91",
    "Ghanaian_pepper_and_taro_leaves_%28masterclass_dish%29.jpg",
  ),
  "food/sefofo-ampesi-garden-egg-stew.jpg": wm("4/4b", "Yam_and_garden_egg_stew.jpg"),
  "food/sefofo-konkonte-groundnut-soup.jpg": wm("5/52", "Kokonte.jpg"),
  "food/sefofo-gari-beans.jpg": wm("3/34", "Gob3_1.0.jpg"),
  "food/sefofo-kelewele.jpg": wm("0/04", "Un_plat_d%27alloco_Fried_Plantains.JPG"),

  // --- packaged drinks (shared by both brands; resolved from Commons search) ---
  // Malt, tamarind and garifoto intentionally keep their designed gradients:
  // free-media search only returned mismatches (a museum jar, a meal scene),
  // and a clean gradient beats a wrong photo. Drop real product shots in later.
  "food/drinks-water.jpg": wmSearch("mineral water bottle"),
  "food/drinks-soft.jpg": wmSearch("glass of cola soft drink ice"),
  "food/drinks-pineapple-ginger.jpg": wmSearch("pineapple juice glass"),
  "food/drinks-beer.jpg": wmSearch("lager beer glass"),

  // --- restaurant venues (for the "Visit Giloz / Sefofo" cards) ---
  "brands/giloz-venue.jpg": wmSearch("restaurant dining room interior"),
  "brands/sefofo-venue.jpg": wmSearch("restaurant interior wooden tables dining"),
};

// Wikimedia asks for a descriptive User-Agent and rate-limits bursts, so we
// identify ourselves and back off on HTTP 429.
const WM_UA =
  "GilozSefofoMenuBot/1.0 (https://github.com/Mutalib713/giloz.sefofo; menu image vendoring)";
const isWikimedia = (url) => url.includes("upload.wikimedia.org");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const root = new URL("../public/", import.meta.url).pathname;
let ok = 0;
let failed = 0;

async function get(url) {
  const ua = isWikimedia(url) ? WM_UA : UA;
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, {
      headers: { "user-agent": ua, accept: "image/*,*/*;q=0.8" },
      redirect: "follow",
    });
    if (res.status === 429 || res.status === 503) {
      await sleep(2000 * (attempt + 1) + Math.floor(Math.random() * 1000));
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const type = res.headers.get("content-type") ?? "";
    if (!type.startsWith("image/")) throw new Error(`not an image (${type})`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 2048) throw new Error(`too small (${buf.length}B)`);
    return buf;
  }
  throw new Error("HTTP 429 after retries");
}

// Commons is a free-media dump, so a naive "first hit" often returns museum
// artefacts, specimens or tiny icons. Reject those by title and score the rest.
const BAD_TITLE =
  /museum|antique|vintage|specimen|art-?[ei]fact|fossil|\bcoin\b|stamp|banknote|sculpture|excavat|archae|accession|heritage|\bjar\b|\bvase\b|propagat|cutting|seedling|\broots?\b|reagent|apothecary|medicine|poison|\bempty\b|bottle_?cap|label|logo|diagram|\b1[89]\d\d\b/i;

/**
 * Resolve a `wmsearch:<keyword>` spec to a real Commons image URL at build time.
 * Fetches candidates via the search generator, drops non-photos / artefacts /
 * tiny images, then scores the rest by how many keyword tokens appear in the
 * file title (plus mild bonuses for size and a sane aspect ratio). Lets us
 * reference photos we have no exact filename for without brittle hard-coded URLs.
 */
async function resolveWikimediaSearch(keyword) {
  const api =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search" +
    "&gsrnamespace=6&gsrlimit=20&gsrsearch=" +
    encodeURIComponent(keyword) +
    "&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1400";
  const tokens = keyword.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(api, {
      headers: { "user-agent": WM_UA, accept: "application/json" },
      redirect: "follow",
    });
    if (res.status === 429 || res.status === 503) {
      await sleep(2000 * (attempt + 1) + Math.floor(Math.random() * 1000));
      continue;
    }
    if (!res.ok) throw new Error(`search HTTP ${res.status}`);
    const data = await res.json();
    const pages = Object.values(data?.query?.pages ?? {});
    let best = null;
    let bestScore = -Infinity;
    for (const p of pages) {
      const info = p?.imageinfo?.[0];
      const mime = info?.mime ?? "";
      if (!/^image\/(jpe?g|png)$/.test(mime)) continue; // skip svg/gif/tiff/pdf
      const title = (p.title ?? "").toLowerCase();
      if (BAD_TITLE.test(title)) continue; // skip artefacts, logos, diagrams
      const w = info.width ?? 0;
      const h = info.height ?? 0;
      if (w < 500 || h < 400) continue; // skip icons / thumbnails
      let score = -(p.index ?? 0) * 0.1; // mild nod to search relevance rank
      for (const t of tokens) if (title.includes(t)) score += 3;
      if (w >= 1000) score += 1;
      const ar = w / h;
      if (ar >= 0.6 && ar <= 2.2) score += 1; // sane, non-panoramic framing
      if (score > bestScore) {
        bestScore = score;
        best = info;
      }
    }
    if (best) return best.thumburl || best.url;
    throw new Error(`no good raster image for "${keyword}"`);
  }
  throw new Error(`search HTTP 429 after retries for "${keyword}"`);
}

for (const [file, spec] of Object.entries(MANIFEST)) {
  const dest = join(root, file);
  let url = spec;
  // Idempotent: keep whatever is already vendored (preserves good photos and
  // avoids re-hitting expired Instagram links). Delete a file to force a refresh.
  try {
    await access(dest);
    console.log(`• ${file}  (kept)`);
    continue;
  } catch {
    /* not present — fetch it below */
  }
  try {
    if (url.startsWith("wmsearch:")) url = await resolveWikimediaSearch(url.slice(9));
    let buf;
    try {
      buf = await get(url);
    } catch (err) {
      // wikimedia: the sized thumb may not exist for small originals — fetch the original
      const m = url.match(
        /^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/(.+)\/([^/]+)\/\d+px-[^/]+$/,
      );
      if (!m) throw err;
      buf = await get(`https://upload.wikimedia.org/wikipedia/commons/${m[1]}/${m[2]}`);
    }
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, buf);
    ok++;
    console.log(`✓ ${file}  (${(buf.length / 1024).toFixed(0)} KB)`);
  } catch (err) {
    failed++;
    console.warn(`✗ ${file}  — ${err.message} (UI falls back to gradient)`);
  }
  // be polite between requests (Wikimedia especially)
  await sleep(isWikimedia(url) ? 900 : 150);
}

console.log(`\nDone: ${ok} downloaded, ${failed} skipped.`);
