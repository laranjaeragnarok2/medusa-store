'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting creative and engaging taglines.
 *
 * - suggestTagline - A function that generates a tagline using generative AI.
 * - SuggestTaglineInput - The input type for the suggestTagline function.
 * - SuggestTaglineOutput - The return type for the suggestTagline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTaglineInputSchema = z.object({
  productName: z.string().describe('The name of the product or waitlist.'),
  productDescription: z.string().describe('A description of the product or waitlist.'),
});
export type SuggestTaglineInput = z.infer<typeof SuggestTaglineInputSchema>;

const SuggestTaglineOutputSchema = z.object({
  tagline: z.string().describe('A creative and engaging tagline for the product or waitlist.'),
});
export type SuggestTaglineOutput = z.infer<typeof SuggestTaglineOutputSchema>;

export async function suggestTagline(input: SuggestTaglineInput): Promise<SuggestTaglineOutput> {
  return suggestTaglineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaglinePrompt',
  input: {schema: SuggestTaglineInputSchema},
  output: {schema: SuggestTaglineOutputSchema},
  prompt: `You are a creative copywriter specializing in taglines.

  Generate a short, catchy, and engaging tagline for the following product or waitlist:

  Product Name: {{{productName}}}
  Description: {{{productDescription}}}
  `,
});

const suggestTaglineFlow = ai.defineFlow(
  {
    name: 'suggestTaglineFlow',
    inputSchema: SuggestTaglineInputSchema,
    outputSchema: SuggestTaglineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
