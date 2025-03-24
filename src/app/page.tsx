import { ReactNode } from "react";
import clsx from "clsx";

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

export default function Home() {
  return (
    <div className="w-full flex justify-center items-start">
      <div className="w-[calc(16.5vw)] mx-4 h-fit flex flex-col border-[1px] border-gray-300 rounded-2xl p-2">
        <p>CPTS11</p>
        <p>CPTS11</p>
        <p>CPTS11</p>
        <p>CPTS11</p>
        <p>CPTS11</p>
      </div>
      <div className="min-w-2/3 min-h-screen py-1">
        <table className="w-full">
          <Thead />
          <tbody>
            {fiiList.map((fii, index) => {
              return <Tr key={index} data={fii} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
