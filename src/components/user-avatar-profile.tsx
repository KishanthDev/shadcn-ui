import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IconUser } from '@tabler/icons-react';
import { Button } from './ui/button';

interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  user: {
    imageUrl?: string;
    fullName?: string | null;
    emailAddress: string;
  } | null;
}

export function UserAvatarProfile({ user, showInfo }: UserAvatarProfileProps) {
  return (
    <div
      className='flex items-center gap-2 cursor-pointer rounded-lg'
      role='button'
      aria-label='User profile'
    >
      <div className='relative h-8 w-8 rounded-lg flex items-center justify-center bg-secondary'>
        <IconUser className='h-5 w-5 text-muted-foreground' />
      </div>

      {showInfo && (
        <div className='grid flex-1 text-left text-sm leading-tight'>
          <span className='truncate font-semibold'>{user?.fullName || ''}</span>
          <span className='truncate text-xs'>{user?.emailAddress || ''}</span>
        </div>
      )}
    </div>
  );
}

