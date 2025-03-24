import { getFii } from "@/utils/get-fii";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Disable caching for this route

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

    // Get FII data using the provided ticker
    const fiiData = await getFii(ticker);

    return NextResponse.json(fiiData);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch FIIs data" },
      { status: 500 }
    );
  }
}
