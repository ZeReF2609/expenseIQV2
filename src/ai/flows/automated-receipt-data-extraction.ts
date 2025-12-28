'use server';

/**
 * @fileOverview This file defines a Genkit flow for automatically extracting data from receipts using AI.
 *
 * The flow takes a receipt image as input and returns the extracted data, such as RUC, business name, date, total, and tax.
 *
 * @interface AutomatedReceiptDataExtractionInput - Defines the input schema for the flow.
 * @interface AutomatedReceiptDataExtractionOutput - Defines the output schema for the flow.
 * @function extractReceiptData - The main function to trigger the data extraction flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedReceiptDataExtractionInputSchema = z.object({
  receiptDataUri: z
    .string()
    .describe(
      "A photo of a receipt, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type AutomatedReceiptDataExtractionInput = z.infer<
  typeof AutomatedReceiptDataExtractionInputSchema
>;

const AutomatedReceiptDataExtractionOutputSchema = z.object({
  ruc: z.string().describe('The RUC (tax ID) of the business.'),
  businessName: z.string().describe('The name of the business.'),
  date: z.string().describe('The date on the receipt (YYYY-MM-DD).'),
  total: z.number().describe('The total amount on the receipt.'),
  tax: z.number().describe('The tax amount on the receipt.'),
});

export type AutomatedReceiptDataExtractionOutput = z.infer<
  typeof AutomatedReceiptDataExtractionOutputSchema
>;

export async function extractReceiptData(
  input: AutomatedReceiptDataExtractionInput
): Promise<AutomatedReceiptDataExtractionOutput> {
  return automatedReceiptDataExtractionFlow(input);
}

const automatedReceiptDataExtractionPrompt = ai.definePrompt({
  name: 'automatedReceiptDataExtractionPrompt',
  input: {schema: AutomatedReceiptDataExtractionInputSchema},
  output: {schema: AutomatedReceiptDataExtractionOutputSchema},
  prompt: `You are an expert AI assistant specializing in extracting data from receipts. Extract the following information from the receipt image: RUC, business name, date, total, and tax.  Return the information as a JSON object.

Receipt Image: {{media url=receiptDataUri}}`,
});

const automatedReceiptDataExtractionFlow = ai.defineFlow(
  {
    name: 'automatedReceiptDataExtractionFlow',
    inputSchema: AutomatedReceiptDataExtractionInputSchema,
    outputSchema: AutomatedReceiptDataExtractionOutputSchema,
  },
  async input => {
    const {output} = await automatedReceiptDataExtractionPrompt(input);
    return output!;
  }
);
