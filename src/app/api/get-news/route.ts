import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Disable caching for this route

const NEWS_API_KEY = process.env.NEWS_API_KEY;

const getTwoDaysAgoFormatted = (): string => {
  const today = new Date();
  // Create a new date by setting the month to one less than current
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 3);

  const year = twoDaysAgo.getFullYear();
  const month = String(twoDaysAgo.getMonth() + 1).padStart(2, "0");
  const day = String(twoDaysAgo.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

async function getNews(ticker: string) {
  try {
    const twoDaysAgo = getTwoDaysAgoFormatted();

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${ticker}&from=${twoDaysAgo}&sortBy=popularity&apiKey=${NEWS_API_KEY}`,
      {
        method: "GET",
        headers: {
          "x-fiis-nonce": "61495f60b533cc40ad822e054998a3190ea9bca0d94791a1da",
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59",
          Origin: "http://localhost:3000",
          Referer: "http://localhost:3000",
        },
      }
    );

    const data = await response.json();

    const articles = data.articles;

    if (data) return { news: articles };
    return { ok: true };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    // Get the URL from the request
    const { searchParams } = new URL(request.url);

    // Get the ticker parameter from the URL
    const ticker = searchParams.get("ticker");

    // If no ticker is provided, return an error
    if (!ticker) {
      return NextResponse.json(
        { error: "Ticker parameter is required" },
        { status: 400 }
      );
    }

    const news = await getNews(ticker);
    return NextResponse.json(news);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: (error as Error)?.message ?? "failed to fetch fiis data" },
      { status: 500 }
    );
  }
}
