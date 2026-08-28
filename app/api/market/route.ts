import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const apiKey = process.env.TWELVE_DATA_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "TWELVE_DATA_API_KEY is missing" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);

    const symbol = searchParams.get("symbol") || "EUR/USD";
    const interval = searchParams.get("interval") || "1min";

    const url =
      `https://api.twelvedata.com/time_series?` +
      `symbol=${encodeURIComponent(symbol)}` +
      `interval=${encodeURIComponent(interval)}` +
      `outputsize=100` +
      `apikey=${encodeURIComponent(apiKey)}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok || data.status === "error") {
      return NextResponse.json(
        {
          error: data.message || "Twelve Data request failed",
        },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json({
      symbol,
      interval,
      values: data.values || [],
    });
  } catch (error) {
    console.error("Market API error:", error);

    return NextResponse.json(
      { error: "Failed to load market data" },
      { status: 500 }
    );
  }
}
