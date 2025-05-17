import { Route } from '@angular/router';
import { ShellComponent } from './shell.component';

export const SHELL_ROUTES: Route[] = [
  {
    path: '',
    component: ShellComponent,
    loadChildren: () => [
      {
        path: '',
        loadChildren: () =>
          import('@builder/home/shell').then((m) => m.HOME_ROUTES),
      },
      {
        path: '**',
        loadChildren: () =>
          import('@builder/not-found/shell').then((m) => m.NOT_FOUND_ROUTES),
      },
    ],
  },
];
