import type { SigCTSale, SigCTSalesPeriod } from '../../types/custom-apps/sigct-banner';

/** Extract amount for a given period and field from a SigCTSale */
export function getAmountForPeriod(
  sale: SigCTSale,
  period: SigCTSalesPeriod,
  field: 'total' | 'plan' | 'ly' | 'comp' | 'lyComp'
): number {
  const prefix = period.toLowerCase() === 'day' ? 'day' : period.toLowerCase();
  const fieldMap: Record<string, string> = {
    total: `${prefix}Amount`,
    plan: `${prefix}PlanAmount`,
    ly: `ly${prefix.charAt(0).toUpperCase() + prefix.slice(1)}Amount`,
    comp: `comp${prefix.charAt(0).toUpperCase() + prefix.slice(1)}Amount`,
    lyComp: `lyComp${prefix.charAt(0).toUpperCase() + prefix.slice(1)}Amount`,
  };
  const key = fieldMap[field] as keyof SigCTSale;
  const amt = sale[key] as { value?: number } | undefined;
  return amt?.value ?? 0;
}
