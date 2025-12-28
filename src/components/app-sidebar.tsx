'use client';

import Link from 'next/link';
import {
  LayoutDashboard,
  Wallet,
  ArrowRightLeft,
  Settings,
  ShieldCheck,
  Shapes,
  LogOut,
  Bell,
} from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { AppLogo } from './ui/app-logo';


export function AppSidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', labelKey: 'sidebar.dashboard', icon: LayoutDashboard },
    { href: '/expenses', labelKey: 'sidebar.expenses', icon: Wallet },
    { href: '/reports', labelKey: 'sidebar.reports', icon: ArrowRightLeft },
  ];

  const settingsItems = [
    { href: '/budgets', labelKey: 'sidebar.budgets', icon: ShieldCheck },
    { href: '/categories', labelKey: 'sidebar.categories', icon: Shapes },
    { href: '/notifications', labelKey: 'sidebar.notifications', icon: Bell },
    { href: '/profile', labelKey: 'sidebar.profile', icon: Settings },
  ]

  const SidebarLink = ({ href, labelKey, icon: Icon }: { href: string, labelKey: string, icon: React.ElementType}) => {
    const isActive = pathname === href;
    return (
        <Link href={href} className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
            isActive 
                ? "bg-accent text-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
        )}>
            <Icon className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-primary" : ""
            )} />
            <span className="text-sm font-medium">{t(labelKey)}</span>
        </Link>
    );
  }

  return (
    <aside className="flex w-full h-full flex-col border-r border-surface-border bg-card">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-surface-border/50">
            <div className="size-8 text-primary">
                <AppLogo />
            </div>
            <h2 className="text-foreground text-xl font-bold tracking-tight">expenseIQ</h2>
        </div>
        <div className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
            <div className="px-2 py-2">
                <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-2">{t('sidebar.main')}</p>
                {navItems.map(item => (
                    <SidebarLink key={item.href} {...item} />
                ))}
            </div>
            <div className="px-2 py-2">
                <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-2">{t('sidebar.settings')}</p>
                {settingsItems.map(item => (
                    <SidebarLink key={item.href} {...item} />
                ))}
            </div>
        </div>
        <div className="p-4 border-t border-surface-border">
            <Link href="/login" className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <LogOut className="h-5 w-5" />
                <span className="text-sm font-medium">{t('sidebar.logout')}</span>
            </Link>
        </div>
    </aside>
  );
}
