'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateTaglineAction } from '@/app/actions';

const taglineFormSchema = z.object({
  productName: z.string().min(1, { message: 'Nome do produto é obrigatório.' }),
  productDescription: z.string().min(1, { message: 'Descrição é obrigatória.' }),
});

type TaglineFormValues = z.infer<typeof taglineFormSchema>;

interface TaglineGeneratorProps {
  onGenerated: (newTagline: string) => void;
}

export function TaglineGenerator({ onGenerated }: TaglineGeneratorProps) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<TaglineFormValues>({
    resolver: zodResolver(taglineFormSchema),
    defaultValues: {
      productName: 'EsperaPremiada',
      productDescription: 'Uma plataforma exclusiva para membros que buscam oportunidades e crescimento.',
    },
  });

  const onSubmit = (values: TaglineFormValues) => {
    startTransition(async () => {
      try {
        const result = await generateTaglineAction(values.productName, values.productDescription);
        if (result.tagline) {
          onGenerated(result.tagline);
          toast({
            title: 'Nova tagline gerada!',
            description: 'A tagline na página foi atualizada.',
          });
          setIsOpen(false);
        } else if (result.error) {
          throw new Error(result.error);
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Erro de IA',
          description: error instanceof Error ? error.message : 'Não foi possível gerar a tagline.',
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-accent-foreground">
          <Wand2 className="mr-2 h-4 w-4" /> Gerar Copy com IA
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerador de Taglines</DialogTitle>
          <DialogDescription>
            Use IA para criar taglines criativas para seu produto.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: EsperaPremiada" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do Produto</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descreva seu produto ou serviço" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : 'Gerar Tagline'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
