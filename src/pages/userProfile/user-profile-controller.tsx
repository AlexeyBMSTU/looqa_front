import { BaseRouteController } from '@/router/BaseRouteController';
import { UserProfilePage } from './UserProfilePage';

export class UserProfileController extends BaseRouteController {
  registerRoutes(): void {
    this.addRoute({
      link: '/users/:username',
      page: <UserProfilePage />,
      title: 'Профиль пользователя',
    });
  }
}
