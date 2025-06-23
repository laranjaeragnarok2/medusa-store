import { LandingPage } from '@/components/landing-page';
import { getInitialCount } from '@/app/actions';

export default async function Home() {
  const initialCount = await getInitialCount();
  const initialTagline = 'Sua jornada para o sucesso começa aqui.';

  return (
    <main>
      <LandingPage 
        initialCount={initialCount} 
        initialTagline={initialTagline} 
      />
    </main>
  );
}
