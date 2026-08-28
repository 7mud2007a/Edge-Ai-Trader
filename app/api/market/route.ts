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

    const params = new URLSearchParams();

    params.set("symbol", symbol);
    params.set("interval", interval);
    params.set("outputsize", "100");
    params.set("apikey", apiKey);

    const response = await fetch(
      `https://api.twelvedata.com/time_series?${params.toString()}`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (data.status === "error") {
      return NextResponse.json(
        {
          error: data.message || "Twelve Data error",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: "success",
      symbol,
      interval,
      values: data.values || [],
    });
  } catch (error) {
    console.error("Market API error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch market data",
      },
      { status: 500 }
    );
  }
}
