"use client";

import { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import { useAllFiis } from "@/hooks/useAllFiis";

import { getTickers } from "@/utils/storage/selected-tickers";
import { TickerSelector } from "@/components/ticker-selector";
import { FiiCards } from "@/components/fii-cards";
import { useFiisData } from "@/hooks/useFiisData";

export default function Home() {
  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);
  const { data: tickers } = useAllFiis();

  useEffect(() => {
    setSelectedTickers(getTickers());
  }, []);

  const { data: fiisData } = useFiisData(selectedTickers);

  return (
    <div className="w-full flex justify-center items-start">
      <TickerSelector
        tickers={tickers}
        selectedTickers={selectedTickers}
        setSelectedTickers={setSelectedTickers}
      />
      <FiiCards fiisData={fiisData} />
    </div>
  );
}
