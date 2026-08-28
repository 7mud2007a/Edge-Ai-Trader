import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const apiKey = process.env.TICKATLAS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "TICKATLAS_API_KEY is missing" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);

    const currency = searchParams.get("currency") || "";
    const limit = searchParams.get("limit") || "50";

    const params = new URLSearchParams();

    params.set("limit", limit);

    if (currency) {
      params.set("currency", currency);
    }

    const response = await fetch(
      `https://api.tickatlas.com/v1/calendar?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "X-API-Key": apiKey,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data?.message || data?.error || "TickAtlas request failed",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("News API error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch economic calendar",
      },
      { status: 500 }
    );
  }
}
