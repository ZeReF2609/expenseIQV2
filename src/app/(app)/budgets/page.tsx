'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { budgets, categories, userProfile } from '@/lib/data';
import { useTranslation } from '@/hooks/use-translation';
import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BudgetsPage() {
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
    <div className="flex-1 overflow-y-auto bg-background p-4 lg:p-8 pb-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">{t('budgets.title')}</h1>
                <p className="text-muted-foreground text-base">{t('budgets.description')}</p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('budgets.addBudget')}
            </Button>
        </div>
      
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {budgets.map(budget => {
            const category = budget.categoryId ? categories.find(c => c.id === budget.categoryId) : null;
            const budgetName = category ? t(`categories.${category.name.toLowerCase()}`) : t('budgets.overall');
            const progress = (budget.spent / budget.amount) * 100;
            return (
              <Card key={budget.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center text-lg">
                      <span>{budgetName}</span>
                      <span className={`font-semibold ${progress > 100 ? 'text-destructive' : 'text-foreground'}`}>
                          {isClient ? currencyFormatter.format(budget.amount) : '...'}
                      </span>
                  </CardTitle>
                  <CardDescription className="!mt-2">
                    {t('budgets.spent')} {isClient ? currencyFormatter.format(budget.spent) : '...'} {t('budgets.of')} {isClient ? currencyFormatter.format(budget.amount) : '...'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={progress} />
                  <div className="text-xs text-muted-foreground mt-2">{progress.toFixed(0)}% {t('budgets.used')}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
