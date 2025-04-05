import { addTicker, removeTicker } from "@/utils/storage";
import { Dispatch, SetStateAction, useState, useMemo } from "react";

export const TickerSelector = ({
  tickers,
  selectedTickers,
  setSelectedTickers,
}: {
  tickers: string[] | undefined;
  selectedTickers: string[];
  setSelectedTickers: Dispatch<SetStateAction<string[]>>;
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const unSelectedTickers = tickers
    ? tickers.filter((ticker) => !selectedTickers.includes(ticker))
    : [];

  const tickersClustered = [...selectedTickers, ...unSelectedTickers];

  const handleTickerClick = (ticker: string) => {
    console.log({ ticker });
    if (selectedTickers.includes(ticker)) {
      removeTicker(ticker);
      const newTickers = selectedTickers.filter((item) => item !== ticker);
      setSelectedTickers(newTickers);
    } else {
      addTicker(ticker);
      setSelectedTickers((tickers) => [...tickers, ticker]);
    }
  };

  // Filter tickers based on search query
  const filteredTickers = useMemo(() => {
    if (!searchQuery.trim()) return tickersClustered;

    const query = searchQuery.toLowerCase().trim();
    return tickersClustered.filter((ticker) =>
      ticker.toLowerCase().includes(query)
    );
  }, [tickersClustered, searchQuery]);

  // Loading state
  if (!tickers)
    return (
      <div className="w-[calc(16.5vw)] mx-4 h-screen border-[1px] border-gray-300 rounded-2xl p-2 animate-pulse bg-sky-300" />
    );

  return (
    <div className="w-[calc(16.5vw)] mx-4 h-fit flex flex-col border-[1px] border-gray-300 rounded-2xl p-2">
      {/* Search input */}
      <div className="mb-3 sticky top-0">
        <input
          type="text"
          placeholder="Busque um ticker..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg bg-white"
        />
      </div>

      {/* Ticker list */}
      <div className="overflow-y-auto">
        {filteredTickers.length > 0 ? (
          filteredTickers.map((ticker) => (
            <div
              key={ticker}
              onClick={() => handleTickerClick(ticker)}
              className="flex gap-2 py-[2px] cursor-pointer hover:font-bold hover:text-lg hover:py-0 transition-all"
            >
              <input
                type="checkbox"
                checked={selectedTickers.includes(ticker)}
                onClick={(e) => e.stopPropagation()} // Prevent double-triggering
                onChange={() => {}} // React requires onChange with checked prop
                className="cursor-pointer"
              />
              <span className="select-none">{ticker}</span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No matching tickers found
          </div>
        )}
      </div>
    </div>
  );
};
