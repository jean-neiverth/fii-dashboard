import Link from "next/link";
import { FiiData } from "@/utils/types";

const getDaysText = (x: number) => {
  if (x < 1) return "Hoje";
  if (x === 1) return "1 dia atrás";
  return `${x} dias atrás`;
};

const LinkCard = ({
  text,
  subtext,
  link,
  nullText,
}: {
  text: string;
  subtext: string;
  link: string | null;
  nullText: string;
}) => {
  return (
    <>
      {link ? (
        <Link href={link} target="_blank">
          <div className="flex flex-col items-center justify-center h-12 w-40 bg-green-500 hover:bg-green-600 rounded-xl text-white transition-all shadow-md text-center">
            <p className="font-bold text-lg">{text}</p>
            {subtext && (
              <p className="mt-[-4px] font-normal text-sm">{subtext}</p>
            )}
          </div>
        </Link>
      ) : (
        <div className="flex items-center justify-center h-12 w-40 bg-gray-500 rounded-xl font-bold text-gray-300 shadow-md cursor-not-allowed opacity-50">
          {nullText}
        </div>
      )}
    </>
  );
};

const FiiCard = ({
  ticker,
  dy,
  dy12m,
  report,
  reportDaysGap,
  relevant,
  relevantDaysGap,
  news,
}: FiiData) => {
  return (
    <div className="w-full flex flex-col rounded-3xl p-4 gap-3 bg-gray-200 shadow-md border-[1px] border-gray-300 shadow-gray-300">
      <Link
        href={`https://fiis.com.br/${ticker}`}
        target="_blank"
        className="p-[2.75px] hover:p-0 font-bold text-2xl cursor-pointer hover:text-green-600 hover:text-[28px] transition-all w-30"
      >
        <span>{ticker.toUpperCase()}</span>
      </Link>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="cursor-default">Yield</span>
          <span className="text-lg font-bold text-gray-700 cursor-default">
            {dy}%
          </span>
        </div>
        <div className="flex flex-col">
          <span className="cursor-default">{"Yield (12M)"}</span>
          <span className="text-lg font-bold text-gray-700 cursor-default">
            {dy12m}%
          </span>
        </div>
        <LinkCard
          text="Relatório"
          subtext={reportDaysGap ? getDaysText(reportDaysGap) : ""}
          nullText="Sem relatório"
          link={report}
        />
        <LinkCard
          text="Fato Relevante"
          subtext={relevantDaysGap ? getDaysText(relevantDaysGap) : ""}
          nullText="Sem fato relevante"
          link={relevant}
        />
      </div>
      {news.length > 0 && (
        <span className="mb-[-12px] font-bold text-gray-700">Notícias:</span>
      )}
      {news.map((n) => (
        <Link href={n.url} key={n.url} target="_blank">
          <p className="cursor-pointer hover:underline transition-all">
            {n.title}
          </p>
        </Link>
      ))}
    </div>
  );
};

export const FiiCards = ({
  fiisData,
  isLoading,
}: {
  fiisData: FiiData[] | undefined;
  isLoading: boolean;
}) => {
  return (
    <div className="w-full min-h-screen py-1 flex flex-col gap-4">
      {fiisData &&
        fiisData.map((fiiData) => {
          return (
            <FiiCard key={`fii-card-${fiiData.ticker}`} {...fiiData}></FiiCard>
          );
        })}
      {isLoading && (
        <div className="w-full flex flex-col rounded-3xl h-28 animate-pulse bg-gray-200 shadow-md border-[1px] border-gray-300 shadow-gray-300" />
      )}
    </div>
  );
};
