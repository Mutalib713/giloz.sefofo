/**
 * Vendors food photos + brand logos into the repo (public/).
 *
 * Runs in GitHub Actions (see .github/workflows/vendor-images.yml), where the
 * runner has open internet access — sources are the brands' own Instagram
 * posts, their Linktree avatars, and Unsplash stand-ins for gaps.
 * Failures are skipped (the UI gracefully falls back to gradients), so an
 * expired Instagram URL can never break the build.
 *
 * Later, swap these local files for Cloudinary URLs without touching the UI.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const u = (id) => `https://images.unsplash.com/${id}?w=1200&q=75&auto=format&fit=crop`;

/** file (under public/) → source URL */
const MANIFEST = {
  // --- brand logos (Linktree avatars) ---
  "brands/giloz-logo.jpg":
    "https://ugc.production.linktr.ee/4c921884-4639-41c7-a6ad-94f632567810_WhatsApp-Image-2024-04-30-at-7.21.45-PM.jpeg",
  "brands/sefofo-logo.jpg":
    "https://ugc.production.linktr.ee/a45e3cd8-25c5-4a76-ad5b-a71c43d4fe13_PHOTO-2024-10-02-21-43-29.jpeg",

  // --- Giloz dishes (own Instagram) ---
  "food/giloz-akple-ademe-soup.jpg":
    "https://scontent-sjc6-1.cdninstagram.com/v/t51.82787-15/622591805_18067119137225457_8121421705800879647_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-sjc6-1.cdninstagram.com&_nc_cat=109&_nc_oc=Q6cZ2gH8Dg1ZirgjciASalBeS3gcR54mz0PEynghQawurq4qB0pRzjEyq2-uWanRYrxjyt4&_nc_ohc=Cpo2kSTSpE8Q7kNvwHk9Rae&_nc_gid=5VnQ656HWWQdeilQGQ6iHQ&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQBUxbcEy59IZuS2icMiMm5z6zdj4Q3Lq6EEm4fUFSQEsg&oe=6A5AB0D0&_nc_sid=c6f216",
  "food/giloz-banku-grilled-tilapia.jpg":
    "https://scontent-iad3-1.cdninstagram.com/v/t51.71878-15/502726735_1406506453948340_8294294251556146138_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2gHEQC2e2VItJzirFwYFc1trsBsgY0BerWLVbzqvM_GdvVb3VDci4czq8n_VxrpwNzc&_nc_ohc=mZ2dqsmuylsQ7kNvwHuXcAd&_nc_gid=jYd6MRMdYKClDKf3DMiORA&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQDcWT-RhLoz5nH0yTD47cmm0hPpthX6xBa9TaVLhYBwGw&oe=6A5AD066&_nc_sid=c6f216",
  "food/giloz-fufu-goat-light-soup.jpg":
    "https://scontent-bos5-1.cdninstagram.com/v/t51.71878-15/497290170_3960730317502256_3282688715497836726_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-bos5-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2gHkueRuG0tkkmD1wHYLmqKrFnzhBeDiA2w8igOWi48UKBBcXowgmduhAe3wr7wW7-E&_nc_ohc=3dA7qn-xIn0Q7kNvwE7MfsT&_nc_gid=D7O2VZUk_y3rWN4cTb53tQ&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQC6FnbU8ip44wUxphzHF-SAaF9AUpEXSJMckhUdLqrWbg&oe=6A5ABDC9&_nc_sid=c6f216",
  "food/giloz-fetri-detsi-banku.jpg":
    "https://scontent-lga3-1.cdninstagram.com/v/t51.71878-15/501653085_631018716639995_5375700843775097017_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=111&_nc_oc=Q6cZ2gFtyIsSeSJyWpYBAdshI5CKCj__aRgDRTJhE_onrDZtIaqPRNv7OPSM676f0-PuhM4&_nc_ohc=88zMqcJ98loQ7kNvwHl7tJR&_nc_gid=xM45_Nwey_mPkRzzpyiyrg&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQCCpzGNGbknQd63WDBH31rI3mFmlZBg7HgQf-nAcnoEhA&oe=6A5AB972&_nc_sid=c6f216",
  "food/giloz-palmnut-soup-fufu.jpg":
    "https://scontent-iad3-2.cdninstagram.com/v/t51.82787-15/623280921_18067710710631675_4724083058166092284_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_cat=103&_nc_oc=Q6cZ2gHMqyt1NRm6FhIZiamN7pnQZsAoO7wuJ9w9s4Gx3XeUf2WSyFiXdugyEX-LvtDVcDM&_nc_ohc=dCSCL-9lyGoQ7kNvwG3WVmt&_nc_gid=UHwbqzFsX07iScsG_4lv8w&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQDGnAEKteVRN2ZUBi9VL5ZDjR6w_1nCcFQuEO8332THeg&oe=6A5AC923&_nc_sid=c6f216",
  "food/giloz-assorted-fried-rice.jpg":
    "https://scontent-iad6-1.cdninstagram.com/v/t51.71878-15/499717600_1647463486644138_39944582952825257_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-iad6-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gGWPQuSMbX9w_UR03QHSktnHF5prZSxGQKwAzCqfB1N_pT4sS2L1cy0sK_P0VMDrEg&_nc_ohc=47q4l08qtdgQ7kNvwGJfEzm&_nc_gid=i8vrrTMGUTa0eyZe7rFk_A&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQCR9cmPGSpp004s1-FRegRtLPVY3rAPfW27lDdGS2L9zA&oe=6A5AC5D2&_nc_sid=c6f216",
  "food/giloz-grilled-chicken-yam-chips.jpg":
    "https://scontent-iad3-2.cdninstagram.com/v/t51.71878-15/498551551_1030358898659051_1530117324515809554_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_cat=111&_nc_oc=Q6cZ2gFP1TzE6D95I09TlVuw7o4askwGzfXacKR-eI2-y78wt-ZcaeUMwFpoRT_WkvRsCmE&_nc_ohc=k3VmZOUjWZsQ7kNvwG2ua-U&_nc_gid=jVb2UAyYl9K8RvC3BHJT0Q&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQAnt_N6kBaGktOYnhgQoXTPDTWuY3_vil7fGDEP8IszJA&oe=6A5AA999&_nc_sid=c6f216",
  "food/hero-giloz.jpg":
    "https://scontent-ord5-1.cdninstagram.com/v/t51.71878-15/503875811_712999631479967_6270686632988035438_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-ord5-1.cdninstagram.com&_nc_cat=111&_nc_oc=Q6cZ2gG1-1Goq-V9c2K4sg8VmxFFIaiwbTij29i3FCbhL73RZFO3vvVKk5Whq4tlonwjJ3k&_nc_ohc=4blUSdrUfrMQ7kNvwEeDcti&_nc_gid=O726NyZ2pg9go5TGUCENXQ&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQDL1FFebGM9mbEKZ5BYWbUHtf_pKLDxkvmXGifwZv00Bw&oe=6A5A9EFD&_nc_sid=c6f216",

  // --- Sefofo dishes (own Instagram) ---
  "food/sefofo-abolo-one-man-thousand.jpg":
    "https://instagram.foma1-2.fna.fbcdn.net/v/t51.71878-15/567431173_1497760434704279_3094060932165239105_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=instagram.foma1-2.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2gHfmhJ-G8UzgeGOHGgFEXM0DWRpH9FcQE3dLdqvpP7SsBI-Kyr9HwJw2CQJNzS8mCY&_nc_ohc=gv6WI8P9r3EQ7kNvwGuO4wh&_nc_gid=CgMyCeD4FCW-40DjAquw3A&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQD2TbPmnSo-xF9umVGz3P2nKgvlUmT-EEu2tH8fXZcvAg&oe=6A5AB016&_nc_sid=c6f216",
  "food/sefofo-kontomire-palava-yam.jpg":
    "https://scontent-phl2-1.cdninstagram.com/v/t51.82787-15/540429208_17907181392215730_4042275276409278343_n.jpg?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-phl2-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gHK9JphE2wzx8FoBAVnS4HQaMoGvxu7dLtZmFpaH8bDbYNp9AK0mvXTT3dxWFvwAys&_nc_ohc=bpc-smQKKmwQ7kNvwGwkVvn&_nc_gid=1wHsYbTmVnjGRK3jOot_bA&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQBTkcv_kUNKFwl6X3miwrOKO1hQC_wBRMnv9Jn3ZfF9eA&oe=6A5AB455&_nc_sid=c6f216",
  "food/sefofo-banku-okro-stew.jpg":
    "https://scontent-dfw6-1.cdninstagram.com/v/t51.71878-15/608403006_838990035702579_4909591156446776609_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-dfw6-1.cdninstagram.com&_nc_cat=103&_nc_oc=Q6cZ2gFkAYusnbDjD6GvcVsRER9K9o5NVSsVVRZKQnV0zqVkfwf6YOxFS3vfh-DEmx2nmFk&_nc_ohc=V4lyosQsK4cQ7kNvwHXBo5t&_nc_gid=KEPYzH97wt3HfRAMZY3rRw&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQCPLxEAToDUSIyLDj7dEnuuDNib7F3qhjaNfHnTTj_EBg&oe=6A5A9FA2&_nc_sid=c6f216",
  "food/sefofo-konkonte-groundnut-soup.jpg":
    "https://scontent-atl3-1.cdninstagram.com/v/t51.82787-15/621926253_17923392651215730_3161327566378651124_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-atl3-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gHxNE-TNyJKBmGMLH_QEktgTaa93pZ3yGFGytlb7qkV1DTONRjejDBq35psDXCaK1s&_nc_ohc=BdPsst4XXMMQ7kNvwHHjp5A&_nc_gid=PVluuMGA40IBAUJgeu3OBA&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQDy-5FjpkwRjzkK-SRNJ221T554ySM_HsD_8ScFfox3hw&oe=6A5ABE88&_nc_sid=c6f216",
  "food/sefofo-yakayake-ademe.jpg":
    "https://scontent-sjc3-1.cdninstagram.com/v/t51.82787-15/535852850_17906070009215730_4750713771868220574_n.jpg?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gF9mnq4mMsqjDiUSkxwx3pEBjmM_8tkOGvk9UdIA9yPUnbfUwApMr0pDRjpdBlNep4&_nc_ohc=qOCcQmP2hdoQ7kNvwHAgml3&_nc_gid=hJjRfZ1KeOHDe4dWNOBsZQ&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQC48UO5mLTtBMo3iIp83WsQlr5eKPU2AEjU_4mgr0ZETA&oe=6A5AD2BD&_nc_sid=c6f216",
  "food/sefofo-sefofo-jollof-chicken.jpg":
    "https://scontent-dfw5-1.cdninstagram.com/v/t51.82787-15/574823944_17914966770215730_1486189771035485096_n.jpg?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-dfw5-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gHPbLUq-y_PMakl_WNNckvQpsb4eMD-BRORVbi9RMR-uUl7WCa_I7_U0P7Q7cS2hys&_nc_ohc=N_7g64kgee8Q7kNvwERpI57&_nc_gid=CEbgPjQx7qg9ceUa2xWudA&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQA9Mx-MBxf8-jYCvj4T69IKOPVDfw6T__Gb5mXH0Y6_NA&oe=6A5AA634&_nc_sid=c6f216",
  "food/naturia-sobolo.jpg":
    "https://scontent-phl2-1.cdninstagram.com/v/t51.82787-15/708154804_17940216651215730_15506894105459707_n.jpg?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-phl2-1.cdninstagram.com&_nc_cat=106&_nc_oc=Q6cZ2gGpE9B_aEIUlhH4I6iZBMJO6AyUHvCSfvx1ZVCP7eCcg2G7SzoQnhZ8uDwFd8C5m6c&_nc_ohc=Vd4GI1DeYP8Q7kNvwG_rwzi&_nc_gid=7lX_5hyJOkLI60JEEwDSWw&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQALMvDLBTRHB0Ebe_5nbRIU1TMznPblaN2Z4iD8L5SsQA&oe=6A5A9F87&_nc_sid=c6f216",
  "food/hero-sefofo.jpg":
    "https://scontent-dfw6-1.cdninstagram.com/v/t51.82787-15/645938191_18363730993160127_6739726334668836512_n.jpg?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-dfw6-1.cdninstagram.com&_nc_cat=103&_nc_oc=Q6cZ2gFP0nWYDALLBX2P7y3jb2HpYDN6p2G6i-yla3Nio3DvoYDO-iJ8_yfhxPoonxohGPs&_nc_ohc=w7UfvM2xbTkQ7kNvwEzr2Ug&_nc_gid=8MxBe3zV5Xf35-AntHD2HQ&edm=ADp7STQBAAAA&ccb=7-5&oh=00_AQCoT-pp83zAT1xjOhUTpsC3vySuuXZJ66j15il4DbkuLQ&oe=6A5AAC48&_nc_sid=c6f216",

  // --- Unsplash stand-ins for gaps ---
  "food/giloz-giloz-jollof-chicken.jpg": u("photo-1665332195309-9d75071138f0"),
  "food/giloz-waakye-special.jpg": u("photo-1569058242252-623df46b5025"),
  "food/giloz-khebab-platter.jpg": u("photo-1610057098265-05f2bcbedd55"),
  "food/giloz-kelewele.jpg": u("photo-1512058556646-c4da40fba323"),
  "food/sefofo-red-red-fried-plantain.jpg": u("photo-1664992960082-0ea299a9c53e"),
  "food/sefofo-ampesi-garden-egg-stew.jpg": u("photo-1665333048952-a3ee97714c6b"),
  "food/sefofo-gari-beans.jpg": u("photo-1664993101841-036f189719b6"),
  "food/sefofo-kelewele.jpg": u("photo-1665556899022-9761f95769e5"),
};

const root = new URL("../public/", import.meta.url).pathname;
let ok = 0;
let failed = 0;

for (const [file, url] of Object.entries(MANIFEST)) {
  const dest = join(root, file);
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "image/*,*/*;q=0.8" },
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const type = res.headers.get("content-type") ?? "";
    if (!type.startsWith("image/")) throw new Error(`not an image (${type})`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 2048) throw new Error(`too small (${buf.length}B)`);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, buf);
    ok++;
    console.log(`✓ ${file}  (${(buf.length / 1024).toFixed(0)} KB)`);
  } catch (err) {
    failed++;
    console.warn(`✗ ${file}  — ${err.message} (UI falls back to gradient)`);
  }
}

console.log(`\nDone: ${ok} downloaded, ${failed} skipped.`);
