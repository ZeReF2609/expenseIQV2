'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/reports/date-range-picker";
import { CategoryPieChart } from "@/components/dashboard/category-pie-chart";
import { categories, expenses } from "@/lib/data";
import { useTranslation } from "@/hooks/use-translation";

export default function ReportsPage() {
  const { t } = useTranslation();

    const categoryTotals = categories.map(cat => ({
        category: t(`categories.${cat.name.toLowerCase()}`),
        amount: expenses
          .filter(exp => exp.category.id === cat.id)
          .reduce((sum, exp) => sum + exp.amount, 0),
        fill: cat.color,
      })).filter(ct => ct.amount > 0);

  return (
    <div className="flex-1 overflow-y-auto bg-background p-4 lg:p-8 pb-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex justify-between items-center mb-2">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">{t('reports.title')}</h1>
                    <p className="text-muted-foreground text-base">{t('reports.overviewDescription')}</p>
                </div>
                <div className="flex items-center gap-4">
                    <DateRangePicker />
                    <Button>{t('reports.generateReport')}</Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                <CardTitle>{t('reports.expenseOverview')}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div className="min-h-[400px]">
                        <CategoryPieChart data={categoryTotals} />
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
