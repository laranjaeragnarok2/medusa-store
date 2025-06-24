import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp-button';
import { Alegreya, Orbitron } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from '@/components/google-analytics';

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
  description: 'Seja o primeiro a saber quando realizarmos o lançamento e fique por dentro de peças exclusivas e cupons de desconto!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`dark ${alegreya.variable} ${orbitron.variable}`}>
      <body>
        <GoogleAnalytics />
        {children}
        <FloatingWhatsAppButton />
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
