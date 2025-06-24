'use client';

import { useForm as useFormspree } from '@formspree/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, ArrowRight, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const waitlistFormSchema = z.object({
  name: z.string().min(2, { message: 'O nome precisa ter no mínimo 2 caracteres.' }).describe('Nome do Cliente'),
  whatsapp: z.string().min(10, { message: 'Por favor, insira um WhatsApp válido com DDD.' }).describe('WhatsApp do Cliente'),
});

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;

export function WaitlistForm() {
  // O ID do formulário você pega no painel do Formspree.io
  const [state, handleSubmit] = useFormspree('YOUR_FORM_ID_HERE');

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: { name: '', whatsapp: '' },
  });

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-white p-4 rounded-lg bg-green-500/20 border border-green-500/30">
        <PartyPopper className="h-10 w-10 mb-4 text-green-400" />
        <h3 className="text-lg font-bold">Inscrição confirmada!</h3>
        <p className="text-sm text-green-200">
          Parabéns! Agora você está na lista de espera especial da Medusa. Fique de olho no seu WhatsApp para novidades.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
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
                    id="name"
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
                    id="whatsapp"
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
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={state.submitting}>
          {state.submitting ? <Loader2 className="animate-spin" /> : 'Entrar na lista'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
