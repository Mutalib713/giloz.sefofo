/**
 * Downloads every candidate photo listed in scripts/image-candidates.json
 * into ./candidates-out/ for visual review. Runs on a GitHub runner (open
 * internet); the fetch-candidates workflow then publishes the folder to the
 * throwaway `image-candidates` branch. Sources: the brands' own Instagram
 * CDN links (expire after a few days — fetched immediately) and their
 * Google Maps listing photos (lh3.googleusercontent.com).
 *
 * Failures are logged and skipped; a partial harvest is still useful.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const manifest = JSON.parse(
  await readFile(new URL("./image-candidates.json", import.meta.url), "utf8"),
);

await mkdir("candidates-out", { recursive: true });

let ok = 0;
let failed = 0;

for (const [name, rawUrl] of Object.entries(manifest)) {
  // Modest size for review copies; chosen finals are recompressed anyway.
  const url = rawUrl.replace(/=w\d+-h\d+-k-no$/, "=w1200-h900-k-no");
  let done = false;
  for (let attempt = 0; attempt < 3 && !done; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "user-agent": UA, accept: "image/*,*/*;q=0.8" },
        redirect: "follow",
      });
      if (res.status === 429 || res.status === 503) {
        await sleep(1500 * (attempt + 1));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const type = res.headers.get("content-type") ?? "";
      if (!type.startsWith("image/")) throw new Error(`not an image (${type})`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 3072) throw new Error(`too small (${buf.length}B)`);
      await writeFile(`candidates-out/${name}.jpg`, buf);
      ok++;
      console.log(`ok ${name} (${(buf.length / 1024).toFixed(0)} KB)`);
      done = true;
    } catch (err) {
      if (attempt === 2) {
        failed++;
        console.warn(`FAIL ${name} - ${err.message}`);
      } else {
        await sleep(800);
      }
    }
  }
  await sleep(120);
}

console.log(`\nDone: ${ok} downloaded, ${failed} failed.`);
