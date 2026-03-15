import { FC } from 'react';
import { Hero } from './Hero/Hero';
import { PageComponent } from '@/components/PageComponent/PageComponent';
import { Benefits } from './Benefits/Benefits';
import { ForWho } from './ForWho/ForWho';
import { HowItWorks } from './HowItWorks/HowItWorks';
import { BlurCircles } from '@/components/BlurCircles/BlurCircles';

export const HomePage: FC = () => {
  return (
    <PageComponent>
      <BlurCircles />
      <Hero />
      <Benefits />
      <ForWho />
      <HowItWorks />
    </PageComponent>
  );
};
