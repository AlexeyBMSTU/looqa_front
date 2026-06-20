import { BaseRouteController } from '@/router/BaseRouteController';
import { HomePage } from './HomePage';

export class HomeController extends BaseRouteController {
  registerRoutes(): void {
    this.addRoute({
      link: '/',
      page: <HomePage />,
      title: 'Главная страница',
    });
  }
}
