export type News = {
  title: string;
  url: string;
}[];

export interface FiiData {
  ticker: string;
  dy: string | null;
  dy12m: string | null;
  report: string | null;
  reportDaysGap: number | null;
  relevant: string | null;
  relevantDaysGap: number | null;
  news: News;
  timestampMs: number;
}
