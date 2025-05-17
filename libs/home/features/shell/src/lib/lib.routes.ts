import { Route } from '@angular/router';

export const HOME_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('@builder/home').then((m) => m.HomeComponent),
  },
];
