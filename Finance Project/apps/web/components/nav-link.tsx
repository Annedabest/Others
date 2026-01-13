'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  exact?: boolean;
}

export function NavLink({ children, className, exact = false, ...props }: PropsWithChildren<NavLinkProps>) {
  const pathname = usePathname();
  const href = typeof props.href === 'string' ? props.href : props.href.pathname ?? '';
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      {...props}
      className={cn(
        'rounded-md px-3 py-2 text-sm font-medium transition',
        isActive
          ? 'bg-primary-50 text-primary-600 dark:bg-slate-800 dark:text-primary-300'
          : 'text-slate-600 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-primary-300',
        className
      )}
    >
      {children}
    </Link>
  );
}
