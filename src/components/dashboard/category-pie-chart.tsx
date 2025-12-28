'use client';

import * as React from 'react';
import { Pie, PieChart, Cell } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useTranslation } from '@/hooks/use-translation';

type CategoryChartData = {
  category: string;
  amount: number;
  fill: string;
};

type CategoryPieChartProps = {
  data: CategoryChartData[];
};

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  const { t } = useTranslation();
  
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    data.forEach(item => {
      config[item.category] = {
        label: item.category,
        color: item.fill,
      };
    });
    return config;
  }, [data]);

  const totalAmount = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.amount, 0);
  }, [data]);

  const topCategory = React.useMemo(() => {
    if (data.length === 0) return null;
    const top = data.reduce((prev, current) => (prev.amount > current.amount) ? prev : current);
    return {
        ...top,
        percentage: ((top.amount / totalAmount) * 100).toFixed(0)
    }
  }, [data, totalAmount]);


  return (
    <div className="rounded-xl bg-card border p-6 flex flex-col h-full">
      <h3 className="font-bold text-lg text-foreground mb-6">{t('dashboard.expenseBreakdown.title')}</h3>
      <div className="relative size-64 mx-auto mb-8 group">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              innerRadius={80}
              outerRadius={100}
              strokeWidth={2}
              stroke="hsl(var(--card))"
              paddingAngle={5}
              cornerRadius={8}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        {topCategory && (
            <div className="absolute inset-4 rounded-full bg-card flex items-center justify-center flex-col z-10">
                <p className="text-muted-foreground text-xs uppercase font-medium tracking-wide">{t('dashboard.expenseBreakdown.topCategory')}</p>
                <p className="text-3xl font-bold text-primary mt-1">{topCategory.percentage}%</p>
                <p className="text-sm font-semibold text-foreground mt-1">{topCategory.category}</p>
            </div>
        )}
      </div>
      <div className="flex flex-col gap-4 mt-auto">
        {data.map(item => (
            <div key={item.category} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                    <div className="size-3 rounded-full" style={{ backgroundColor: item.fill, boxShadow: `0 0 8px 1px ${item.fill}60`}}></div>
                    <span className="text-sm font-medium text-foreground/80">{item.category}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-foreground">${item.amount.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded font-light">{((item.amount / totalAmount) * 100).toFixed(0)}%</span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
