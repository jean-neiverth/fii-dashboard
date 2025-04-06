import { fetchFiiData } from "@/utils/fetch-fii-data";
import { addFiiCache, getFiisCache } from "@/utils/storage/fiis-data";
import { FiiData } from "@/utils/types";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function useFiisData(tickers: string[]) {
  const fetcher = async () => {
    // 1. Get current cached fiis data
    const cachedFiis = getFiisCache();

    // 2. Label cached fiis data with (timestamp less than 20 hours ago || not present in current cache) as to-fetch
    const okFiisData = cachedFiis.filter(
      (fii) => !(fii.timestampMs < Date.now() - 1000 * 60 * 60 * 20)
    );
    const staledCachedTickers = cachedFiis
      .filter((fii) => fii.timestampMs < Date.now() - 1000 * 60 * 60 * 20)
      .map((fii) => fii.ticker);
    const missingTickers = tickers.filter(
      (ticker) => !cachedFiis.map((fii) => fii.ticker).includes(ticker)
    );
    const toFetchTickers = [...staledCachedTickers, ...missingTickers];

    // 3. Fetch to-fetch fiis
    const newFiisData = (
      await Promise.all(toFetchTickers.map((ticker) => fetchFiiData(ticker)))
    ).filter((fii) => fii !== null);

    // 4. Store the newly read ones in localStorage
    for (const fiiData of newFiisData) {
      addFiiCache(fiiData);
    }

    // 5. Merge previous not stale and new data
    const finalFiis = [...okFiisData, ...newFiisData].filter((fii) =>
      tickers.includes(fii.ticker)
    );

    return finalFiis;
  };

  const [oldData, setOldData] = useState<FiiData[]>([]);

  const { data: newData, isLoading } = useSWR(tickers, fetcher, {
    revalidateIfStale: false,
    refreshInterval: 0,
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (newData) setOldData(newData);
  }, [newData]);

  const data = newData ?? oldData;

  return { data, isLoading };
}
