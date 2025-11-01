'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { IconSun, IconMoon } from '@tabler/icons-react';

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeToggle = React.useCallback(() => {
    const newMode = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newMode);
  }, [resolvedTheme, setTheme]);

  return (
    <Button
      variant='secondary'
      size='icon'
      className='group/toggle size-8 relative'
      onClick={handleThemeToggle}
    >
      {resolvedTheme === 'dark' ? (
        <IconMoon className='h-5 w-5 text-white-700 transition-transform duration-300 rotate-0 scale-100' />
      ) : (
        <IconSun className='h-5 w-5 text-black-400 transition-transform duration-300 rotate-0 scale-100' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
