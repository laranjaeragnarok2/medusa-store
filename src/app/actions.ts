'use server';

import { z } from 'zod';
import { suggestTagline } from '@/ai/flows/suggest-tagline';

// In-memory store for demonstration. In a real app, use a database like Firestore.
let userCount = 137;

export async function getInitialCount() {
    return userCount;
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
    
    await new Promise(res => setTimeout(res, 1000));
    
    userCount++;
    
    return {
        success: true,
        newUserCount: userCount,
        message: 'Obrigado! Você está na lista de espera.'
    };
}


export async function generateTaglineAction(productName: string, productDescription: string) {
    if (!productName || !productDescription) {
        throw new Error("Nome e descrição do produto são obrigatórios.");
    }

    try {
        const result = await suggestTagline({ productName, productDescription });
        return { tagline: result.tagline, error: null };
    } catch (e) {
        console.error("Tagline generation failed:", e);
        return { tagline: null, error: 'Não foi possível gerar a tagline. Tente novamente.' };
    }
}
