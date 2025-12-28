'use server';
/**
 * @fileOverview Projects end-of-month expenses using AI based on past spending habits.
 *
 * - predictEndOfMonthExpenses - A function that handles the expense projection process.
 * - PredictEndOfMonthExpensesInput - The input type for the predictEndOfMonthExpenses function.
 * - PredictEndOfMonthExpensesOutput - The return type for the predictEndOfMonthExpenses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictEndOfMonthExpensesInputSchema = z.object({
  spendingHistory: z
    .string()
    .describe(
      'A detailed record of the users past spending habits, including dates, amounts, categories, and descriptions.'
    ),
  currentMonthExpenses: z
    .string()
    .describe('A summary of the expenses incurred so far in the current month.'),
  monthlyBudget: z.number().describe('The users total monthly budget.'),
});
export type PredictEndOfMonthExpensesInput = z.infer<
  typeof PredictEndOfMonthExpensesInputSchema
>;

const PredictEndOfMonthExpensesOutputSchema = z.object({
  projectedExpenses: z
    .number()
    .describe('The projected total expenses for the end of the month.'),
  remainingBudget: z
    .number()
    .describe('The remaining budget based on the projected expenses.'),
  recommendations: z
    .string()
    .describe(
      'Recommendations for adjusting spending habits to stay within the budget.'
    ),
});
export type PredictEndOfMonthExpensesOutput = z.infer<
  typeof PredictEndOfMonthExpensesOutputSchema
>;

export async function predictEndOfMonthExpenses(
  input: PredictEndOfMonthExpensesInput
): Promise<PredictEndOfMonthExpensesOutput> {
  return predictEndOfMonthExpensesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictEndOfMonthExpensesPrompt',
  input: {schema: PredictEndOfMonthExpensesInputSchema},
  output: {schema: PredictEndOfMonthExpensesOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the users spending history and current month expenses to project their end-of-month expenses.

Spending History: {{{spendingHistory}}}
Current Month Expenses: {{{currentMonthExpenses}}}
Monthly Budget: {{{monthlyBudget}}}

Based on this information, project the users total expenses for the end of the month, how much budget they will have left and provide personalized recommendations for adjusting spending habits to stay within their budget.
Projected Expenses:
Remaining Budget:
Recommendations:`,
});

const predictEndOfMonthExpensesFlow = ai.defineFlow(
  {
    name: 'predictEndOfMonthExpensesFlow',
    inputSchema: PredictEndOfMonthExpensesInputSchema,
    outputSchema: PredictEndOfMonthExpensesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
