// app/layout.tsx
import "./globals.css";
import "./theme.css";

import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/sonner";
import { fontVariables } from "@/lib/font";
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { StatsigBootstrapProvider } from "@statsig/next";

// Fetch device info from our API route
async function fetchDeviceInfo() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:3000`;
    const res = await fetch(`${baseUrl}/api/device-info`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "User-Agent": (await headers()).get("user-agent") || "", // Forward UA
      },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch device info:", err);
    return null;
  }
}

export const metadata: Metadata = {
  title: "Next Shadcn",
  description: "Basic dashboard with Next.js and Shadcn",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value || "blue";
  const isScaled = activeThemeValue.endsWith("-scaled");

  // Get real device info from our API route
  const deviceInfo = await fetchDeviceInfo();

  const statsigUser = {
    userID: "user_12345",
    email: "demo@example.com",

    // Standard Statsig fields
    os_name: deviceInfo?.os || "Unknown",
    os_version: deviceInfo?.osVersion || "Unknown",
    browser_name: deviceInfo?.browser || "Unknown",
    browser_version: deviceInfo?.browserVersion || "Unknown",

    // Custom fields (very useful for targeting!)
    custom: {
      deviceModel: deviceInfo?.device || "Unknown",
      deviceType: deviceInfo?.deviceType || "desktop",
      isMobile: deviceInfo?.isMobile || false,
      isTablet: deviceInfo?.isTablet || false,
      isDesktop: deviceInfo?.isDesktop || true,
    },
  };

  console.log("Statsig User with Device Info:", statsigUser);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Next Shadcn</title>
        <meta name="description" content="Basic dashboard with Next.js and Shadcn" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.theme || '${activeThemeValue}';
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const metaTheme = (theme === 'dark' || (theme === 'system' && prefersDark))
                  ? '#09090b'
                  : '#ffffff';
                document.querySelector('meta[name="theme-color"]')?.setAttribute('content', metaTheme);
              } catch (_) {}
            `,
          }}
        />
      </head>

      <body
        className={cn(
          "bg-background overflow-hidden overscroll-none font-sans antialiased",
          `theme-${activeThemeValue}`,
          isScaled ? "theme-scaled" : "",
          fontVariables
        )}
      >
        <StatsigBootstrapProvider
          clientKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!}
          serverKey={process.env.STATSIG_SERVER_KEY!}
          user={statsigUser}
        >
          <NextTopLoader color="var(--primary)" showSpinner={false} />

          <NuqsAdapter>
            <ThemeProvider
              attribute="class"
              defaultTheme={activeThemeValue}
              enableSystem
              disableTransitionOnChange
              enableColorScheme
            >
              <Providers activeThemeValue={activeThemeValue}>
                <Toaster />
                {children}
              </Providers>
            </ThemeProvider>
          </NuqsAdapter>
        </StatsigBootstrapProvider>
      </body>
    </html>
  );
}