import type { SigCTAmount, SigCTSigLiveDatum } from '../../types/custom-apps/sigct-banner';

/** Format a number as compact money ($1.2M, $1,234, $0) */
export function formatMoney(val: number): string {
  if (Math.abs(val) >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
  if (Math.abs(val) >= 1_000) return `$${Math.round(val).toLocaleString()}`;
  return `$${val.toFixed(0)}`;
}

/** Format a SigCTAmount as money (uses valueAsMoneyNoCents when available) */
export function formatSigLiveMoney(amt?: SigCTAmount): string {
  if (amt?.valueAsMoneyNoCents) return `$${amt.valueAsMoneyNoCents}`;
  if (amt?.value != null) return `$${Math.round(amt.value).toLocaleString()}`;
  return '$0';
}

/** Format a decimal ratio as percentage string */
export function formatPct(val: number): string {
  if (!isFinite(val)) return 'N/A';
  return `${(val * 100).toFixed(1)}%`;
}

/** Calculate sales-to-plan percentage for a SigLive datum */
export function salesPercent(datum: SigCTSigLiveDatum): number {
  const sales = datum.salesAmount?.value ?? 0;
  const plan = datum.planAmount?.value ?? 1;
  return plan !== 0 ? (sales / plan) * 100 : 0;
}

/** Return red color for negative numeric values in table cells, undefined otherwise */
export function negativeValueColor(val: string): string | undefined {
  const n = parseFloat(val.replace(/[$,%,\u00b1,\s]/g, ''));
  if (!isNaN(n) && n < 0) return 'var(--color-ios-red)';
  return undefined;
}

/** Extract hostname from a URL string, stripping www. prefix */
export function getHostname(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; }
}
