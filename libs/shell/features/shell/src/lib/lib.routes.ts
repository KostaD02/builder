import { Route } from '@angular/router';
import { ShellComponent } from './shell.component';
import { HOME_ROUTES } from '@builder/home/shell';

export const SHELL_ROUTES: Route[] = [
  {
    path: '',
    component: ShellComponent,
    loadChildren: () => [
      {
        path: '',
        children: HOME_ROUTES,
      },
      {
        path: '**',
        loadChildren: () =>
          import('@builder/not-found/shell').then((m) => m.NOT_FOUND_ROUTES),
      },
    ],
  },
];
