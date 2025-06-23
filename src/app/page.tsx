import { LandingPage } from '@/components/landing-page';
import { getInitialCount } from '@/app/actions';

export default async function Home() {
  const initialCount = await getInitialCount();

  return (
    <main>
      <LandingPage 
        initialCount={initialCount} 
      />
    </main>
  );
}
