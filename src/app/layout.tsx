import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import { fontVariables } from '@/lib/font';
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { StatsigBootstrapProvider } from "@statsig/next";

import './globals.css';
import './theme.css';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b',
};

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn',
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // 🟩 Get active theme from cookies dynamically
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get('active_theme')?.value || 'blue';
  const isScaled = activeThemeValue.endsWith('-scaled');

  // 🟦 Statsig user object
  const user = {
    userID: "user-123", // customize later
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Next Shadcn</title>
        <meta
          name="description"
          content="Basic dashboard with Next.js and Shadcn"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.theme || '${activeThemeValue}';
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const metaTheme = (theme === 'dark' || (theme === 'system' && prefersDark))
                  ? '${META_THEME_COLORS.dark}'
                  : '${META_THEME_COLORS.light}';
                document.querySelector('meta[name="theme-color"]').setAttribute('content', metaTheme);
              } catch (_) {}
            `,
          }}
        />
      </head>

      <body
        className={cn(
          'bg-background overflow-hidden overscroll-none font-sans antialiased',
          activeThemeValue ? `theme-${activeThemeValue}` : 'theme-blue',
          isScaled ? 'theme-scaled' : '',
          fontVariables
        )}
      >
        {/* 🟪 Wrap everything inside Statsig */}
        <StatsigBootstrapProvider
          user={user}
          clientKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY || ''}
          serverKey={process.env.STATSIG_SERVER_KEY || ''}
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
