'use client';

import React from 'react';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import { UserNav } from './user-nav';
import { ModeToggle } from './ThemeToggle/theme-toggle';
import Image from 'next/image';

export default function Header() {
  const { open } = useSidebar();

  return (
    <header className="flex h-14 w-full shrink-0 border-b shadow-sm items-center justify-between px-3 bg-background">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* Logo */}
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

        {/* Company Name (smooth shrink) */}
        <div
          className={`
            flex flex-col leading-none
            transition-all duration-500 ease-in-out
            ${open 
              ? "opacity-100 w-auto ml-0"
              : "opacity-0 w-0 overflow-hidden"
            }
          `}
        >
          <span className="font-semibold text-sm">Acme Inc</span>
          <span className="text-xs text-muted-foreground">Enterprise</span>
        </div>

        <SidebarTrigger />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <ModeToggle />
        <UserNav />
      </div>
    </header>
  );
}
