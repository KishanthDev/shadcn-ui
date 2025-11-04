'use client';

import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import { UserNav } from './user-nav';
import { ModeToggle } from './ThemeToggle/theme-toggle';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex h-14 w-full shrink-0 border-b shadow-sm items-center justify-between px-4 bg-background">
      
      {/* LEFT SECTION — Sidebar + Company + Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle */}
        <SidebarTrigger className="-ml-1" />

        {/* Company logo */}
        <div
          className="flex aspect-square size-8 items-center justify-center rounded-lg shrink-0"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}
        >
          <Image
            src="/assets/logo.svg"
            alt="Company Logo"
            width={20}
            height={20}
            className="object-contain invert brightness-0"
            priority
          />
        </div>

        {/* Company name + plan */}
        <div className="flex flex-col leading-none">
          <span className="font-semibold text-sm">Acme Inc</span>
          <span className="text-xs text-muted-foreground">Enterprise</span>
        </div>

        {/* Separator between company and breadcrumbs */}
        <Separator orientation="vertical" className="h-5 mx-2" />

        {/* Breadcrumbs */}
        <Breadcrumbs />
      </div>

      {/* RIGHT SECTION — Mode & User Menu */}
      <div className="flex items-center gap-3">
        <ModeToggle />
        <UserNav />
      </div>
    </header>
  );
}
