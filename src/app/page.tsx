"use client";

import { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import { useAllFiis } from "@/hooks/useAllFiis";

import { getTickers, addTicker, removeTicker } from "@/utils/storage";
import { TickerSelector } from "@/components/ticker-selector";
import { FiiCards } from "@/components/fii-cards";

export default function Home() {
  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);
  const { data: tickers } = useAllFiis();

  useEffect(() => {
    setSelectedTickers(getTickers());
  }, []);

  return (
    <div className="w-full flex justify-center items-start">
      <TickerSelector
        tickers={tickers}
        selectedTickers={selectedTickers}
        setSelectedTickers={setSelectedTickers}
      />
      <FiiCards tickers={selectedTickers} />
    </div>
  );
}
