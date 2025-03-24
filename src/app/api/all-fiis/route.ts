import { getAllFiis } from "@/utils/all-fiis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Disable caching for this route

export async function GET() {
  try {
    const allFiis = await getAllFiis();
    return NextResponse.json(allFiis);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch FIIs data" },
      { status: 500 }
    );
  }
}
