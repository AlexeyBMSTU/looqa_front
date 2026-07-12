import { BaseRouteController } from '@/router/BaseRouteController';
import { ResetPasswordPage } from './ResetPasswordPage';

export class ResetPasswordController extends BaseRouteController {
  registerRoutes(): void {
    this.addRoute({
      link: '/reset-password/',
      page: <ResetPasswordPage />,
      title: 'Сброс пароля',
    });
  }
}
