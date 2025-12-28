'use client';
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import type { Expense } from '@/lib/types';
  import { userProfile } from '@/lib/data';
  import { useEffect, useState } from 'react';
  import { useTranslation } from '@/hooks/use-translation';
  import * as Lucide from 'lucide-react';
  import { Button } from '../ui/button';
import Link from 'next/link';
  
  type RecentExpensesListProps = {
    expenses: Expense[];
  };
  
  export function RecentExpensesList({ expenses }: RecentExpensesListProps) {
    const [isClient, setIsClient] = useState(false);
    const { t } = useTranslation();
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    const currencyFormatter = new Intl.NumberFormat(isClient ? navigator.language : 'en-US', {
      style: 'currency',
      currency: userProfile.defaultCurrency,
    });
  
    return (
      <div className="rounded-xl bg-card border overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
            <h3 className="font-bold text-lg text-foreground">{t('dashboard.recentTransactions')}</h3>
            <Link href="/expenses" passHref>
                <Button variant="link" className="text-xs font-semibold text-primary hover:text-primary/80 uppercase tracking-wider p-0 h-auto">{t('dashboard.viewAll')}</Button>
            </Link>
        </div>
        <div className="divide-y divide-border">
          {expenses.map((expense) => {
            const Icon = expense.category.icon ? Lucide[expense.category.icon] as Lucide.LucideIcon : Lucide.Landmark;
            return (
                <div key={expense.id} className="px-6 py-4 flex items-center justify-between hover:bg-accent transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-surface flex items-center justify-center text-muted-foreground">
                            <Icon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-foreground">{expense.description}</p>
                            <p className="text-xs text-muted-foreground font-light">
                                {isClient ? new Date(expense.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'}) : '...'}
                            </p>
                        </div>
                    </div>
                    <span className="font-bold text-foreground">
                        -{isClient ? currencyFormatter.format(expense.amount) : '...'}
                    </span>
                </div>
            )
          })}
        </div>
      </div>
    );
  }
  