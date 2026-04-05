// Hash-Based SPA Router — copied from myMedKitt

export interface RouteParams {
  [key: string]: string;
}

type RouteHandler = (params: RouteParams) => void;

interface Route {
  pattern: string;
  segments: string[];
  handler: RouteHandler;
}

class Router {
  private routes: Route[] = [];
  private notFoundHandler: RouteHandler | null = null;

  on(pattern: string, handler: RouteHandler): void {
    const segments = pattern.split('/').filter(Boolean);
    this.routes.push({ pattern, segments, handler });
  }

  onNotFound(handler: RouteHandler): void {
    this.notFoundHandler = handler;
  }

  start(): void {
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  }

  navigate(path: string): void {
    window.location.hash = '#' + path;
  }

  currentPath(): string {
    const hash = window.location.hash.slice(1);
    return hash || '/';
  }

  private resolve(): void {
    const path = this.currentPath();
    const pathSegments = path.split('/').filter(Boolean);

    for (const route of this.routes) {
      const params = this.match(route.segments, pathSegments);
      if (params !== null) {
        route.handler(params);
        return;
      }
    }

    if (this.notFoundHandler) {
      this.notFoundHandler({});
    }
  }

  private match(
    routeSegments: string[],
    pathSegments: string[]
  ): RouteParams | null {
    if (routeSegments.length === 0 && pathSegments.length === 0) {
      return {};
    }

    if (routeSegments.length !== pathSegments.length) {
      return null;
    }

    const params: RouteParams = {};

    for (let i = 0; i < routeSegments.length; i++) {
      const routeSeg = routeSegments[i];
      const pathSeg = pathSegments[i];

      if (routeSeg.startsWith(':')) {
        const paramName = routeSeg.slice(1);
        params[paramName] = decodeURIComponent(pathSeg);
      } else if (routeSeg !== pathSeg) {
        return null;
      }
    }

    return params;
  }
}

export const router = new Router();
