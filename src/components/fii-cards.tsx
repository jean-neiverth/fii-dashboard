import clsx from "clsx";
import { ReactNode } from "react";

interface FiiData {
  ticker: string;
  dy: string;
  dy12m: string;
  report: string;
  relevant: string;
  news: string;
}

const Td = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <td
      className={clsx("border-r-2 border-t-2 border-gray-300 p-2", className)}
    >
      {children}
    </td>
  );
};

const Tr = ({ data }: { data: FiiData }) => {
  return (
    <tr className="border-b-2 border-gray-300">
      <Td className="w-[10%]">{data.ticker.toUpperCase()}</Td>
      <Td className="w-[10%]">{data.dy}</Td>
      <Td className="w-[10%]">{data.dy12m}</Td>
      <Td className="w-[10%]">
        <a href={data.report} target="_blank">
          Link
        </a>
      </Td>
      <Td className="w-[10%]">
        <a href={data.relevant} target="_blank">
          Link
        </a>
      </Td>
      <Td className="w-1/2">{data.news}</Td>
    </tr>
  );
};

const Thead = () => {
  return (
    <thead>
      <tr className="border-b-2 border-gray-300">
        <th className="w-[10%] border-r-2 border-gray-300 p-2">Ticker</th>
        <th className="w-[10%] border-r-2 border-gray-300 p-2">DY</th>
        <th className="w-[10%] border-r-2 border-gray-300 p-2">DY 12m</th>
        <th className="w-[10%] border-r-2 border-gray-300 p-2">
          Relatório gerencial
        </th>
        <th className="w-[10%] border-r-2 border-gray-300 p-2">
          Fatos Relevantes
        </th>
        <th className="w-1/2 border-l-2 border-gray-300 p-2">Notícias</th>
      </tr>
    </thead>
  );
};

const fiiList: FiiData[] = [
  {
    ticker: "cpts11",
    dy: "1.12",
    dy12m: "1.05",
    report: "https://www.clubefii.com.br/fiis/CPTS11",
    relevant: "https://www.clubefii.com.br/fiis/CPTS11",
    news: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis corporis, neque quas adipisci nihil perferendis illo minima architecto aperiam hic aspernatur magnam excepturi commodi maxime quasi culpa dicta ut repellat.",
  },
  {
    ticker: "cpts11",
    dy: "1.12",
    dy12m: "1.05",
    report: "https://www.clubefii.com.br/fiis/CPTS11",
    relevant: "https://www.clubefii.com.br/fiis/CPTS11",
    news: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis corporis, neque quas adipisci nihil perferendis illo minima architecto aperiam hic aspernatur magnam excepturi commodi maxime quasi culpa dicta ut repellat.",
  },
];

export const FiiCards = ({ tickers }: { tickers: string[] }) => {
  return (
    <div className="w-full min-h-screen py-1">
      <table className="w-full">
        <Thead />
        <tbody>
          {tickers.map((ticker, index) => {
            return <Tr key={ticker} data={fiiList[0]} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
