export async function getAllFiis() {
  try {
    const response = await fetch(
      "https://fiis.com.br/wp-json/fiis/v1/lupa_fiis",
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

    if (fiis)
      return {
        fiis: (JSON.parse(fiis) as { ticker: string }[]).map(
          (fii) => fii.ticker
        ),
      };
    throw new Error("Couldn't fetch Fiis");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
