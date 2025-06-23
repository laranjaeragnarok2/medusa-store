'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { VideoBackground } from '@/components/video-background';
import { WaitlistForm } from '@/components/waitlist-form';
import { TaglineGenerator } from '@/components/tagline-generator';

interface LandingPageProps {
  initialCount: number;
}

export function LandingPage({ initialCount }: LandingPageProps) {
  const [userCount, setUserCount] = useState(initialCount);
  const [isMounted, setIsMounted] = useState(false);
  const [tagline, setTagline] = useState("Receba ofertas especiais como até 50% de desconto");

  useEffect(() => {
    setIsMounted(true);
    setUserCount(initialCount);
  }, [initialCount]);

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
              <CardTitle className="font-headline text-3xl font-bold uppercase tracking-wider text-foreground">
                Entre na nossa lista exclusiva
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {tagline}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WaitlistForm onSuccess={(newUserCount) => setUserCount(newUserCount)} />
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                <span>Junte-se a <span className="font-bold text-accent-foreground">{userCount}</span> pessoas na espera!</span>
              </div>
              <TaglineGenerator onGenerated={setTagline} />
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
