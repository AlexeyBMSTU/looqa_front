import { ReactNode } from 'react';
import { routeRegistry } from './RouteRegistry';

export interface RouteConfig {
  link: string;
  page: ReactNode;
  title: string;
}

export abstract class BaseRouteController {
  protected routes: RouteConfig[] = [];

  constructor() {
    this.registerRoutes();
  }

  abstract registerRoutes(): void;

  getRoutes(): RouteConfig[] {
    return this.routes;
  }

  protected addRoute(route: RouteConfig): void {
    this.routes.push(route);
    routeRegistry.registerRoute(route);
  }
}
