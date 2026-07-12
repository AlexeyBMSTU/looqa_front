import { BaseRouteController } from '@/router/BaseRouteController';
import { CreateProjectPage } from './CreateProjectPage';
import { ProjectPage } from './ProjectPage';

export class ProjectController extends BaseRouteController {
  registerRoutes(): void {
    // ВАЖНО: /projects/create должен быть зарегистрирован ПЕРЕД /projects/:id
    this.addRoute({
      link: '/projects/create',
      page: <CreateProjectPage />,
      title: 'Разместить продукт',
    });
    this.addRoute({
      link: '/projects/:id',
      page: <ProjectPage />,
      title: 'Продукт',
    });
  }
}
