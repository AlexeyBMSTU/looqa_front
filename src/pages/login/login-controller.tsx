import { BaseRouteController } from '@/router/BaseRouteController';
import { LoginPage } from './LoginPage';

export class LoginController extends BaseRouteController {
  registerRoutes(): void {
    this.addRoute({
      link: '/login/',
      page: <LoginPage />,
      title: 'Авторизация',
    });
  }
}
