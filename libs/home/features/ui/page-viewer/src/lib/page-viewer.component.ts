import { CapitalizePipe } from '@builder/infra/pipes';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Page, PageItem } from '@builder/infra/types';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ItemSettingsComponent } from '@builder/item-settings';
import { PageItemRendererDirective } from './page-item-renderer.directive';

@Component({
  selector: 'builder-page-viewer',
  imports: [
    CapitalizePipe,
    CdkDrag,
    CdkDragHandle,
    PageItemRendererDirective,
    ItemSettingsComponent,
    NgTemplateOutlet,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './page-viewer.component.html',
  styleUrl: './page-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PageViewerComponent {
  readonly page = input<Page>();

  readonly selectedWrapperElement = output<PageItem>();
  readonly selectedElement = signal<PageItem | null>(null);
  readonly forceRerender = signal<number>(0);

  constructor() {
    effect(() => {
      const page = this.page();
      if (page && page.children.length === 0) {
        this.selectedElement.set(null);
      }
    });
  }

  forceRerenderSelectedElement(): void {
    this.forceRerender.update((value) => ++value);
  }
}
