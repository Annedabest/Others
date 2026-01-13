import './global.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { NavLink } from '../components/nav-link';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Finance & Receipt Platform',
  description: 'Budgeting and receipt management for churches, couples, and individuals.'
};

const navItems = [
  { href: '/', label: 'Overview', exact: true },
  { href: '/budgets', label: 'Budgets' },
  { href: '/receipts', label: 'Receipts' },
  { href: '/approvals', label: 'Approvals' }
];

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-lg font-semibold tracking-tight">
                Finance & Receipt Platform
              </Link>
              <nav className="flex items-center gap-4 text-sm font-medium">
                {navItems.map((item) => (
                  <NavLink key={item.href} href={item.href} exact={item.exact}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </header>
          <main className="flex-1">
            <div className="mx-auto w-full max-w-6xl px-6 py-10">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
