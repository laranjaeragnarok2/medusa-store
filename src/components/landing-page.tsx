'use client';

import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { VideoBackground } from '@/components/video-background';
import { WaitlistForm } from '@/components/waitlist-form';
import { TaglineGenerator } from '@/components/tagline-generator';

interface LandingPageProps {
  initialCount: number;
  initialTagline: string;
}

export function LandingPage({ initialCount, initialTagline }: LandingPageProps) {
  const [userCount, setUserCount] = useState(initialCount);
  const [tagline, setTagline] = useState(initialTagline);
  const [isMounted, setIsMounted] = useState(false);

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
          <Card className="w-full max-w-md border-border/50 bg-card/80 shadow-2xl shadow-primary/10 backdrop-blur-lg">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-4xl tracking-tighter sm:text-5xl">EsperaPremiada</CardTitle>
              <CardDescription className="pt-2 text-base text-muted-foreground">{tagline}</CardDescription>
            </CardHeader>
            <CardContent>
              <WaitlistForm onSuccess={(newUserCount) => setUserCount(newUserCount)} />
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                <span>Junte-se a <span className="font-bold text-accent-foreground">{userCount}</span> pessoas na espera!</span>
              </div>
              <TaglineGenerator onGenerated={(newTagline) => setTagline(newTagline)} />
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
