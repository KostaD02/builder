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
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Page, PageItem } from '@builder/infra/types';
import { PageItemRendererDirective } from './page-item-renderer.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'builder-page-viewer',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    CapitalizePipe,
    CdkDrag,
    CdkDragHandle,
    PageItemRendererDirective,
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

  constructor() {
    effect(() => {
      const page = this.page();
      if (page && page.children.length === 0) {
        this.selectedElement.set(null);
      }
    });
  }
}
