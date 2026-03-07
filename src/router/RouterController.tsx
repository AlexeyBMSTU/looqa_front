import { CounterPage } from '@/pages/counter/CounterPage';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CONFIG_PAGES } from './config';

export const RouterController: FC = () => {
  return (
    <Routes>
      <Route path={CONFIG_PAGES.HOME.LINK} element={CONFIG_PAGES.HOME.PAGE} />
      <Route path="/counter" element={<CounterPage />} />
    </Routes>
  );
};
