import { BaseRouteController } from './BaseRouteController';
import { routeRegistry } from './RouteRegistry';

export class MainController extends BaseRouteController {
  private static instance: MainController;
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;

  private constructor() {
    super();
    this.initializationPromise = this.initializeControllers();
  }

  public static getInstance(): MainController {
    if (!MainController.instance) {
      MainController.instance = new MainController();
    }
    return MainController.instance;
  }

  private async initializeControllers(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const controllerModules = import.meta.glob([
        '/src/pages/**/*-controller.tsx',
      ]);

      const controllerPromises: Promise<BaseRouteController | null>[] = [];

      for (const path in controllerModules) {
        try {
          const modulePromise = controllerModules[path]() as Promise<any>;
          controllerPromises.push(
            modulePromise
              .then(module => {
                const ControllerClass = this.findControllerClass(module);
                if (ControllerClass) {
                  return new ControllerClass();
                }
                return null;
              })
              .catch(error => {
                return error;
              })
          );
        } catch (error) {
          throw new Error('Failed to load controller module', { 
            cause: error 
          });
        }
      }

      await Promise.all(controllerPromises);

      this.isInitialized = true;
      
      routeRegistry.markAsInitialized();

    } catch (error) {
      throw new Error('Failed to initialize controllers', { 
        cause: error 
      });
    }
  }

  private findControllerClass(module: any): (new () => BaseRouteController) | null {
    for (const exportName in module) {
      const exported = module[exportName];
      if (
        typeof exported === 'function' &&
        exported.prototype instanceof BaseRouteController
      ) {
        return exported;
      }
    }
    return null;
  }

  getRoutes(): any[] {
    return routeRegistry.getRoutes();
  }

  async getRoutesAsync(): Promise<any[]> {
    if (!this.isInitialized && this.initializationPromise) {
      await this.initializationPromise;
    }
    return this.getRoutes();
  }
  
  registerRoutes(): void {
  }
}

export const mainController = MainController.getInstance();