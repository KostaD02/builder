
import { Route } from '@angular/router';
import { NOT_FOUND_ROUTES } from './lib.routes';

describe('not-foundRoutes', () => {
  let routes: Route[];

  beforeEach(() => {
    routes = NOT_FOUND_ROUTES;
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
