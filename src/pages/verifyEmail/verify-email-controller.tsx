import { BaseRouteController } from '@/router/BaseRouteController';
import { VerifyEmailPage } from './VerifyEmailPage';

export class VerifyEmailController extends BaseRouteController {
  registerRoutes(): void {
    this.addRoute({
      link: '/verify-email',
      page: <VerifyEmailPage />,
      title: 'Подтверждение email',
    });
  }
}
