import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.TWELVE_DATA_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Twelve Data API key is missing" },
      { status: 500 }
    );
  }

  const url =
    `https://api.twelvedata.com/time_series?` +
    `symbol=EUR/USD` +
    `interval=1min` +
    `outputsize=50` +
    `apikey=${apiKey}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  const data = await response.json();

  return NextResponse.json(data);
}
