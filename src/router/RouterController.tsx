import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CONFIG_PAGES } from './config';
import { PageTitle } from '@/components/PageTitle/PageTitle';

export const RouterController: FC = () => {
  return (
    <Routes>
      {CONFIG_PAGES.map(config => (
        <Route
          path={config.link}
          element={
            <>
              <PageTitle title={config.title} />
              {config.page}
            </>
          }
        />
      ))}
    </Routes>
  );
};
