import { BaseRouteController } from '@/router/BaseRouteController';
import { RegPage } from './RegPage';

export class RegController extends BaseRouteController {
  registerRoutes(): void {
    this.addRoute({
      link: '/reg/',
      page: <RegPage />,
      title: 'Регистрация',
    });
  }
}
