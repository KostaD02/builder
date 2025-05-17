import { Route } from '@angular/router';

export const NOT_FOUND_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@builder/not-found').then((m) => m.NotFoundComponent),
  },
];
