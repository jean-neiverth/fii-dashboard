import Link from "next/link";
import { FiiData } from "@/utils/types";

const LinkCard = ({ text, link }: { text: string; link: string }) => {
  return (
    <Link href={link} target="_blank">
      <div className="flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 rounded-xl font-bold text-white transition-all shadow-md">
        {text}
      </div>
    </Link>
  );
};

const FiiCard = ({ ticker, dy, dy12m, report, relevant, news }: FiiData) => {
  return (
    <div className="w-full flex flex-col rounded-3xl p-4 gap-3 bg-gray-200 shadow-md border-[1px] border-gray-300 shadow-gray-300">
      <span className="font-bold text-2xl">{ticker.toUpperCase()}</span>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span>Yield</span>
          <span className="text-lg font-bold text-gray-700">{dy}%</span>
        </div>
        <div className="flex flex-col">
          <span>{"Yield (12M)"}</span>
          <span className="text-lg font-bold text-gray-700">{dy12m}%</span>
        </div>
        {report && <LinkCard text=" Acessar relatório" link={report} />}
        {relevant && <LinkCard text="Acessar fato relevante" link={relevant} />}
      </div>
      <span className="mb-[-12px] font-bold text-gray-700">Notícias:</span>
      {news.map((n) => (
        <p key={n.url}>{n.title}</p>
      ))}
    </div>
  );
};

export const FiiCards = ({ fiisData }: { fiisData: FiiData[] | undefined }) => {
  return (
    <div className="w-full min-h-screen py-1 flex flex-col gap-4">
      {fiisData &&
        fiisData.map((fiiData) => {
          return (
            <FiiCard key={`fii-card-${fiiData.ticker}`} {...fiiData}></FiiCard>
          );
        })}
    </div>
  );
};
