import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CONFIG_PAGES } from './config';

export const RouterController: FC = () => {
  return (
    <Routes>
      {CONFIG_PAGES.map(config => (
        <Route path={config.link} element={config.page} />
      ))}
    </Routes>
  );
};
