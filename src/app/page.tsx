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

const Tr = ({
  children,
  className,
  data,
}: {
  children: ReactNode;
  className: string;
  data: FiiData;
}) => {
  return (
    <tr className="border-b-2 border-gray-300">
      <Td className="w-1/8">{data.ticker}</Td>
      <Td className="w-1/8">{data.dy}</Td>
      <Td className="w-1/8">{data.dy12m}</Td>
      <Td className="w-1/8">{data.report}</Td>
      <Td className="w-1/4">{data.relevant}</Td>
      <Td className="w-1/4">{data.news}</Td>
    </tr>
  );
};

const Thead = () => {
  return (
    <thead>
      <tr className="border-b-2 border-gray-300">
        <th className="w-1/8 border-r-2 border-gray-300 p-2">a</th>
        <th className="w-1/8 border-r-2 border-gray-300 p-2">b</th>
        <th className="w-1/8 border-r-2 border-gray-300 p-2">c</th>
        <th className="w-1/8 border-r-2 border-gray-300 p-2">d</th>
        <th className="w-1/4 border-r-2 border-gray-300 p-2">e</th>
        <th className="w-1/4 border-l-2 border-gray-300 p-2">f</th>
      </tr>
    </thead>
  );
};

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
            <tr>
              <td className="w-1/8 border-r-2 border-gray-300 p-2">aaa</td>
              <td className="w-1/8 border-r-2 border-gray-300 p-2">bbb</td>
              <td className="w-1/8 border-r-2 border-gray-300 p-2">ccc</td>
              <td className="w-1/8 border-r-2 border-gray-300 p-2">dddd</td>
              <td className="w-1/4 border-r-2 border-gray-300 p-2">eeee</td>
              <td className="w-1/4 border-l-2 border-gray-300 p-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis corporis, neque quas adipisci nihil perferendis illo
                minima architecto aperiam hic aspernatur magnam excepturi
                commodi maxime quasi culpa dicta ut repellat.
              </td>
            </tr>
            <tr>
              <td className="w-1/8 border-r-2 border-gray-300 p-2">aaa</td>
              <td className="w-1/8 border-r-2 border-gray-300 p-2">bbb</td>
              <td className="w-1/8 border-r-2 border-gray-300 p-2">ccc</td>
              <td className="w-1/8 border-r-2 border-gray-300 p-2">dddd</td>
              <td className="w-1/4 border-r-2 border-gray-300 p-2">eeee</td>
              <td className="w-1/4 border-l-2 border-gray-300 p-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis corporis, neque quas adipisci nihil perferendis illo
                minima architecto aperiam hic aspernatur magnam excepturi
                commodi maxime quasi culpa dicta ut repellat.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
