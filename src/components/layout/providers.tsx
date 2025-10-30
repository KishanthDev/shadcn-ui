'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import { ActiveThemeProvider } from '../active-theme';

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {

  return (
    <>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
          {children}
      </ActiveThemeProvider>
    </>
  );
}
