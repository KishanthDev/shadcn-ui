'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useThemeConfig } from '@/components/active-theme';

export function UserNav() {
  const user = {
    id: 'user_123',
    fullName: 'John Doe',
    emailAddress: 'johndoe@gmail.com',
  };

  const router = useRouter();
  const { activeTheme, setActiveTheme } = useThemeConfig();

  const DEFAULT_THEMES = [
    { name: 'Default', value: 'default' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Amber', value: 'amber' }
  ];

  const SCALED_THEMES = [
    { name: 'Default', value: 'default-scaled' },
    { name: 'Blue', value: 'blue-scaled' }
  ];

  const MONO_THEMES = [
    { name: 'Mono', value: 'mono-scaled' }
  ];

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='secondary'
          className='relative h-8 w-8 rounded-kg flex items-center justify-center'
          aria-label='User profile'
        >
          <IconUser className='h-5 w-5 ' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='w-56'
        align='end'
        sideOffset={10}
        forceMount
      >
        {/* User Info */}
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user.fullName}</p>
            <p className='text-xs text-muted-foreground leading-none'>
              {user.emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Account */}
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>Refresh Token</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Default Themes */}
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
          Default Themes
        </DropdownMenuLabel>
        {DEFAULT_THEMES.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setActiveTheme(theme.value)}
            className={activeTheme === theme.value ? 'bg-accent/40 font-medium' : ''}
          >
            {theme.name}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* Scaled Themes */}
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
          Scaled Themes
        </DropdownMenuLabel>
        {SCALED_THEMES.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setActiveTheme(theme.value)}
            className={activeTheme === theme.value ? 'bg-accent/40 font-medium' : ''}
          >
            {theme.name}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* Monospaced Themes */}
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
          Monospaced Themes
        </DropdownMenuLabel>
        {MONO_THEMES.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setActiveTheme(theme.value)}
            className={activeTheme === theme.value ? 'bg-accent/40 font-medium' : ''}
          >
            {theme.name}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
