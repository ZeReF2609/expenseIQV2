'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { expenses, userProfile } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { FileDown, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { AddExpenseDialog } from '@/components/add-expense-dialog';
import { useTranslation } from '@/hooks/use-translation';

export default function ExpensesPage() {
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
                <h1 className="text-3xl font-bold text-foreground tracking-tight">{t('expenses.title')}</h1>
                <p className="text-muted-foreground text-base">{t('expenses.listDescription')}</p>
            </div>
          <div className="flex gap-2">
            <AddExpenseDialog>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('expenses.addExpense')}
              </Button>
            </AddExpenseDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-foreground">
                  <FileDown className="mr-2 h-4 w-4" />
                  {t('expenses.export')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>CSV</DropdownMenuItem>
                <DropdownMenuItem>PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Card>
          <CardContent className="!p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-accent/50">
                  <TableHead className="text-muted-foreground">{t('expenses.table.category')}</TableHead>
                  <TableHead className="text-muted-foreground">{t('expenses.table.description')}</TableHead>
                  <TableHead className="text-muted-foreground">{t('expenses.table.date')}</TableHead>
                  <TableHead className="text-muted-foreground">{t('expenses.table.paymentMethod')}</TableHead>
                  <TableHead className="text-right text-muted-foreground">{t('expenses.table.amount')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id} className="hover:bg-accent/50">
                    <TableCell>
                      <Badge variant="outline" style={{ borderColor: expense.category.color, color: expense.category.color, backgroundColor: `${expense.category.color}20` }} className="border">
                        {t(`categories.${expense.category.name.toLowerCase()}`)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{expense.description}</TableCell>
                    <TableCell className="text-muted-foreground">{isClient ? new Date(expense.date).toLocaleDateString() : ''}</TableCell>
                    <TableCell className="text-muted-foreground">{t(`paymentMethods.${expense.paymentMethod.replace(/\s+/g, '').toLowerCase()}`)}</TableCell>
                    <TableCell className="text-right font-semibold text-foreground">{isClient ? currencyFormatter.format(expense.amount) : ''}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
