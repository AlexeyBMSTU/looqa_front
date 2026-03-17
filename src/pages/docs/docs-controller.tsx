import { BaseRouteController } from '@/router/BaseRouteController';
import { DocsPage } from './DocsPage';

export class DocsController extends BaseRouteController {
  registerRoutes(): void {
    this.addRoute({
      LINK: '/docs/',
      PAGE: <DocsPage />,
      TITLE: 'Документация',
    });
  }
}
