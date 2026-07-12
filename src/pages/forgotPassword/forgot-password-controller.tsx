import { BaseRouteController } from '@/router/BaseRouteController';
import { ForgotPasswordPage } from './ForgotPasswordPage';

export class ForgotPasswordController extends BaseRouteController {
  registerRoutes(): void {
    this.addRoute({
      link: '/forgot-password/',
      page: <ForgotPasswordPage />,
      title: 'Сброс пароля',
    });
  }
}
