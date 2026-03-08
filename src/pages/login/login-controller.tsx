import { BaseRouteController } from '@/router/BaseRouteController';
import { PageComponent } from '@/components/PageComponent/PageComponent';
import { LoginPage } from './LoginPage';

export class LoginController extends BaseRouteController {
  registerRoutes(): void { 
    this.addRoute({
      LINK: '/login/',
      PAGE: (
        <PageComponent>
          <LoginPage />
        </PageComponent>
      ),
      TITLE: 'Авторизация',
    });
  }
}