import { BaseRouteController } from '@/router/BaseRouteController';
import { FeedPage } from './FeedPage';

export class FeedController extends BaseRouteController {
  registerRoutes(): void {
    this.addRoute({
      link: '/feed/',
      page: <FeedPage />,
      title: 'Лента проектов',
    });
  }
}
