import { Route } from '@angular/router';

export const NOT_FOUND_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./not-found.component').then((m) => m.NotFoundComponent),
  },
];
