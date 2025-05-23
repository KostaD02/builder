import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuilderService, IconsRegistryService } from '@builder/infra/services';

@Component({
  imports: [RouterModule],
  selector: 'builder-root',
  template: `<router-outlet />`,
})
export class AppComponent {
  private readonly builderService = inject(BuilderService);
  private readonly iconRegistryService = inject(IconsRegistryService);

  constructor() {
    this.builderService.init();
    this.iconRegistryService.init();
  }
}
