import { FC } from 'react';
import { Hero } from './Hero/Hero';
import { PageComponent } from '@/components/PageComponent/PageComponent';
import { Benefits } from './Benefits/Benefits';
import { ForWho } from './ForWho/ForWho';
import { HowItWorks } from './HowItWorks/HowItWorks';
import { Footer } from './Footer/Footer';

export const HomePage: FC = () => {
  return (
    <PageComponent>
      <Hero />
      <Benefits />
      <ForWho />
      <HowItWorks />
      <Footer />
    </PageComponent>
  );
};
