import { BaseRouteController } from '@/router/BaseRouteController';
import { RegPage } from './RegPage';

export class RegController extends BaseRouteController {
  registerRoutes(): void {
    this.addRoute({
      LINK: '/reg/',
      PAGE: <RegPage />,
      TITLE: 'Регистрация',
    });
  }
}
