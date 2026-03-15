import { BaseRouteController } from '@/router/BaseRouteController';
import { HomePage } from './HomePage';

export class HomeController extends BaseRouteController {
  registerRoutes(): void {
    this.addRoute({
      LINK: '/',
      PAGE: <HomePage />,
      TITLE: 'Главная страница',
    });
  }
}
