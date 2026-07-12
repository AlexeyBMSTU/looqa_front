import { FC } from 'react';
import { Hero } from './Hero/Hero';
import { Benefits } from './Benefits/Benefits';
import { ForWho } from './ForWho/ForWho';
import { HowItWorks } from './HowItWorks/HowItWorks';
import { BlurCircles } from '@/shared/components/BlurCircles/BlurCircles';
import { PageComponent } from '@/shared/components/PageComponent/PageComponent';

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
