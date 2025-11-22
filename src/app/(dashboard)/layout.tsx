import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  
  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <div className="flex flex-col h-screen w-full">
          <Header />
          
          <div className="flex flex-1">
            <AppSidebar/>
            <main className="flex-1 bg-background overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </KBar>
  );
}
