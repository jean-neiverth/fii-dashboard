"use client";

const TICKERS_KEY = "fii-dashboard@v1/tickers";

export const getTickers = (): string[] => {
  const tickers = localStorage.getItem(TICKERS_KEY);

  if (!tickers) return [];
  return JSON.parse(tickers) as string[];
};

export const addTicker = (ticker: string) => {
  const currentTickers = getTickers();

  if (currentTickers.length === 0) {
    localStorage.setItem(TICKERS_KEY, JSON.stringify([ticker]));
    return;
  }

  if (currentTickers.includes(ticker)) return;

  localStorage.setItem(
    TICKERS_KEY,
    JSON.stringify([...currentTickers, ticker])
  );
};

export const removeTicker = (ticker: string) => {
  const currentTickers = getTickers();

  if (!currentTickers.includes(ticker)) return;

  const newTickers = currentTickers.filter((item) => item !== ticker);

  localStorage.setItem(TICKERS_KEY, JSON.stringify(newTickers));
};
