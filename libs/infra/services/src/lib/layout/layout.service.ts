import { inject, Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly breakpointObserver = inject(BreakpointObserver);

  private readonly isDesktop$ = this.breakpointObserver
    .observe(['(min-width: 1024px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  readonly isDesktop = toSignal(this.isDesktop$);
}
