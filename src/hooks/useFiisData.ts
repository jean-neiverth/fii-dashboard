import useSWR from "swr";

export function useFiisData(fiis: string[]) {
  const fetcher = async () => {
    const fiisData = await Promise.all(
      fiis.map((ticker) => fetch(`/api/get-fii?ticker=${ticker}`))
    );

    return (await Promise.all(fiisData.map((response) => response.json()))).map(
      (fii) => fii.documents
    );
  };

  return useSWR(fiis, fetcher, {
    revalidateIfStale: false,
    refreshInterval: 0,
    revalidateOnFocus: false,
  });
}
