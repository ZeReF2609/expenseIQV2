import type { LucideIcon } from "lucide-react";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  defaultCurrency: string;
  monthlyBudget: number;
};

export type Category = {
  id: string;
  name: string;
  color: string;
  icon?: keyof typeof import('lucide-react');
};

export type PaymentMethod = 'Cash' | 'Debit Card' | 'Credit Card' | 'Digital Wallet';

export type ExpenseTag = 'Personal' | 'Reimbursable';

export type Expense = {
  id:string;
  date: string;
  amount: number;
  tax: number;
  category: Category;
  categoryId: string;
  paymentMethod: PaymentMethod;
  description: string;
  tag?: ExpenseTag;
  receiptUrl?: string;
  ruc?: string;
};

export type Budget = {
    id: string;
    categoryId: string | null;
    amount: number;
    spent: number;
}

export type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
};