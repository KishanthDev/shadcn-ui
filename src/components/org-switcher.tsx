'use client';

import { GalleryVerticalEnd } from 'lucide-react';
import * as React from 'react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { IconPhotoUp } from '@tabler/icons-react';

export const company = {
  name: 'Acme Inc',
  logo: IconPhotoUp,
  plan: 'Enterprise',
};

export function OrgSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          className="pl-0 hover:bg-transparent hover:text-inherit focus-visible:ring-0 active:bg-transparent overflow-hidden"
          size="lg"
        >
          {/* Logo */}
          <div className="bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg shrink-0">
            <GalleryVerticalEnd className="size-4" />
          </div>

          {/* Text container with transition */}
          <div
            className="flex flex-col ml-3 leading-none overflow-hidden transition-all duration-300 ease-in-out group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:ml-0"
          >
            <span className="font-semibold text-sm whitespace-nowrap">{company.name}</span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {company.plan}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
