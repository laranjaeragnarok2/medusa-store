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

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.861 9.861 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function WaitlistForm() {
  const [state, formspreeSubmit] = useFormspree('myzjnvzv');

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: { name: '', whatsapp: '' },
  });

  function onSubmit(data: WaitlistFormValues) {
    formspreeSubmit(data);
  }

  if (state.succeeded) {
    const phoneNumber = '5564999297851';
    const message = encodeURIComponent('Olá! Acabei de me inscrever na lista de espera pelo site.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-green-500/30 bg-green-500/20 p-4 text-center text-white">
        <PartyPopper className="h-10 w-10 text-green-400" />
        <div>
          <h3 className="text-lg font-bold">Inscrição confirmada!</h3>
          <p className="mt-1 text-sm text-green-200">
            Parabéns! Para garantir seu acesso VIP, clique abaixo e nos avise no WhatsApp.
          </p>
        </div>
        <Button asChild className="w-full !bg-green-600 font-bold text-white hover:!bg-green-700">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="mr-2 h-4 w-4" />
            Avisar no WhatsApp
          </a>
        </Button>
      </div>
    );
  }

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
