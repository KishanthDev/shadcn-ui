export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getStatsigServer, getStatsigUser } from "@/lib/statsig";

export async function GET() {
  const statsig = await getStatsigServer();
  const user = getStatsigUser();

  const paramStore2 = await statsig.getParameterStore(user, "test-parameter");

  const device_card = paramStore2.getValue("test-para", "default-value");
  const browser_card = paramStore2.getValue("browser-card", "default-value-2");

  return NextResponse.json({
    status: "ok",
    testParameter: { device_card, browser_card },
  });
}
