'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase-client';
import { collection, addDoc } from 'firebase/firestore';

const waitlistFormSchema = z.object({
  name: z.string().min(2, { message: 'O nome precisa ter no mínimo 2 caracteres.' }),
  whatsapp: z.string().min(10, { message: 'Por favor, insira um WhatsApp válido com DDD.' }),
});

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;

export function WaitlistForm() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: { name: '', whatsapp: '' },
  });

  const onSubmit = async (values: WaitlistFormValues) => {
    setIsPending(true);
    
    // Cria a operação de escrita no Firestore.
    const writePromise = addDoc(collection(db, "waitlist"), {
      ...values,
      timestamp: new Date(),
    });

    // Cria uma promise de timeout que rejeitará após 8 segundos.
    // Isso evita o "spinner infinito" se o Firebase não responder devido a problemas de rede ou configuração.
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Timeout")), 8000)
    );

    try {
      // Executa a operação de escrita e o timeout em paralelo. O que acontecer primeiro, ganha.
      await Promise.race([writePromise, timeoutPromise]);
      
      toast({
        title: 'Sucesso!',
        description: 'Obrigado! Você está na lista de espera.',
      });
      form.reset();

    } catch (error: any) {
      console.error("Erro ao se cadastrar:", error);

      // Prepara uma mensagem de erro mais específica para o usuário.
      let description = 'Não foi possível enviar seus dados. Tente novamente mais tarde.';
      if (error.message === 'Timeout') {
        description = 'A operação demorou muito. Verifique sua conexão e a configuração das chaves do Firebase na Vercel.';
      } else if (error.code === 'permission-denied') {
        description = 'Permissão negada. Verifique as regras de segurança do seu Firestore.';
      }
      
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: description,
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <div className="rounded-lg bg-input p-[1.5px] transition-all duration-300 focus-within:bg-gradient-to-r focus-within:from-primary focus-within:to-accent focus-within:animate-gradient-anim [background-size:200%_200%]">
                  <Input 
                    placeholder="Seu nome completo" 
                    {...field} 
                    className="border-none bg-input/80 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp</FormLabel>
              <FormControl>
                 <div className="rounded-lg bg-input p-[1.5px] transition-all duration-300 focus-within:bg-gradient-to-r focus-within:from-primary focus-within:to-accent focus-within:animate-gradient-anim [background-size:200%_200%]">
                    <Input 
                      type="tel" 
                      placeholder="(XX) XXXXX-XXXX" 
                      {...field} 
                      className="border-none bg-input/80 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                 </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : 'Entrar na lista'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
