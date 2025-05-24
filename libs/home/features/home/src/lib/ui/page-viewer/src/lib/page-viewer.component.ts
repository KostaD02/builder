import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page, PageItem } from '@builder/infra/types';
import { PageItemRendererDirective } from './page-item-renderer.directive';

@Component({
  selector: 'builder-page-viewer',
  imports: [CommonModule, PageItemRendererDirective],
  templateUrl: './page-viewer.component.html',
  styleUrl: './page-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageViewerComponent {
  readonly page = input<Page>();

  readonly elementClick = output<PageItem>();
  readonly elementSelect = output<PageItem>();

  onElementClick(pageItem: PageItem): void {
    console.log('Element clicked:', pageItem);
    this.elementClick.emit(pageItem);
  }
}
