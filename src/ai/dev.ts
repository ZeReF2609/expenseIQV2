import { config } from 'dotenv';
config();

import '@/ai/flows/automated-receipt-data-extraction.ts';
import '@/ai/flows/end-of-month-expense-projection.ts';
import '@/ai/flows/predictive-expense-categorization.ts';