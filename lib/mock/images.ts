/**
 * Real imagery for the two brands.
 *
 * - PRODUCT_IMAGES: photos matched to dishes from the restaurants' own Instagram
 *   (@giloz_restaurant, @sefofo.rlg) by post caption, with a few Unsplash stand-ins
 *   for gaps. Instagram CDN URLs are signed and expire over time — the UI falls back
 *   to the designed gradient (and later, Cloudinary-hosted photos) when one fails.
 * - BRAND_LOGOS: the brands' avatars from their Linktree (stable URLs).
 * - BRAND_HERO: a hero food shot per brand.
 *
 * Dishes without an entry intentionally render the warm gradient placeholder.
 */

// Giloz — from @giloz_restaurant
const G_ADEME =
  "https://scontent-sjc6-1.cdninstagram.com/v/t51.82787-15/622591805_18067119137225457_8121421705800879647_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-sjc6-1.cdninstagram.com&_nc_cat=109&_nc_oc=Q6cZ2gH8Dg1ZirgjciASalBeS3gcR54mz0PEynghQawurq4qB0pRzjEyq2-uWanRYrxjyt4&_nc_ohc=Cpo2kSTSpE8Q7kNvwHk9Rae&_nc_gid=5VnQ656HWWQdeilQGQ6iHQ&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQBUxbcEy59IZuS2icMiMm5z6zdj4Q3Lq6EEm4fUFSQEsg&oe=6A5AB0D0&_nc_sid=c6f216";
const G_TILAPIA =
  "https://scontent-iad3-1.cdninstagram.com/v/t51.71878-15/502726735_1406506453948340_8294294251556146138_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2gHEQC2e2VItJzirFwYFc1trsBsgY0BerWLVbzqvM_GdvVb3VDci4czq8n_VxrpwNzc&_nc_ohc=mZ2dqsmuylsQ7kNvwHuXcAd&_nc_gid=jYd6MRMdYKClDKf3DMiORA&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQDcWT-RhLoz5nH0yTD47cmm0hPpthX6xBa9TaVLhYBwGw&oe=6A5AD066&_nc_sid=c6f216";
const G_OKRO =
  "https://scontent-lga3-1.cdninstagram.com/v/t51.71878-15/501653085_631018716639995_5375700843775097017_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=111&_nc_oc=Q6cZ2gFtyIsSeSJyWpYBAdshI5CKCj__aRgDRTJhE_onrDZtIaqPRNv7OPSM676f0-PuhM4&_nc_ohc=88zMqcJ98loQ7kNvwHl7tJR&_nc_gid=xM45_Nwey_mPkRzzpyiyrg&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQCCpzGNGbknQd63WDBH31rI3mFmlZBg7HgQf-nAcnoEhA&oe=6A5AB972&_nc_sid=c6f216";
const G_FRIEDRICE =
  "https://scontent-iad6-1.cdninstagram.com/v/t51.71878-15/499717600_1647463486644138_39944582952825257_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-iad6-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gGWPQuSMbX9w_UR03QHSktnHF5prZSxGQKwAzCqfB1N_pT4sS2L1cy0sK_P0VMDrEg&_nc_ohc=47q4l08qtdgQ7kNvwGJfEzm&_nc_gid=i8vrrTMGUTa0eyZe7rFk_A&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQCR9cmPGSpp004s1-FRegRtLPVY3rAPfW27lDdGS2L9zA&oe=6A5AC5D2&_nc_sid=c6f216";
const G_YAMCHIPS =
  "https://scontent-iad3-2.cdninstagram.com/v/t51.71878-15/498551551_1030358898659051_1530117324515809554_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_cat=111&_nc_oc=Q6cZ2gFP1TzE6D95I09TlVuw7o4askwGzfXacKR-eI2-y78wt-ZcaeUMwFpoRT_WkvRsCmE&_nc_ohc=k3VmZOUjWZsQ7kNvwG2ua-U&_nc_gid=jVb2UAyYl9K8RvC3BHJT0Q&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQAnt_N6kBaGktOYnhgQoXTPDTWuY3_vil7fGDEP8IszJA&oe=6A5AA999&_nc_sid=c6f216";
const G_SPREAD =
  "https://scontent-bos5-1.cdninstagram.com/v/t51.71878-15/497290170_3960730317502256_3282688715497836726_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-bos5-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2gHkueRuG0tkkmD1wHYLmqKrFnzhBeDiA2w8igOWi48UKBBcXowgmduhAe3wr7wW7-E&_nc_ohc=3dA7qn-xIn0Q7kNvwE7MfsT&_nc_gid=D7O2VZUk_y3rWN4cTb53tQ&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQC6FnbU8ip44wUxphzHF-SAaF9AUpEXSJMckhUdLqrWbg&oe=6A5ABDC9&_nc_sid=c6f216";
const G_DELICACY =
  "https://scontent-iad3-2.cdninstagram.com/v/t51.82787-15/623280921_18067710710631675_4724083058166092284_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_cat=103&_nc_oc=Q6cZ2gHMqyt1NRm6FhIZiamN7pnQZsAoO7wuJ9w9s4Gx3XeUf2WSyFiXdugyEX-LvtDVcDM&_nc_ohc=dCSCL-9lyGoQ7kNvwG3WVmt&_nc_gid=UHwbqzFsX07iScsG_4lv8w&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQDGnAEKteVRN2ZUBi9VL5ZDjR6w_1nCcFQuEO8332THeg&oe=6A5AC923&_nc_sid=c6f216";
const G_GRILL =
  "https://scontent-ord5-1.cdninstagram.com/v/t51.71878-15/503875811_712999631479967_6270686632988035438_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-ord5-1.cdninstagram.com&_nc_cat=111&_nc_oc=Q6cZ2gG1-1Goq-V9c2K4sg8VmxFFIaiwbTij29i3FCbhL73RZFO3vvVKk5Whq4tlonwjJ3k&_nc_ohc=4blUSdrUfrMQ7kNvwEeDcti&_nc_gid=O726NyZ2pg9go5TGUCENXQ&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQDL1FFebGM9mbEKZ5BYWbUHtf_pKLDxkvmXGifwZv00Bw&oe=6A5A9EFD&_nc_sid=c6f216";

// Sefofo — from @sefofo.rlg
const S_ABOLO =
  "https://instagram.foma1-2.fna.fbcdn.net/v/t51.71878-15/567431173_1497760434704279_3094060932165239105_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=instagram.foma1-2.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2gHfmhJ-G8UzgeGOHGgFEXM0DWRpH9FcQE3dLdqvpP7SsBI-Kyr9HwJw2CQJNzS8mCY&_nc_ohc=gv6WI8P9r3EQ7kNvwGuO4wh&_nc_gid=CgMyCeD4FCW-40DjAquw3A&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQD2TbPmnSo-xF9umVGz3P2nKgvlUmT-EEu2tH8fXZcvAg&oe=6A5AB016&_nc_sid=c6f216";
const S_OKRO =
  "https://scontent-dfw6-1.cdninstagram.com/v/t51.71878-15/608403006_838990035702579_4909591156446776609_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-dfw6-1.cdninstagram.com&_nc_cat=103&_nc_oc=Q6cZ2gFkAYusnbDjD6GvcVsRER9K9o5NVSsVVRZKQnV0zqVkfwf6YOxFS3vfh-DEmx2nmFk&_nc_ohc=V4lyosQsK4cQ7kNvwHXBo5t&_nc_gid=KEPYzH97wt3HfRAMZY3rRw&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQCPLxEAToDUSIyLDj7dEnuuDNib7F3qhjaNfHnTTj_EBg&oe=6A5A9FA2&_nc_sid=c6f216";
const S_ADEME =
  "https://scontent-sjc3-1.cdninstagram.com/v/t51.82787-15/535852850_17906070009215730_4750713771868220574_n.jpg?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gF9mnq4mMsqjDiUSkxwx3pEBjmM_8tkOGvk9UdIA9yPUnbfUwApMr0pDRjpdBlNep4&_nc_ohc=qOCcQmP2hdoQ7kNvwHAgml3&_nc_gid=hJjRfZ1KeOHDe4dWNOBsZQ&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQC48UO5mLTtBMo3iIp83WsQlr5eKPU2AEjU_4mgr0ZETA&oe=6A5AD2BD&_nc_sid=c6f216";
const S_YAM =
  "https://scontent-phl2-1.cdninstagram.com/v/t51.82787-15/540429208_17907181392215730_4042275276409278343_n.jpg?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-phl2-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gHK9JphE2wzx8FoBAVnS4HQaMoGvxu7dLtZmFpaH8bDbYNp9AK0mvXTT3dxWFvwAys&_nc_ohc=bpc-smQKKmwQ7kNvwGwkVvn&_nc_gid=1wHsYbTmVnjGRK3jOot_bA&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQBTkcv_kUNKFwl6X3miwrOKO1hQC_wBRMnv9Jn3ZfF9eA&oe=6A5AB455&_nc_sid=c6f216";
const S_JOLLOF =
  "https://scontent-dfw5-1.cdninstagram.com/v/t51.82787-15/574823944_17914966770215730_1486189771035485096_n.jpg?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-dfw5-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gHPbLUq-y_PMakl_WNNckvQpsb4eMD-BRORVbi9RMR-uUl7WCa_I7_U0P7Q7cS2hys&_nc_ohc=N_7g64kgee8Q7kNvwERpI57&_nc_gid=CEbgPjQx7qg9ceUa2xWudA&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQA9Mx-MBxf8-jYCvj4T69IKOPVDfw6T__Gb5mXH0Y6_NA&oe=6A5AA634&_nc_sid=c6f216";
const S_FUFU =
  "https://scontent-atl3-1.cdninstagram.com/v/t51.82787-15/621926253_17923392651215730_3161327566378651124_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-atl3-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gHxNE-TNyJKBmGMLH_QEktgTaa93pZ3yGFGytlb7qkV1DTONRjejDBq35psDXCaK1s&_nc_ohc=BdPsst4XXMMQ7kNvwHHjp5A&_nc_gid=PVluuMGA40IBAUJgeu3OBA&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQDy-5FjpkwRjzkK-SRNJ221T554ySM_HsD_8ScFfox3hw&oe=6A5ABE88&_nc_sid=c6f216";
const S_BISSAP =
  "https://scontent-phl2-1.cdninstagram.com/v/t51.82787-15/708154804_17940216651215730_15506894105459707_n.jpg?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-phl2-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gGpE9B_aEIUlhH4I6iZBMJO6AyUHvCSfvx1ZVCP7eCcg2G7SzoQnhZ8uDwFd8C5m6c&_nc_ohc=Vd4GI1DeYP8Q7kNvwG_rwzi&_nc_gid=7lX_5hyJOkLI60JEEwDSWw&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQALMvDLBTRHB0Ebe_5nbRIU1TMznPblaN2Z4iD8L5SsQA&oe=6A5A9F87&_nc_sid=c6f216";
const S_AKPLE_ADEME =
  "https://scontent-dfw6-1.cdninstagram.com/v/t51.82787-15/645938191_18363730993160127_6739726334668836512_n.jpg?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-dfw6-1.cdninstagram.com&_nc_cat=103&_nc_oc=Q6cZ2gFP0nWYDALLBX2P7y3jb2HpYDN6p2G6i-yla3Nio3DvoYDO-iJ8_yfhxPoonxohGPs&_nc_ohc=w7UfvM2xbTkQ7kNvwEzr2Ug&_nc_gid=8MxBe3zV5Xf35-AntHD2HQ&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQCoT-pp83zAT1xjOhUTpsC3vySuuXZJ66j15il4DbkuLQ&oe=6A5AAC48&_nc_sid=c6f216";

// Unsplash stand-ins (permanent) for gaps
const U_JOLLOF =
  "https://images.unsplash.com/photo-1569058242252-623df46b5025?auto=format&fit=crop&w=800&q=72";
const U_RICE =
  "https://images.unsplash.com/photo-1634324092526-91f5e878b72f?auto=format&fit=crop&w=800&q=72";
const U_MEAT =
  "https://images.unsplash.com/photo-1610057098265-05f2bcbedd55?auto=format&fit=crop&w=800&q=72";

export const PRODUCT_IMAGES: Record<string, string> = {
  // Giloz
  "giloz-akple-ademe-soup": G_ADEME,
  "giloz-banku-grilled-tilapia": G_TILAPIA,
  "giloz-fufu-goat-light-soup": G_SPREAD,
  "giloz-fetri-detsi-banku": G_OKRO,
  "giloz-palmnut-soup-fufu": G_DELICACY,
  "giloz-giloz-jollof-chicken": U_JOLLOF,
  "giloz-waakye-special": U_RICE,
  "giloz-assorted-fried-rice": G_FRIEDRICE,
  "giloz-grilled-chicken-yam-chips": G_YAMCHIPS,
  "giloz-khebab-platter": U_MEAT,
  "giloz-naturia-sobolo": S_BISSAP,
  // Sefofo
  "sefofo-abolo-one-man-thousand": S_ABOLO,
  "sefofo-kontomire-palava-yam": S_YAM,
  "sefofo-banku-okro-stew": S_OKRO,
  "sefofo-konkonte-groundnut-soup": S_FUFU,
  "sefofo-yakayake-ademe": S_ADEME,
  "sefofo-sefofo-jollof-chicken": S_JOLLOF,
  "sefofo-naturia-sobolo": S_BISSAP,
};

export const BRAND_LOGOS: Record<string, string> = {
  giloz:
    "https://ugc.production.linktr.ee/4c921884-4639-41c7-a6ad-94f632567810_WhatsApp-Image-2024-04-30-at-7.21.45-PM.jpeg",
  sefofo:
    "https://ugc.production.linktr.ee/a45e3cd8-25c5-4a76-ad5b-a71c43d4fe13_PHOTO-2024-10-02-21-43-29.jpeg",
};

export const BRAND_HERO: Record<string, string> = {
  giloz: G_GRILL,
  sefofo: S_AKPLE_ADEME,
};
