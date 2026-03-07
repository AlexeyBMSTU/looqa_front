import { HomePage } from '@/pages/home/HomePage';

export const CONFIG = {
  HOME: {
    LINK: '/',
    PAGE: <HomePage />,
    TITLE: 'Главная страница',
  },
};

export const CONFIG_PAGES = [
  {
    link: CONFIG.HOME.LINK,
    page: CONFIG.HOME.PAGE,
    title: CONFIG.HOME.TITLE,
  },
];
