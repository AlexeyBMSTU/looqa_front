import { BaseRouteController } from '@/router/BaseRouteController';
import { PageComponent } from '@/components/PageComponent/PageComponent';
import { RegPage } from './RegPage';

export class RegController extends BaseRouteController {
  registerRoutes(): void {
    this.addRoute({
      LINK: '/reg/',
      PAGE: (
        <PageComponent>
          <RegPage />
        </PageComponent>
      ),
      TITLE: 'Регистрация',
    });
  }
}