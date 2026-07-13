/** Merge current search params with changes (undefined/empty clears a key). */
export function buildQuery(
  base: Record<string, string | undefined>,
  changes: Record<string, string | undefined>,
): string {
  const merged: Record<string, string> = {};
  for (const [k, v] of Object.entries(base)) if (v) merged[k] = v;
  for (const [k, v] of Object.entries(changes)) {
    if (v) merged[k] = v;
    else delete merged[k];
  }
  const s = new URLSearchParams(merged).toString();
  return s ? `?${s}` : "";
}
