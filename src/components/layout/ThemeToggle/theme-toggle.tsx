'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { IconSun, IconMoon } from '@tabler/icons-react';

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = React.useCallback(() => {
    const newMode = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newMode);
  }, [resolvedTheme, setTheme]);

  // ✅ Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="secondary" size="icon" disabled className="size-8 relative">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      className="group/toggle size-8 relative"
      onClick={handleThemeToggle}
    >
      {resolvedTheme === 'dark' ? (
        <IconMoon className="h-5 w-5 text-white transition-transform duration-300" />
      ) : (
        <IconSun className="h-5 w-5 text-black transition-transform duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
