'use server';

import { suggestTagline, SuggestTaglineInput } from '@/ai/flows/suggest-tagline';

export async function generateTaglineAction(productName: string, productDescription: string) {
  try {
    const input: SuggestTaglineInput = { productName, productDescription };
    const result = await suggestTagline(input);
    return { tagline: result.tagline };
  } catch (error) {
    console.error('Error generating tagline:', error);
    return { error: error instanceof Error ? error.message : 'Não foi possível gerar a tagline.' };
  }
}
