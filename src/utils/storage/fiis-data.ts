"use client";

import { FiiData } from "../types";

const FIIS_DATA_KEY = "fii-dashboard@v1/fiis-data";

export interface FiiCache {
  ticker: string;
  lastTimestamp: number;
  data: FiiData;
}

export type FiisCache = FiiCache[];

export const getFiisCache = (): FiisCache => {
  const fiis = localStorage.getItem(FIIS_DATA_KEY);

  if (!fiis) return [];
  return JSON.parse(fiis) as FiisCache;
};

export const getFiiCache = (ticker: string): FiiCache | null => {
  const fiis = localStorage.getItem(FIIS_DATA_KEY);

  if (!fiis) return null;

  const parsedFiis = JSON.parse(fiis) as FiisCache;

  const fii = parsedFiis.find((fii) => fii.ticker === ticker);
  if (!fii) return null;

  return fii;
};

export const addFiiCache = (fiiCache: FiiCache) => {
  const currentFiisCache = getFiisCache();

  if (currentFiisCache.length === 0) {
    localStorage.setItem(FIIS_DATA_KEY, JSON.stringify([fiiCache]));
    return;
  }

  if (currentFiisCache.map((fii) => fii.ticker).includes(fiiCache.ticker)) {
    const updatedCache = currentFiisCache.map((fii) =>
      fii.ticker === fiiCache.ticker ? fiiCache : fii
    );
    localStorage.setItem(FIIS_DATA_KEY, JSON.stringify(updatedCache));
  }

  localStorage.setItem(
    FIIS_DATA_KEY,
    JSON.stringify([...currentFiisCache, fiiCache])
  );
};
