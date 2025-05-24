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

  needsWrapper(item: PageItem): boolean {
    return (
      item.children.length > 0 ||
      [
        'div',
        'ul',
        'ol',
        'section',
        'article',
        'nav',
        'header',
        'footer',
        'main',
        'form',
        'table',
      ].includes(item.content.tagName.toLowerCase())
    );
  }

  onElementClick(pageItem: PageItem): void {
    console.log('Element clicked:', pageItem);
    this.elementClick.emit(pageItem);
  }
}
