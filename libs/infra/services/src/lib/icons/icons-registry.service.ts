import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ICONS } from '@builder/infra/consts';

@Injectable({
  providedIn: 'root',
})
export class IconsRegistryService {
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);

  readonly icons = ICONS;

  init(): void {
    this.icons.forEach((icon) => {
      this.iconRegistry.addSvgIconLiteral(
        icon.name,
        this.sanitizer.bypassSecurityTrustHtml(icon.svg),
      );
    });
  }
}
