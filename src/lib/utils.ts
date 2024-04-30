import { differenceInCalendarDays } from "date-fns";

export function hasCompany(
  text: string
): { name: string; badge: string } | null {
  let companyName = text
    .split(" ")
    .find((word) => word.includes("#"))
    ?.substring(1);
  if (!companyName) return null;
  companyName = companyName.charAt(0).toUpperCase() + companyName.slice(1);
  const badge = getCompanyBadge(companyName);
  return { name: companyName, badge: badge };
}

function getCompanyBadge(company: string): string {
  return company.substring(0, 1).toUpperCase();
}

export function daysBetween(day: number): number {
    const today = new Date()
    return differenceInCalendarDays(day, today);
}