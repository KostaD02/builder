import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsRegistryService } from '@builder/infra/services';

@Component({
  imports: [RouterModule],
  selector: 'builder-root',
  template: `<router-outlet />`,
})
export class AppComponent {
  private readonly iconRegistryService = inject(IconsRegistryService);

  constructor() {
    this.iconRegistryService.init();
  }
}
