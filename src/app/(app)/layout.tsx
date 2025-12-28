'use client';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import { usePathname } from 'next/navigation';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login' || pathname === '/register' || pathname === '/forgot-password';

  if (isLoginPage) {
    return <>{children}</>;
  }
  return (
      <div className="flex h-screen w-full flex-row overflow-hidden bg-background font-sans">
        <div className="hidden lg:flex w-72">
            <AppSidebar />
        </div>
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          <AppHeader />
          {children}
        </main>
      </div>
  );
}
