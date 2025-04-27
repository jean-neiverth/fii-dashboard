import { FiiData } from "./types";

export function sortFiis(fiis: FiiData[]): FiiData[] {
  return [...fiis].sort((a, b) => {
    // First sort by presence of news
    const aHasNews = a.news && a.news.length > 0;
    const bHasNews = b.news && b.news.length > 0;

    if (aHasNews && !bHasNews) return -1;
    if (!aHasNews && bHasNews) return 1;

    // Then sort by minimum gap value
    // Handle null values by treating them as Infinity (placing them at the end)

    const aRelevantGap =
      a.relevantDaysGap !== null ? a.relevantDaysGap : Infinity;
    const aReportGap = a.reportDaysGap !== null ? a.reportDaysGap : Infinity;
    const bRelevantGap =
      b.relevantDaysGap !== null ? b.relevantDaysGap : Infinity;
    const bReportGap = b.reportDaysGap !== null ? b.reportDaysGap : Infinity;

    const aMinGap = Math.min(aRelevantGap, aReportGap);
    const bMinGap = Math.min(bRelevantGap, bReportGap);

    if (aMinGap === Infinity && bMinGap === Infinity) return -1;

    return aMinGap - bMinGap;
  });
}
