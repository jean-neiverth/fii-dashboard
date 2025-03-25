import useSWR from "swr";

export function useAllFiis() {
  const fetcher = async () => {
    const fiis = await fetch("/api/all-fiis");
    return ((await fiis.json()).fiis as string[]).sort();
  };

  return useSWR("allFiis", fetcher, {
    revalidateIfStale: false,
    refreshInterval: 0,
    revalidateOnFocus: false,
  });
}
