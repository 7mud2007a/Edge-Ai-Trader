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

    const currency = searchParams.get("currency");
    const impact = searchParams.get("impact");
    const nextHours = searchParams.get("next_hours") || "168";

    const params = new URLSearchParams();

    params.set("next_hours", nextHours);
    params.set("limit", "100");

    if (currency) {
      params.set("currencies", currency);
    }

    if (impact) {
      params.set("impact", impact);
    }

    const response = await fetch(
      `https://tickatlas.com/v1/calendar?${params.toString()}`,
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
          error:
            data?.error?.message ||
            data?.message ||
            data?.error ||
            "TickAtlas request failed",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("TickAtlas calendar error:", error);

    return NextResponse.json(
      {
        error: "Failed to connect to TickAtlas",
      },
      { status: 500 }
    );
  }
}
