import { RouteConfig } from './BaseRouteController';
import { FC, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mainController } from './MainController';
import { PageTitle } from '@/shared/components/PageTitle/PageTitle';
import { NotFoundPage } from '@/pages/notFound/NotFoundPage';

export const RouterController: FC = () => {
  const [routes, setRoutes] = useState<RouteConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const routesData = await mainController.getRoutesAsync();
        setRoutes(routesData);
      } catch (error) {
        console.error('Failed to load routes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRoutes();
  }, []);

  if (isLoading) {
    return <div>Загрузка приложения...</div>;
  }

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={`${route.link}-${index}`}
          path={route.link}
          element={
            <>
              <PageTitle title={route.title} />
              {route.page}
            </>
          }
        />
      ))}
      <Route
        path="*"
        element={
          <>
            <PageTitle title="Страница не найдена" />
            <NotFoundPage />
          </>
        }
      />
    </Routes>
  );
};
