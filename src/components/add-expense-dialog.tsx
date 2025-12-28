'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { categories, type ExpenseTag } from '@/lib/data';
import { CalendarIcon, Loader2, Plus, ScanLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ReactNode, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { extractReceiptData } from '@/ai/flows/automated-receipt-data-extraction';
import { predictExpenseCategory } from '@/ai/flows/predictive-expense-categorization';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useTranslation } from '@/hooks/use-translation';

const expenseSchema = z.object({
  description: z.string().min(1, { message: 'Description is required.' }),
  amount: z.coerce.number().min(0.01, { message: 'Amount must be positive.' }),
  date: z.date(),
  categoryId: z.string().min(1, { message: 'Category is required.' }),
  paymentMethod: z.enum([
    'Cash',
    'Debit Card',
    'Credit Card',
    'Digital Wallet',
  ]),
  tag: z.enum(['Personal', 'Reimbursable']).optional(),
  tax: z.coerce.number().optional(),
  ruc: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

export function AddExpenseDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const { t } = useTranslation();

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: '',
      amount: 0,
      date: new Date(),
      categoryId: '',
      paymentMethod: 'Credit Card',
      tag: 'Personal',
      tax: 0,
      ruc: '',
    },
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    toast({
      title: t('addExpense.scanningToast.title'),
      description: t('addExpense.scanningToast.description'),
    });

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const receiptDataUri = reader.result as string;

        // Extract data using OCR
        const extractedData = await extractReceiptData({ receiptDataUri });
        
        const description = `${extractedData.businessName}`;
        
        form.setValue('description', description);
        form.setValue('amount', extractedData.total);
        form.setValue('tax', extractedData.tax);
        form.setValue('ruc', extractedData.ruc);
        form.setValue('date', new Date(extractedData.date));

        toast({
          title: t('addExpense.scanSuccessToast.title'),
          description: t('addExpense.scanSuccessToast.description'),
        });
        
        // Predict category based on description
        const { category } = await predictExpenseCategory({ description });
        const matchedCategory = categories.find(c => c.name.toLowerCase() === category.toLowerCase());
        if (matchedCategory) {
            form.setValue('categoryId', matchedCategory.id);
            toast({
                title: t('addExpense.categoryPredictedToast.title'),
                description: t('addExpense.categoryPredictedToast.description', { categoryName: t(`categories.${matchedCategory.name.toLowerCase()}`) }),
              });
        }


      };
    } catch (error) {
      console.error('Error scanning receipt:', error);
      toast({
        variant: 'destructive',
        title: t('addExpense.scanFailedToast.title'),
        description: t('addExpense.scanFailedToast.description'),
      });
    } finally {
      setIsScanning(false);
    }
  };

  const onSubmit = (data: ExpenseFormValues) => {
    console.log('Expense data:', data);
    toast({
      title: t('addExpense.expenseAddedToast.title'),
      description: t('addExpense.expenseAddedToast.description'),
    });
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t('addExpense.title')}</DialogTitle>
          <DialogDescription>
            {t('addExpense.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => document.getElementById('receipt-upload')?.click()}
            disabled={isScanning}
          >
            {isScanning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('addExpense.scanningButton')}...
              </>
            ) : (
              <>
                <ScanLine className="mr-2 h-4 w-4" />
                {t('addExpense.scanReceiptButton')}
              </>
            )}
          </Button>
          <Input
            id="receipt-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div className="relative text-center my-2">
          <span className="px-2 bg-background text-muted-foreground text-sm">
            {t('addExpense.orSeparator')}
          </span>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('addExpense.form.description.label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('addExpense.form.description.placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('addExpense.form.amount.label')}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('addExpense.form.tax.label')}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('addExpense.form.date.label')}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>{t('addExpense.form.date.placeholder')}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('addExpense.form.category.label')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('addExpense.form.category.placeholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {t(`categories.${cat.name.toLowerCase()}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('addExpense.form.paymentMethod.label')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('addExpense.form.paymentMethod.placeholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Credit Card">{t('paymentMethods.creditcard')}</SelectItem>
                        <SelectItem value="Debit Card">{t('paymentMethods.debitcard')}</SelectItem>
                        <SelectItem value="Cash">{t('paymentMethods.cash')}</SelectItem>
                        <SelectItem value="Digital Wallet">{t('paymentMethods.digitalwallet')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                  control={form.control}
                  name="ruc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('addExpense.form.ruc.label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('addExpense.form.ruc.placeholder')} {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{t('addExpense.form.tag.label')}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Personal" />
                          </FormControl>
                          <FormLabel className="font-normal">{t('addExpense.form.tag.personal')}</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Reimbursable" />
                          </FormControl>
                          <FormLabel className="font-normal">{t('addExpense.form.tag.reimbursable')}</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                {t('addExpense.submitButton')}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
