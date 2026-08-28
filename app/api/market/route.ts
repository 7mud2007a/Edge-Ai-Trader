import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "API_ROUTE_WORKING",
    hasKey: !!process.env.TWELVE_DATA_API_KEY,
  });
}
