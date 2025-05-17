import { Route } from '@angular/router';
import { SHELL_ROUTES } from './lib.routes';

describe('ShellRoutes', () => {
  let routes: Route[];

  beforeEach(() => {
    routes = SHELL_ROUTES;
  });

  it('should contain routes array', () => {
    expect(routes).toBeDefined();
    expect(Array.isArray(routes)).toBeTruthy();
  });

  it('should have a root route with empty path', () => {
    const rootRoute = routes.find((route) => route.path === '');
    expect(rootRoute).toBeDefined();
  });
});
