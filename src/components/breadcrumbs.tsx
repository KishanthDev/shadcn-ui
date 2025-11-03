'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import { IconSlash } from '@tabler/icons-react';
import { Fragment } from 'react';

export function Breadcrumbs() {
  const items = useBreadcrumbs();
  if (items.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isDashboard = item.title.toLowerCase() === 'dashboard';
          const link = item.link;

          return (
            <Fragment key={item.title}>
              {index !== items.length - 1 && (
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={link}>{item.title}</BreadcrumbLink>
                </BreadcrumbItem>
              )}
              {index < items.length - 1 && (
                <BreadcrumbSeparator className="hidden md:block">
                  <IconSlash />
                </BreadcrumbSeparator>
              )}
              {index === items.length - 1 && (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
