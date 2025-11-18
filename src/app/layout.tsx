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
import { UAParser } from "ua-parser-js";

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

  // ✅ CORRECT: Parse User-Agent directly in layout
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  const deviceInfo = {
    os: result.os.name ?? "Unknown",
    osVersion: result.os.version ?? "Unknown",
    browser: result.browser.name ?? "Unknown",
    browserVersion: result.browser.version ?? "Unknown",
    device: result.device.model ?? result.device.vendor ?? "Desktop",
    deviceType: result.device.type ?? "desktop",
    isMobile: result.device.type === "mobile",
    isTablet: result.device.type === "tablet",
    isDesktop: !result.device.type || ["desktop", "console"].includes(result.device.type || ""),
  };

  const statsigUser = {
    userID: "user_12345",
    email: "demo@example.com",

    // Standard Statsig fields
    os_name: deviceInfo.os,
    os_version: deviceInfo.osVersion,
    browser_name: deviceInfo.browser,
    browser_version: deviceInfo.browserVersion,

    // Custom fields
    custom: {
      deviceModel: deviceInfo.device,
      deviceType: deviceInfo.deviceType,
      isMobile: deviceInfo.isMobile,
      isTablet: deviceInfo.isTablet,
      isDesktop: deviceInfo.isDesktop,
      userAgent: userAgent.slice(0, 200), // For debugging
    },
  };

  console.log("✅ Statsig User (Direct Parsing):", JSON.stringify(statsigUser, null, 2));

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
