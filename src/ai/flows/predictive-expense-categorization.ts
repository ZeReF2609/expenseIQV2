'use server';
/**
 * @fileOverview This file defines a Genkit flow for predictive expense categorization.
 *
 * - predictExpenseCategory -  A function that takes an expense description as input and returns a predicted expense category.
 * - PredictExpenseCategoryInput - The input type for the predictExpenseCategory function.
 * - PredictExpenseCategoryOutput - The output type for the predictExpenseCategory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictExpenseCategoryInputSchema = z.object({
  description: z
    .string()
    .describe('The description of the expense to be categorized.'),
});
export type PredictExpenseCategoryInput = z.infer<
  typeof PredictExpenseCategoryInputSchema
>;

const PredictExpenseCategoryOutputSchema = z.object({
  category: z.string().describe('The predicted category for the expense.'),
});
export type PredictExpenseCategoryOutput = z.infer<
  typeof PredictExpenseCategoryOutputSchema
>;

export async function predictExpenseCategory(
  input: PredictExpenseCategoryInput
): Promise<PredictExpenseCategoryOutput> {
  return predictExpenseCategoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictExpenseCategoryPrompt',
  input: {schema: PredictExpenseCategoryInputSchema},
  output: {schema: PredictExpenseCategoryOutputSchema},
  prompt: `You are an AI assistant that categorizes expenses based on their description.

  Given the following expense description, predict the most appropriate expense category.

  Description: {{{description}}}
  `,
});

const predictExpenseCategoryFlow = ai.defineFlow(
  {
    name: 'predictExpenseCategoryFlow',
    inputSchema: PredictExpenseCategoryInputSchema,
    outputSchema: PredictExpenseCategoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
