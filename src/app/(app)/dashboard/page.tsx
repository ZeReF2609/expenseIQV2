'use client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { categories, expenses, userProfile } from '@/lib/data';
import { useTranslation } from '@/hooks/use-translation';
import {
  ScanLine,
  Plus,
  FileText,
  Utensils,
  TrendingUp,
  Info,
} from 'lucide-react';
import { AddExpenseDialog } from '@/components/add-expense-dialog';
import { CategoryPieChart } from '@/components/dashboard/category-pie-chart';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RecentExpensesList } from '@/components/dashboard/recent-expenses-list';

export default function DashboardPage() {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budgetProgress = (totalExpenses / userProfile.monthlyBudget) * 100;
  const remainingBudget = userProfile.monthlyBudget - totalExpenses;

  const currencyFormatter = new Intl.NumberFormat(
    isClient ? navigator.language : 'en-US',
    {
      style: 'currency',
      currency: userProfile.defaultCurrency,
    }
  );

  const categoryTotals = categories
    .map((cat) => ({
      category: t(`categories.${cat.name.toLowerCase()}`),
      amount: expenses
        .filter((exp) => exp.category.id === cat.id)
        .reduce((sum, exp) => sum + exp.amount, 0),
      fill: cat.color,
    }))
    .filter((ct) => ct.amount > 0);

  return (
    <div className="flex-1 overflow-y-auto bg-background p-4 lg:p-8 pb-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col gap-1 mb-2">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">{t('dashboard.title')}</h1>
                <p className="text-muted-foreground text-base">{t('dashboard.description')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Total Expense Card */}
                <div className="relative overflow-hidden rounded-xl bg-card border p-6 @container">
                    <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 pointer-events-none">
                    <Utensils className="h-24 w-24 text-foreground" />
                    </div>
                    <div className="flex flex-col gap-6 relative z-10">
                    <div className="flex justify-between items-start">
                        <div>
                        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-1">
                            {t('dashboard.totalExpenseMonth')}
                        </p>
                        <h2 className="text-5xl font-extrabold tracking-tight text-foreground">
                            {isClient ? currencyFormatter.format(totalExpenses) : '...'}
                        </h2>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center gap-1">
                        <TrendingUp className="h-4 w-4"/>
                        +12%
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end text-sm">
                        <span className="font-medium text-foreground/80">
                            {t('dashboard.budgetProgress')}
                        </span>
                        <span className="font-bold text-primary">{budgetProgress.toFixed(0)}%</span>
                        </div>
                        <Progress value={budgetProgress} />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1 font-light">
                        <span>
                            {t('dashboard.spent')}: {isClient ? currencyFormatter.format(totalExpenses) : '...'}
                        </span>
                        <span>
                            {t('dashboard.limit')}: {isClient ? currencyFormatter.format(userProfile.monthlyBudget) : '...'}
                        </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <Info className="text-primary h-4 w-4" />
                        <p className="text-sm text-muted-foreground font-light">
                        {t('dashboard.remainingBudgetMsg', { remainingBudget: isClient ? currencyFormatter.format(remainingBudget) : '...' })}
                        </p>
                    </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <AddExpenseDialog>
                        <Button variant="outline" className="group flex items-center justify-center gap-3 p-4 h-auto rounded-xl bg-card border hover:border-primary/50 transition-all shadow-sm hover:shadow-md hover:shadow-primary/5">
                            <div className="size-10 rounded-lg bg-primary/10 group-hover:bg-primary text-primary group-hover:text-primary-foreground flex items-center justify-center transition-colors">
                                <ScanLine/>
                            </div>
                            <span className="font-bold text-sm text-foreground">{t('dashboard.scanButton')}</span>
                        </Button>
                    </AddExpenseDialog>
                    <AddExpenseDialog>
                        <Button variant="outline" className="group flex items-center justify-center gap-3 p-4 h-auto rounded-xl bg-card border hover:border-primary/50 transition-all shadow-sm hover:shadow-md hover:shadow-primary/5">
                            <div className="size-10 rounded-lg bg-primary/10 group-hover:bg-primary text-primary group-hover:text-primary-foreground flex items-center justify-center transition-colors">
                                <Plus/>
                            </div>
                            <span className="font-bold text-sm text-foreground">{t('dashboard.manualButton')}</span>
                        </Button>
                    </AddExpenseDialog>
                    <Link href="/reports" passHref>
                        <Button variant="outline" className="w-full group flex items-center justify-center gap-3 p-4 h-auto rounded-xl bg-card border hover:border-primary/50 transition-all shadow-sm hover:shadow-md hover:shadow-primary/5">
                            <div className="size-10 rounded-lg bg-primary/10 group-hover:bg-primary text-primary group-hover:text-primary-foreground flex items-center justify-center transition-colors">
                                <FileText/>
                            </div>
                            <span className="font-bold text-sm text-foreground">{t('dashboard.reportButton')}</span>
                        </Button>
                    </Link>
                </div>

                    <RecentExpensesList expenses={expenses.slice(0, 3)} />

                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                <CategoryPieChart data={categoryTotals} />
                </div>
            </div>
        </div>
    </div>
  );
}
