const RAW_BASE = import.meta.env.BASE_URL || '/';
const BASE = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE;

export function path(p: string): string {
  if (!p) return BASE || '/';
  if (/^[a-z][a-z0-9+\-.]*:/i.test(p)) return p;
  if (p.startsWith('//')) return p;
  if (p.startsWith('#')) return p;
  if (p.startsWith('?')) return p;
  if (p.startsWith('/')) return `${BASE}${p}`;
  return `${BASE}/${p}`;
}
