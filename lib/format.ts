/** Money is stored in pesewas (integer minor units); display in Ghana Cedis (₵). */
export function formatCedis(pesewas: number, opts?: { decimals?: boolean }): string {
  const cedis = pesewas / 100;
  const decimals = opts?.decimals ?? cedis % 1 !== 0;
  return `₵${cedis.toLocaleString("en-GH", {
    minimumFractionDigits: decimals ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}
