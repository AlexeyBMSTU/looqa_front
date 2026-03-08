import { FC, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { mainController } from './MainController';
import { PageTitle } from '@/components/PageTitle/PageTitle';

const NotFoundPage: FC = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h1>404 - Страница не найдена</h1>
    <p>Извините, но запрашиваемая страница не существует.</p>
  </div>
);

export const RouterController: FC = () => {
  const [routes, setRoutes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const routesData = await mainController.getRoutesAsync();
        setRoutes(routesData);
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
      {routes.map(({ LINK, PAGE, TITLE }: any, index: number) => (
        <Route
          key={index}
          path={LINK}
          element={
            <>
              <PageTitle title={TITLE} />
              {PAGE}
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
