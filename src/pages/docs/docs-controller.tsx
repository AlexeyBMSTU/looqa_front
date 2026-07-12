import { BaseRouteController } from '@/router/BaseRouteController';
import { DocsPage } from './DocsPage';

export class DocsController extends BaseRouteController {
  registerRoutes(): void {
    this.addRoute({
      link: '/docs/',
      page: <DocsPage />,
      title: 'Документация',
    });
  }
}
