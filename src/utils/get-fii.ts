import { parseFiiData } from "./parseDocuments";

const getTodayFormatted = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Get date from 1 month ago in 'yyyy-mm-dd' format
const getStartDateFormatted = (): string => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setFullYear(today.getFullYear() - 1);

  const year = startDate.getFullYear();
  const month = String(startDate.getMonth() + 1).padStart(2, "0");
  const day = String(startDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export async function getFii(ticker: string) {
  try {
    const today = getTodayFormatted();
    const startDate = getStartDateFormatted();

    const response = await fetch(
      `https://fiis.com.br/wp-json/fiis/v1/updates-ticker?start=${startDate}&end=${today}&ticker=${ticker.toUpperCase()}`,
      {
        method: "GET",
        headers: {
          "x-fiis-nonce": "61495f60b533cc40ad822e054998a3190ea9bca0d94791a1da",
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59",
          Origin: "https://fiis.com.br",
          Referer: "https://fiis.com.br/",
        },
      }
    );

    const documents = JSON.parse(await response.json());

    const parsedDocuments = { ticker, ...parseFiiData({ documents }) };

    if (parsedDocuments) return { documents: parsedDocuments };
    return { ok: true };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
