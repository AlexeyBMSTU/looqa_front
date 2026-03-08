import { PageComponent } from '@/components/PageComponent/PageComponent';
import { HomePage } from '@/pages/home/HomePage';
import { LoginPage } from '@/pages/login/LoginPage';
import { RegPage } from '@/pages/reg/RegPage'

export const CONFIG = {
  HOME: {
    LINK: '/',
    PAGE: (
      <PageComponent>
        <HomePage />
      </PageComponent>
    ),
    TITLE: 'Главная страница',
  },
  LOGIN: {
    LINK: '/login/',
    PAGE: (
      <PageComponent>
        <LoginPage />
      </PageComponent>
    ),
    TITLE: 'Авторизация',
  },
  REG: {
    LINK: '/reg/',
    PAGE: (
      <PageComponent>
        <RegPage />
      </PageComponent>
    ),
    TITLE: 'Регистрация',
  },
};

export const CONFIG_PAGES = Object.values(CONFIG);
