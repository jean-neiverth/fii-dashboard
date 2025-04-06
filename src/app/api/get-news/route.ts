import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Disable caching for this route

const NEWS_API_KEY = process.env.NEWS_API_KEY;

async function getNews() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=cpts11&from=2025-03-06&sortBy=popularity&apiKey=${NEWS_API_KEY}`,
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

    if (data) return { news: data };
    return { ok: true };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const news = await getNews();
    return NextResponse.json(news);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: (error as Error)?.message ?? "failed to fetch fiis data" },
      { status: 500 }
    );
  }
}
