import { BaseRouteController } from '@/router/BaseRouteController';
import { ProfilePage } from './ProfilePage';

export class ProfileController extends BaseRouteController {
  registerRoutes(): void {
    this.addRoute({
      link: '/profile/',
      page: <ProfilePage />,
      title: 'Профиль',
    });
  }
}
