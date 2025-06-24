'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, ArrowRight } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase-client';
import { collection, addDoc } from 'firebase/firestore';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const waitlistFormSchema = z.object({
  name: z.string().min(2, { message: 'O nome precisa ter no mínimo 2 caracteres.' }),
  whatsapp: z.string().min(10, { message: 'Por favor, insira um WhatsApp válido com DDD.' }),
});

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;

// Reutilizando o ícone do WhatsApp do botão flutuante para consistência
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="currentColor"
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.357 1.846 6.167l-1.29 4.723 4.833-1.276z" />
    <path d="M9.043 7.824c.142-.357.465-.572.825-.614.36-.042.719-.05.958.047.239.096.335.244.431.42.096.177.344.823.392 1.015.048.192.072.417.023.61l-.226.924c-.12.48-.288.75-.48.906-.192.156-.426.24-.618.24-.192 0-.426-.084-.643-.24s-1.42-1.2-2.736-2.384c-1.12-1.008-1.848-2.106-2.028-2.43.096-.144.24-.264.384-.384.144-.12.288-.216.48-.288.192-.072.336-.048.456.048.12.096.24.432.312.6.072.168.048.288.024.384l-.12.48c-.048.144-.096.216-.168.288-.072.072-.168.096-.216.096-.048 0-.12-.024-.168-.048s-.24-.072-.312-.096c-.072-.024-.168-.048-.24-.048-.072 0-.144.024-.216.048-.24.096-.528.24-.768.48s-.432.528-.552.852c-.12.324-.096.672.048.96.144.288.504.96.96 1.512.456.552 1.056 1.152 1.776 1.608.72.456 1.392.768 2.16.96.24.072.48.096.672.12.192.024.432.024.624-.048.192-.072.672-.312.912-.912.24-.6.24-1.128.168-1.248-.072-.12-.168-.192-.312-.264s-.312-.144-.432-.192c-.12-.048-.24-.024-.312.024s-.144.12-.192.192c-.048.072-.072.144-.12.216-.048.072-.096.12-.12.144s-.048.048-.072.024c-.024-.024-.144-.096-.288-.168-.144-.072-.288-.144-.432-.24-.144-.096-.288-.216-.408-.336-.12-.12-.216-.24-.288-.36s-.12-.24-.144-.336c-.024-.096-.024-.144.024-.216.048-.072.096-.12.168-.192.072-.072.12-.144.168-.192.048-.048.072-.12.072-.168.024-.048 0-.12-.024-.168z" />
  </svg>
);

export function WaitlistForm() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: { name: '', whatsapp: '' },
  });

  const onSubmit = async (values: WaitlistFormValues) => {
    setIsPending(true);

    const writePromise = addDoc(collection(db, 'waitlist'), {
      ...values,
      timestamp: new Date(),
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 8000)
    );

    try {
      await Promise.race([writePromise, timeoutPromise]);
      setShowSuccessDialog(true);
      form.reset();
    } catch (error: any) {
      console.error('Erro detalhado ao se cadastrar:', error);

      let description = 'Não foi possível enviar seus dados. Verifique sua conexão e tente novamente.';
      if (error.message === 'Timeout') {
        description = 'A operação demorou demais. Isso geralmente indica um problema com as chaves "NEXT_PUBLIC_" na Vercel ou com a sua conexão.';
      } else if (error.code === 'permission-denied' || error.code === 'unauthenticated') {
        description = 'Permissão negada. Verifique se as Regras de Segurança do seu Firestore estão corretas para permitir a escrita pública na coleção "waitlist".';
      } else if (error.code) {
        description = `Ocorreu um erro no Firebase (${error.code}). Por favor, verifique o console do navegador para mais detalhes e a configuração do seu projeto.`;
      }

      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: description,
        duration: 9000,
      });
    } finally {
      setIsPending(false);
    }
  };

  const phoneNumber = '5564999297851';
  const message = encodeURIComponent('Oi, vim do site e acabei de me inscrever na lista de espera!');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
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

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Inscrição confirmada!</AlertDialogTitle>
            <AlertDialogDescription>
              Parabéns! Agora você está na lista de espera especial da Medusa. Clique no botão para nos contatar mais rapidamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Fechar</AlertDialogCancel>
            <AlertDialogAction asChild className="bg-[#25D366] text-white hover:bg-[#25D366]/90">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="mr-2 h-5 w-5" />
                Ir para o WhatsApp
              </a>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
