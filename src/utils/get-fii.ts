const getTodayFormatted = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Get date from 1 month ago in 'yyyy-mm-dd' format
const getOneMonthAgoFormatted = (): string => {
  const today = new Date();
  // Create a new date by setting the month to one less than current
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const year = oneMonthAgo.getFullYear();
  const month = String(oneMonthAgo.getMonth() + 1).padStart(2, "0");
  const day = String(oneMonthAgo.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export async function getFii(ticker: string) {
  try {
    const today = getTodayFormatted();
    const oneMonthAgo = getOneMonthAgoFormatted();

    const response = await fetch(
      `https://fiis.com.br/wp-json/fiis/v1/updates-ticker?start=${oneMonthAgo}&end=${today}&ticker=${ticker.toUpperCase()}`,
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

    const fiis = await response.json();

    if (fiis) return { documents: JSON.parse(fiis) };
    return { ok: true };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
