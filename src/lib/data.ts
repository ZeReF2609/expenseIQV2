import type { UserProfile, Category, Expense, Budget, PaymentMethod, ExpenseTag, Notification } from './types';

export const userProfile: UserProfile = {
  id: 'user-1',
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: 'https://picsum.photos/seed/1/100/100',
  defaultCurrency: 'USD',
  monthlyBudget: 2500,
};

export const categories: Category[] = [
  { id: 'cat-1', name: 'Food', color: 'hsl(var(--chart-1))', icon: 'Utensils' },
  { id: 'cat-2', name: 'Transport', color: 'hsl(var(--chart-2))', icon: 'Car' },
  { id: 'cat-3', name: 'Utilities', color: 'hsl(var(--chart-3))', icon: 'Lightbulb' },
  { id: 'cat-4', name: 'Entertainment', color: 'hsl(var(--chart-4))', icon: 'Ticket' },
  { id: 'cat-5', name: 'Health', color: 'hsl(var(--chart-5))', icon: 'HeartPulse' },
  { id: 'cat-6', name: 'Other', color: 'hsl(var(--muted-foreground))', icon: 'ShoppingBag' },
];

const today = new Date();
const expensesData: Omit<Expense, 'id' | 'category'>[] = [
  { date: new Date(today.getFullYear(), today.getMonth(), 2).toISOString(), amount: 12.50, tax: 2.25, paymentMethod: 'Credit Card', description: 'Lunch at Cafe', categoryId: 'cat-1', tag: 'Personal' },
  { date: new Date(today.getFullYear(), today.getMonth(), 3).toISOString(), amount: 30.00, tax: 5.40, paymentMethod: 'Debit Card', description: 'Train ticket', categoryId: 'cat-2', tag: 'Reimbursable' },
  { date: new Date(today.getFullYear(), today.getMonth(), 5).toISOString(), amount: 25.00, tax: 4.50, paymentMethod: 'Credit Card', description: 'Movie tickets', categoryId: 'cat-4', tag: 'Personal' },
  { date: new Date(today.getFullYear(), today.getMonth(), 7).toISOString(), amount: 75.20, tax: 13.54, paymentMethod: 'Credit Card', description: 'Groceries for the week', categoryId: 'cat-1', tag: 'Personal' },
  { date: new Date(today.getFullYear(), today.getMonth(), 8).toISOString(), amount: 55.00, tax: 9.90, paymentMethod: 'Digital Wallet', description: 'Electricity bill', categoryId: 'cat-3', tag: 'Personal' },
  { date: new Date(today.getFullYear(), today.getMonth(), 10).toISOString(), amount: 22.00, tax: 3.96, paymentMethod: 'Cash', description: 'Morning coffee & pastry', categoryId: 'cat-1', tag: 'Personal' },
  { date: new Date(today.getFullYear(), today.getMonth(), 11).toISOString(), amount: 15.00, tax: 2.70, paymentMethod: 'Debit Card', description: 'Bus fare', categoryId: 'cat-2', tag: 'Personal' },
  { date: new Date(today.getFullYear(), today.getMonth(), 12).toISOString(), amount: 45.00, tax: 8.10, paymentMethod: 'Credit Card', description: 'Dinner with friends', categoryId: 'cat-1', tag: 'Personal' },
  { date: new Date(today.getFullYear(), today.getMonth() - 1, 15).toISOString(), amount: 120.00, tax: 21.60, paymentMethod: 'Credit Card', description: 'Concert ticket', categoryId: 'cat-4', tag: 'Personal' },
  { date: new Date(today.getFullYear(), today.getMonth() - 1, 18).toISOString(), amount: 50.00, tax: 9.00, paymentMethod: 'Digital Wallet', description: 'Internet bill', categoryId: 'cat-3', tag: 'Personal' },
  { date: new Date(today.getFullYear(), today.getMonth() - 2, 20).toISOString(), amount: 35.75, tax: 6.44, paymentMethod: 'Debit Card', description: 'Pharmacy', categoryId: 'cat-5', tag: 'Personal' },
  { date: new Date(today.getFullYear(), today.getMonth() - 2, 25).toISOString(), amount: 8.99, tax: 1.62, paymentMethod: 'Cash', description: 'New book', categoryId: 'cat-6', tag: 'Personal' },
];

export const expenses: Expense[] = expensesData.map((exp, index) => ({
  id: `exp-${index + 1}`,
  ...exp,
  category: categories.find(c => c.id === (exp as any).categoryId)!,
}));

export const budgets: Budget[] = [
    { id: 'bud-1', categoryId: 'cat-1', amount: 500, spent: expenses.filter(e=>e.category.id === 'cat-1').reduce((acc, e) => acc + e.amount, 0) },
    { id: 'bud-2', categoryId: 'cat-2', amount: 200, spent: expenses.filter(e=>e.category.id === 'cat-2').reduce((acc, e) => acc + e.amount, 0) },
    { id: 'bud-3', categoryId: 'cat-4', amount: 150, spent: expenses.filter(e=>e.category.id === 'cat-4').reduce((acc, e) => acc + e.amount, 0) },
    { id: 'bud-4', categoryId: null, amount: userProfile.monthlyBudget, spent: expenses.reduce((acc, e) => acc + e.amount, 0) },
]

export const notifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'Budget Alert',
    description: 'You have exceeded your monthly budget for "Food" by $50.',
    date: new Date(new Date().setDate(today.getDate() - 1)).toISOString(),
    read: false,
  },
  {
    id: 'notif-2',
    title: 'New Expense Added',
    description: 'A new expense of $12.50 was added to "Food".',
    date: new Date(new Date().setDate(today.getDate() - 2)).toISOString(),
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Report Ready',
    description: 'Your monthly report for May 2024 is ready to be reviewed.',
    date: new Date(new Date().setDate(today.getDate() - 5)).toISOString(),
    read: true,
  },
  {
    id: 'notif-4',
    title: 'New Login',
    description: 'A new login to your account was detected from a new device.',
    date: new Date(new Date().setDate(today.getDate() - 7)).toISOString(),
    read: true,
  },
];


export { type PaymentMethod, type ExpenseTag };