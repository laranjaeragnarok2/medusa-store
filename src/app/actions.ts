'use server';

import { z } from 'zod';
import { suggestTagline } from '@/ai/flows/suggest-tagline';
import { appendToSheet, getSheetRowCount } from '@/services/google-sheets';

export async function getInitialCount() {
    try {
        return await getSheetRowCount();
    } catch (error) {
        console.error("Failed to get initial count from Sheet:", error);
        return 0;
    }
}

const waitlistSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres."}),
  whatsapp: z.string().min(10, { message: "Por favor, insira um número de WhatsApp válido." }),
});

export async function addToWaitlistAction(data: z.infer<typeof waitlistSchema>) {
    const validation = waitlistSchema.safeParse(data);
    if (!validation.success) {
        throw new Error("Dados inválidos.");
    }
    
    try {
        await appendToSheet(validation.data);
        const newUserCount = await getSheetRowCount();
        
        return {
            success: true,
            newUserCount,
            message: 'Obrigado! Você está na lista de espera.'
        };
    } catch (error) {
        console.error("Failed to add to waitlist:", error);
        throw new Error(error instanceof Error ? error.message : "Ocorreu um erro ao se cadastrar.");
    }
}

export async function generateTaglineAction(productName: string, productDescription: string) {
    try {
      const result = await suggestTagline({ productName, productDescription });
      return { tagline: result.tagline };
    } catch (e) {
      console.error(e);
      return { error: 'Não foi possível gerar a tagline.' };
    }
  }
