import { FiiData, News } from "./types";

export async function fetchFiiData(ticker: string): Promise<FiiData | null> {
  const [documentsResponse, newsResponse] = await Promise.all([
    fetch(`/api/get-fii?ticker=${ticker}`),
    fetch(`/api/get-news?ticker=${ticker}`),
  ]);
  if (!documentsResponse.ok)
    throw new Error("Error getting documents: response not ok");

  const documents = (await documentsResponse.json()).documents as Omit<
    FiiData,
    "news"
  >;
  const news = newsResponse.ok
    ? ((await newsResponse.json()).news as News)
    : [];

  return {
    ...documents,
    news,
    timestampMs: Date.now(),
  };
}
