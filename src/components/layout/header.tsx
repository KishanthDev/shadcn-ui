'use client';

import React from 'react';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';
import { UserNav } from './user-nav';
import { ModeToggle } from './ThemeToggle/theme-toggle';
import Image from 'next/image';

export default function Header() {
  const { open } = useSidebar();

  return (
    <header
      className="
        flex h-14 w-full shrink-0 border-b shadow-sm items-center justify-between 
        px-2 bg-background
      "
    >

      {/* LEFT SIDE — LOGO + TEXT */}
      <div
        className={`
          flex items-center 
          transition-all duration-500 ease-in-out
          ${open ? "w-[13.5rem]" : "w-[3rem]"}
        `}
      >
        {/* Logo */}
        <div
          className="flex aspect-square size-8 items-center justify-center rounded shrink-0"
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

        {/* Company name */}
        <div
          className={`
    flex flex-col leading-none
    transition-all duration-500 ease-in-out
    overflow-hidden
    ${open ? "opacity-100 max-w-[200px] ml-3" : "opacity-0 max-w-0 ml-0"}
  `}
        >
          <span className="font-semibold text-sm whitespace-nowrap">TELA DOC</span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">Enterprise</span>
        </div>

      </div>

      {/* CENTER — SIDEBAR TRIGGER */}
      <div
        className={`
          flex-1 flex items-center 
          transition-all duration-500 ease-in-out
        `}
      >
        <SidebarTrigger />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        <ModeToggle />
        <UserNav />
      </div>
    </header>
  );
}
