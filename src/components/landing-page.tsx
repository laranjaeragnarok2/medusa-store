'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { VideoBackground } from '@/components/video-background';
import { WaitlistForm } from '@/components/waitlist-form';
import { Button } from './ui/button';

export function LandingPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <div className="h-96 w-full max-w-md animate-pulse rounded-lg bg-card/80"></div>
      </div>
    );
  }

  return (
    <>
      <VideoBackground />
      <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
          <Card className="w-full max-w-md border-border/50 bg-card/20 shadow-2xl shadow-primary/10 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Image
                src="https://iili.io/FT3tjGp.png"
                alt="Medusa Store Logo"
                width={150}
                height={150}
                className="mx-auto mb-4"
                priority
              />
              <CardTitle className="text-3xl font-bold text-foreground">
                Seja bem-vindo à nova loja virtual da Medusa Store!
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Seja o primeiro a saber quando realizarmos o lançamento e fique por dentro de peças exclusivas e cupons de desconto!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WaitlistForm />
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button asChild className="border border-border/50 bg-transparent text-muted-foreground transition-colors hover:border-transparent hover:bg-gradient-to-br hover:from-instagram-1 hover:via-instagram-2 hover:to-instagram-3 hover:text-white">
                <a href="https://www.instagram.com/oficialmedusastore/" target="_blank" rel="noopener noreferrer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                    >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    Siga a gente no Instagram
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
