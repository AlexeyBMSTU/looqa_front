import { RouteConfig } from './BaseRouteController';

export class RouteRegistry {
  private static instance: RouteRegistry;
  private routes: RouteConfig[] = [];
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): RouteRegistry {
    if (!RouteRegistry.instance) {
      RouteRegistry.instance = new RouteRegistry();
    }
    return RouteRegistry.instance;
  }

  public registerRoute(route: RouteConfig): void {
    this.routes.push(route);
  }

  public registerRoutes(routes: RouteConfig[]): void {
    routes.forEach(route => this.registerRoute(route));
  }

  public getRoutes(): RouteConfig[] {
    return [...this.routes];
  }

  public clear(): void {
    this.routes = [];
    this.isInitialized = false;
  }

  public markAsInitialized(): void {
    this.isInitialized = true;
  }

  public isRegistryInitialized(): boolean {
    return this.isInitialized;
  }
}

export const routeRegistry = RouteRegistry.getInstance();
