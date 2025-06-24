import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp-button';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Alegreya, Orbitron } from 'next/font/google';

const alegreya = Alegreya({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-alegreya',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-orbitron',
});


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
    <html lang="pt-BR" className={`dark ${alegreya.variable} ${orbitron.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <FloatingWhatsAppButton />
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
