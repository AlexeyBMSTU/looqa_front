import { BaseRouteController } from '@/router/BaseRouteController';
import { PageComponent } from '@/components/PageComponent/PageComponent';
import { HomePage } from './HomePage';

export class HomeController extends BaseRouteController {
  registerRoutes(): void {
    this.addRoute({
      LINK: '/',
      PAGE: (
        <PageComponent>
          <HomePage />
        </PageComponent>
      ),
      TITLE: 'Главная страница',
    });
  }
}