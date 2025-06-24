import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp-button';

export const metadata: Metadata = {
  title: 'Medusa Store',
  description: 'Entre na nossa lista de espera exclusiva.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
        <FloatingWhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
